import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

// GET /api/admin/chats?token=YOUR_ADMIN_TOKEN&limit=100
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json({ error: 'Redis not configured' }, { status: 503 });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam ?? '100', 10), 500);

  const raw = await redis.lrange<string>('chat_logs', 0, limit - 1);

  const entries = raw.map((entry) => {
    try {
      return typeof entry === 'string' ? JSON.parse(entry) : entry;
    } catch {
      return entry;
    }
  });

  const sessions: Record<string, typeof entries> = {};
  for (const entry of entries) {
    const sid = entry?.session_id ?? 'unknown';
    if (!sessions[sid]) sessions[sid] = [];
    sessions[sid].push(entry);
  }

  return Response.json({
    total_messages: raw.length,
    total_sessions: Object.keys(sessions).length,
    sessions,
    recent: entries.slice(0, 20),
  });
}
