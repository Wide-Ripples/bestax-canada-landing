import { unstable_cache, revalidateTag } from "next/cache";
import type { PageContent } from "./schema";
import { defaultContent } from "./defaultContent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function getRedis() {
  const url = (process.env.UPSTASH_REDIS_REST_URL ?? "").replace(/^﻿/, "").trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN ?? "").replace(/^﻿/, "").trim();
  if (!url || !token) return null;
  return { url, token };
}

async function fetchFromRedis(): Promise<PageContent | null> {
  const cfg = getRedis();
  if (!cfg) return null;
  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: cfg.url, token: cfg.token });
    return await redis.get<PageContent>("bestax:content");
  } catch {
    return null;
  }
}

export const getContent = unstable_cache(
  async (): Promise<PageContent> => {
    const stored = await fetchFromRedis();
    // Always merge stored data ON TOP of defaultContent so any new fields
    // added to the schema always have a value even with old Redis data
    return stored ? deepMerge(defaultContent, stored) as PageContent : defaultContent;
  },
  ["page-content"],
  { tags: ["content"] }
);

export async function saveContent(updates: Partial<PageContent>): Promise<void> {
  const cfg = getRedis();
  if (!cfg) throw new Error("Redis not configured");
  const { Redis } = await import("@upstash/redis");
  const redis = new Redis({ url: cfg.url, token: cfg.token });

  const current = (await redis.get<PageContent>("bestax:content")) ?? defaultContent;
  const merged = deepMerge(current, updates) as PageContent;
  await redis.set("bestax:content", JSON.stringify(merged));
  revalidateTag("content", "max");
}
