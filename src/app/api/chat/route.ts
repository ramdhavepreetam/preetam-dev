import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';
import type { SystemModelMessage, UIMessage } from 'ai';
import { kv } from '@vercel/kv';
import { CHAT_LIMITS, portfolioSystemPrompt } from '@/lib/chat-context';

export const maxDuration = 30;

type ChatMessage = Omit<UIMessage, 'id'>;

const cachedSystemPrompt: SystemModelMessage = {
  role: 'system',
  content: portfolioSystemPrompt,
  providerOptions: {
    anthropic: {
      cacheControl: {
        type: 'ephemeral',
        ttl: '1h',
      },
    },
  },
};

// KV is available when Vercel injects KV_REST_API_URL + KV_REST_API_TOKEN
const kvEnabled = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

type RateBucket = {
  windowStart: number;
  windowCount: number;
  dayStart: number;
  dayCount: number;
};

const rateBuckets = new Map<string, RateBucket>();
const WINDOW_MS = 10 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WINDOW_LIMIT = 5;
const DAY_LIMIT = 20;

function getClientId(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (
    forwardedFor ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'anonymous'
  );
}

function checkRateLimit(clientId: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(clientId) ?? {
    windowStart: now,
    windowCount: 0,
    dayStart: now,
    dayCount: 0,
  };

  if (now - bucket.windowStart > WINDOW_MS) {
    bucket.windowStart = now;
    bucket.windowCount = 0;
  }

  if (now - bucket.dayStart > DAY_MS) {
    bucket.dayStart = now;
    bucket.dayCount = 0;
  }

  bucket.windowCount += 1;
  bucket.dayCount += 1;
  rateBuckets.set(clientId, bucket);

  return bucket.windowCount <= WINDOW_LIMIT && bucket.dayCount <= DAY_LIMIT;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<ChatMessage>;
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    Array.isArray(message.parts)
  );
}

function getMessageText(message: ChatMessage) {
  return message.parts
    .map((part) => (part.type === 'text' && typeof part.text === 'string' ? part.text : ''))
    .join(' ');
}

function latestUserText(messages: ChatMessage[]) {
  const latestUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  return latestUserMessage ? getMessageText(latestUserMessage).trim() : '';
}

function isBlockedTopic(text: string) {
  const normalized = text.toLowerCase();
  const blockedPatterns = [
    /ignore (all )?(previous|system|developer) instructions/,
    /show|reveal|print|dump|repeat.*(system prompt|instructions)/,
    /jailbreak|prompt injection|developer message/,
    /write (me )?(code|a script|an essay|homework)/,
    /debug (my|this) code/,
    /stock pick|crypto|medical advice|legal advice/,
  ];
  return blockedPatterns.some((p) => p.test(normalized));
}

// Fire-and-forget — never awaited so it never slows down the stream
function logChatEvent(event: {
  session_id: string;
  timestamp: string;
  message_no: number;
  user_text: string;
  ip: string;
  country: string;
  city: string;
  user_agent: string;
}) {
  if (!kvEnabled) return;
  kv.lpush('chat_logs', JSON.stringify(event))
    .then(() => kv.ltrim('chat_logs', 0, 999)) // keep latest 1000
    .catch(() => {}); // logging must never surface to the user
}

export async function POST(req: Request) {
  const clientId = getClientId(req);

  if (!checkRateLimit(clientId)) {
    return Response.json(
      { error: 'Too many questions for now. Please try again later or contact Preetam directly.' },
      { status: 429 }
    );
  }

  let body: { messages?: unknown[]; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid chat request.' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.filter(isChatMessage) : [];
  const userMessages = messages.filter((m) => m.role === 'user');
  const userText = latestUserText(messages);

  if (!userText) {
    return Response.json({ error: 'Ask a question about Preetam, his work, or availability.' }, { status: 400 });
  }

  if (userText.length > CHAT_LIMITS.maxInputChars) {
    return Response.json(
      { error: `Please keep questions under ${CHAT_LIMITS.maxInputChars} characters.` },
      { status: 400 }
    );
  }

  if (userMessages.length > CHAT_LIMITS.maxUserMessagesPerConversation) {
    return Response.json(
      { error: 'This chat reached its limit. For deeper questions, use the contact page.' },
      { status: 400 }
    );
  }

  if (isBlockedTopic(userText)) {
    return Response.json(
      { error: 'I can only answer questions about Preetam, his projects, technical background, and availability.' },
      { status: 400 }
    );
  }

  // Log — fire and forget, does not block the stream
  logChatEvent({
    session_id: typeof body.sessionId === 'string' ? body.sessionId : 'unknown',
    timestamp: new Date().toISOString(),
    message_no: userMessages.length,
    user_text: userText,
    ip: clientId,
    country: req.headers.get('x-vercel-ip-country') ?? 'unknown',
    city: req.headers.get('x-vercel-ip-city') ?? 'unknown',
    user_agent: req.headers.get('user-agent') ?? 'unknown',
  });

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    messages: await convertToModelMessages(messages.slice(-CHAT_LIMITS.maxMessages)),
    system: cachedSystemPrompt,
    maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
  });

  return result.toUIMessageStreamResponse();
}
