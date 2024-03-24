import apiClient from '@/lib/api-client';
import { ADMIN_API_ROUTES } from '@/utils/api-routes';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Listbox,
    ListboxItem, 
} from '@nextui-org/react';

const ScrapingQueue = () => {

  const [onGoingJobs, setOnGoingJobs] = useState(0);

  useEffect(() => {
    const getData = async () => {
        const data = await apiClient.get(ADMIN_API_ROUTES.JOB_DETAILS);
        setOnGoingJobs(data.data.getOngoingJobs);
    }
    
    const interval = setInterval(()=>
        {getData(), 3000}
    );
    return () => {
        clearInterval(interval)
    };
  },[]);
     
  return (
    <Card className="h-full">
        <CardHeader>

        </CardHeader>
        <CardBody className="flex items-center justify-center">
            
        </CardBody>
    </Card>
  )
}

export default ScrapingQueue;