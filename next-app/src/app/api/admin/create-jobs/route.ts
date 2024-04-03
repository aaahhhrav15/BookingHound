import { NextResponse } from "next/server";
import { Jobs } from "@/lib/models/jobsModel";
import { mongoURL1 } from "@/lib/db";
import mongoose from "mongoose";
import { jobsQueue } from "@/lib/queue";

export async function POST(request: Request) 
{
    try 
    {
        await mongoose.connect(mongoURL1);
        const { url, jobType } = await request.json();
        const job = new Jobs({ url: url, jobType: jobType });
        const response = await job.save();
        console.log("Job data:", { url, jobType, id: response._id });
        await jobsQueue.add("new location", { url, jobType, id: response._id });
        console.log("job added to queue");
        if (response) 
        {
            return NextResponse.json({ jobCreated: true }, { status: 200 });
        } 
        else 
        {
            return NextResponse.json({ message: "Failed to create job" }, { status: 500 });
        }
    } 
    catch (error) 
    {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}
