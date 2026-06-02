import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function checkAuth(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  return token && token === process.env.ADMIN_TOKEN;
}

// GET /api/admin/chats?token=YOUR_TOKEN          → view logs
// GET /api/admin/chats?token=YOUR_TOKEN&ping=1   → test Redis connection
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return Response.json({
      error: 'Redis not configured',
      hint: 'UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN missing from env',
      env_url_set: !!process.env.UPSTASH_REDIS_REST_URL,
      env_token_set: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    }, { status: 503 });
  }

  // Ping mode — tests full write/read cycle
  if (req.nextUrl.searchParams.get('ping') === '1') {
    try {
      const pong = await redis.ping();
      await redis.set('__ping_test__', 'ok', { ex: 60 });
      const val = await redis.get('__ping_test__');
      const count = await redis.llen('chat_logs');
      return Response.json({
        ping: pong,
        write_read: val,
        chat_logs_count: count,
        status: 'Redis is working correctly',
      });
    } catch (e) {
      return Response.json({
        error: 'Redis connection failed',
        detail: e instanceof Error ? e.message : String(e),
      }, { status: 500 });
    }
  }

  // Normal mode — return logs
  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam ?? '100', 10), 500);

  const raw = await redis.lrange('chat_logs', 0, limit - 1);

  const entries = raw.map((entry) => {
    try {
      return typeof entry === 'string' ? JSON.parse(entry) : entry;
    } catch {
      return entry;
    }
  });

  const sessions: Record<string, typeof entries> = {};
  for (const entry of entries) {
    const sid = (entry as Record<string, string>)?.session_id ?? 'unknown';
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
