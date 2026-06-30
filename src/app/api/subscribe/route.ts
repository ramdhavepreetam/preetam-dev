import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientId(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "anonymous";
}

export async function POST(req: Request) {
  if (!redis) {
    return Response.json({ error: "Subscription service is not configured." }, { status: 503 });
  }

  let body: { email?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid subscription request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const source = typeof body.source === "string" && body.source.length <= 80 ? body.source : "newsletter";
  const isNew = await redis.sadd("newsletter:emails", email);

  await redis.hset(`newsletter:subscriber:${email}`, {
    email,
    source,
    updated_at: now,
    ip: getClientId(req),
    user_agent: req.headers.get("user-agent") ?? "unknown",
  });

  if (isNew) {
    await redis.lpush(
      "newsletter:signups",
      JSON.stringify({
        email,
        source,
        created_at: now,
      })
    );
    await redis.ltrim("newsletter:signups", 0, 999);
  }

  return Response.json({
    ok: true,
    message: isNew ? "You are subscribed." : "You are already subscribed.",
  });
}
