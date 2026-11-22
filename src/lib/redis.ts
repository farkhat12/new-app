import "server-only";

import Redis, { type RedisOptions } from "ioredis";

function getRedisUrl(): string {
  const url = process.env.REDIS_URL;

  if (!url) {
    throw new Error("REDIS_URL environment variable is missing");
  }

  return url;
}

const globalForRedis = globalThis as typeof globalThis & {
  __ornalasRedis?: Redis;
};

const redisOptions: RedisOptions = {
  lazyConnect: true,
  enableReadyCheck: true,
  maxRetriesPerRequest: 2,
  connectTimeout: 10_000,
  keepAlive: 10_000,

  retryStrategy(times) {
    return Math.min(times * 200, 3_000);
  },
};

function createRedisClient(): Redis {
  const client = new Redis(getRedisUrl(), redisOptions);

  client.on("connect", () => {
    console.info("[Redis] Connected");
  });

  client.on("ready", () => {
    console.info("[Redis] Ready");
  });

  client.on("error", (error: Error) => {
    console.error("[Redis] Connection error:", error.message);
  });

  client.on("close", () => {
    console.warn("[Redis] Connection closed");
  });

  return client;
}

export const redis = globalForRedis.__ornalasRedis ?? createRedisClient();

globalForRedis.__ornalasRedis = redis;
