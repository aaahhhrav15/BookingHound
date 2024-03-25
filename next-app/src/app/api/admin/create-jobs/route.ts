
import { NextResponse } from "next/server";
import { Jobs } from "@/lib/models/jobsModel";
import { mongoURL1 } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request : Request) 
{
    try 
    {
        await mongoose.connect(mongoURL1);
        const { url, jobType } = await request.json();
        const job = new Jobs({url: url,jobType: jobType });
        console.log("Url: " + url);
        const response = await job.save(); 
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
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}
