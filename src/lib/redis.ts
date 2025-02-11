import Redis from "ioredis";

// Use the local Redis instance for development, falling back to the local Redis URL if `REDIS_URL` isn't provided
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const connection = new Redis(REDIS_URL);

export { connection };
