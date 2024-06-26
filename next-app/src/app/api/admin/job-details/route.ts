import { NextResponse } from "next/server";
import { Jobs } from "@/lib/models/jobsModel";
import { mongoURL1 } from "@/lib/db";
import mongoose from "mongoose";

export async function GET()
{
    try
    {
        await mongoose.connect(mongoURL1);
        const jobs = await Jobs.find().sort({ createdAt: -1 });
        const onGoingJobs = await Jobs.find({isComplete:false});
        return NextResponse.json({ jobs,onGoingJobs: onGoingJobs?.length ?? 0 },{ status: 200 })
    }
    catch (error) 
    {
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
} 