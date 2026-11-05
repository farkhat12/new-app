import "server-only";
import Redis from "ioredis";

const url = process.env.REDIS_URL;
if (!url) throw new Error("REDIS_URL is not set");

const globalForRedis = globalThis as unknown as { redis?: Redis };

function createRedis() {
  const client = new Redis(url!, {
    maxRetriesPerRequest: 2,
    connectTimeout: 5000,
  });
  client.on("error", (err) => console.error("[redis]", err.message));
  return client;
}

export const redis = globalForRedis.redis ?? createRedis();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
