export const register = async () => {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { Worker } = await import("bullmq");
        const { connection } = await import("./lib/redis");

        console.log("before worker");

        new Worker(
            "jobsQueue",
            async (job) => {
              console.log("Job processing started");
              try 
              {
                console.log("Job details:", job);
                console.log("Job processing completed successfully");
              } 
              catch (error) 
              {
                console.error("Error processing job:", error);
              }
            },
            {
              connection,
              concurrency: 10,
              removeOnComplete: { count: 1000 },
              removeOnFail: { count: 5000 },
            }
        );
        console.log("after worker");
    }
} 