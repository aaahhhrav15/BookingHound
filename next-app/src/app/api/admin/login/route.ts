import mongoURL from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


const bcrypt = require("bcrypt");
const Admin = mongoose.model("admins");


export async function POST(request : Request){
    try
    {
        await mongoose.connect(mongoURL);
        const {email,password}=await request.json();
        if(!email || !password)
        {
            return NextResponse.json({message : "Email and password are required"},{status:400});
        }
        const admin = await Admin.findOne({email:email});
        if(!admin)
        {
            return NextResponse.json({ message: "Admin not found" }, { status: 404 });
        }
        const passwordMatch = await bcrypt.compare(password,admin.password);
        if(!passwordMatch)
        {
            return NextResponse.json({ message: "Password Incorrect" }, { status: 404 });
        }
        else
        {
            return NextResponse.json({ message: "Logged In Successfully" }, { status: 200 });
        }
        
    }
    catch(error)
    {
        return NextResponse.json({message:"An error occured"},{status:500});
    }
}