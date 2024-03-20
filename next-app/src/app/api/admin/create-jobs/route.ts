
import { NextResponse } from "next/server";
import { Jobs } from "@/lib/models/jobsModel";
import mongoose from "mongoose";


export async function POST(request : Request)
{
    try
    {
        const {url,jobType} = await request.json();

    }
    catch(error)
    {
        return NextResponse.json({message:"An error occured"},{status:500});
    }
}
