import { Browser } from "puppeteer";
import { Jobs } from "./lib/models/jobsModel";
import { startLocationScraping } from "./scraping/location-scraping";
import { jobsQueue } from "./lib/queue";
import { startPackageScraping } from "./scraping/package-scraping";
import { Trips } from "./lib/models/tripsModel";

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Worker } = await import("bullmq");
    const { connection } = await import("./lib/redis");
    const puppeteer = await import("puppeteer");
    const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_9ab420e1-zone-bookinghound:v5ej6esgcpii@brd.superproxy.io:9222';

    new Worker(
      "jobsQueue",
      async (job:any) => {
        let browser: undefined | Browser = undefined;
        try 
        {
          browser = await puppeteer.connect({
            browserWSEndpoint: SBR_WS_ENDPOINT,
          });
          const page = await browser.newPage();

          
          if (job.data.jobType.type === "location") 
          {
            console.log("hello!");
            const packages = await startLocationScraping(page);
            await Jobs.findOneAndUpdate(
              { id: job.data.id },
              { isComplete: true, status: "failed" }
            )
            console.log("hi");
            for(const pkg of packages)
            {
              const jobCreated = await Jobs.findOne(
                {url:`https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`}
              );
              if(!jobCreated)
              {
                console.log("how are you");
                const job = new Jobs({
                  url:`https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                  jobType: { type: "package" },
                });
                await job.save();
                jobsQueue.add("package", { ...job, packageDetails: pkg });
              }
              console.log("aarav i am ");
            }
          }


          else if(job.data.jobType.type === "package")
          {
            console.log("in package");
            const alreadyScrapped = await Trips.findOne(
              { id: job.data.packageDetails.id }
            );

            if (!alreadyScrapped) 
            {
              console.log("Connected! Navigating to " + job.data.url);
              await page.goto(job.data.url, { timeout: 10000 });
              console.log("Navigated! Scraping page content...");
              const pkg = await startPackageScraping(
                page,
                job.data.packageDetails
              );
              await Trips.create(pkg);
              await Jobs.updateOne(
                { id: job.data.id }, 
                { isComplete: true }, 
                { status: "complete" }, 
              );
            }
          }
        } 
        catch (error) 
        {
          console.log(error);
          try 
          {
            await Jobs.findOneAndUpdate(
              { _id: job.data.id }, 
              { isComplete: true, status: "failed" }
            );
          } 
          catch (err) 
          {
            console.error("Error updating job:", err);
          }
        } 
        finally 
        {
          await browser?.close();
          console.log("Browser closed successfully");
        }
      },
      {
        connection,
        concurrency: 10,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
      }
    );
  }
};
