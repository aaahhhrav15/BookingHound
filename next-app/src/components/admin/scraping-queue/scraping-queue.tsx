"use client";
import apiClient from "@/lib/api-client";
import { ADMIN_API_ROUTES } from "@/utils/api-routes";
import React, { useEffect } from "react";
import { useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Listbox,
    ListboxItem,
} from "@nextui-org/react";

const ScrapingQueue = () => {
    const [onGoingJobs, setOnGoingJobs] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try 
            {
                const response = await fetch("http://localhost:3000/api/admin/job-details");
                if (!response.ok) 
                {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setOnGoingJobs(data.onGoingJobs);
            }
            catch (error) 
            {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(() => {
            getData();
        },3000);
        return () => {
            clearInterval(interval);
        };
    }, []);


    const onGoingJobColor = () => {
        if (onGoingJobs <= 5) 
            return "bg-green-500";
        else if (onGoingJobs <= 10) 
            return "bg-orange-500";
        else 
            return "bg-red-500";
    };

    const onGoingJobTextColor = () => { 
        if (onGoingJobs <= 5) 
            return "text-green-500";
        else if (onGoingJobs <= 10) 
            return "text-orange-500";
        else 
            return "text-red-500";
    };

    return (
        <Card className="h-full">
            <CardHeader>Current Queue</CardHeader>
            <CardBody className="flex items-center justify-center">
                <div
                    className={`h-52 w-52 rounded-full flex items-center justify-center ${onGoingJobColor()}`}
                >
                    <div className="h-44 w-44 bg-white rounded-full flex items-center justify-center">
                        <h4 className={`text-6xl font-bold ${onGoingJobTextColor()}`}>
                            {onGoingJobs}
                        </h4>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ScrapingQueue;
