"use client"
import React, { useState } from 'react'
import { 
    Card, 
    CardBody, 
    CardFooter, 
    Input, 
    Tab, 
    Tabs 
} from '@nextui-org/react';
import axios from "axios";

const ScrapeData = () => {
  const [ cities, setCities] = useState([]);
  const searchCitites = async (searchString:string)=>{
    console.log("hi");
    const response = await axios.get(
        `https://secure.geonames.org/searchJSON?q=${searchString}&maxRows=5&username=kishan&style=SHORT`
    );
    const parsed = response.data?.geonames;
    setCities(parsed?.map((city:{name:string})=>{
        city.name;
    })??[]);
    console.log({response});  
  }  
  return (
    <section>
        <Card className="m-10 grid grid-cols-3 gap-5">
            <CardBody className="col-span-2">
                <Tabs>
                    <Tab key="location" title="Location">
                        <Input
                            type="text" 
                            label="Search for a location"
                            onChange={(e)=>searchCitites(
                                e.target.value
                            )}
                        />
                    </Tab>
                </Tabs>
            </CardBody>
            <CardFooter className="flex flex-col gap-5"></CardFooter>
        </Card>
    </section>
  )
}

export default ScrapeData;