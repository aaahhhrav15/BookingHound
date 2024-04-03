import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

console.log("before redis connect");

const connection = new Redis(REDIS_URL, {maxRetriesPerRequest:null});

console.log("after redis connect");
export {connection};