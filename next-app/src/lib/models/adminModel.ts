import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: { 
        type: String, 
        unique: true 
    },
    password: {
        type:String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

export const Admin = mongoose.models.admins || mongoose.model("admins",adminSchema);