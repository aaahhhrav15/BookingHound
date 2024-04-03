import { Queue } from "bullmq";
import { connection } from "./redis";

console.log("Creating new job queue...");

export const jobsQueue = new Queue("jobsQueue", {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { 
      type: "exponential", 
      delay: 5000 
    },
  },
});

console.log("Job queue created:", jobsQueue);