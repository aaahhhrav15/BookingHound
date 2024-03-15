"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react'; 
import { useState } from 'react';
import { Architects_Daughter } from 'next/font/google';
import { apiClient } from '@/lib';
import { ADMIN_API_ROUTES } from '@/utils';

const ArchitectsDaughter = Architects_Daughter({
    weight:"400",
    style:"normal",
    subsets:["latin"],
})

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin = async ()=>{
        const response = await apiClient.post(ADMIN_API_ROUTES.LOGIN,{
            email,
            password,
        });
        if(response.data.userInfo)
        {
            
        }
    };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-center bg-no-repeat bg-cover" 
    style={{backgroundImage : 'url("/home/home-bg.png")'}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
        <Card className="shadow-2xl bg-opacity-20 w-[480px]">
            <CardHeader className="flex flex-col gap-1 capitalize items-center justify-center text-3xl">
                <div className="flex flex-col gap-1 capitalize items-center justify-center text-3xl">
                    <Image src="/logo.png"
                        alt="logo"
                        width={80}
                        height={80}
                        className="cursor-pointer"
                    />
                    <span className="text-xl uppercase font-medium italic text-white">
                        <span className={ArchitectsDaughter.className}>
                            BookingHound Admin Logo
                        </span>
                    </span>
                </div>
                
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col gap-3 w-11/12">
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }} 

                        color="danger"
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }} 
                        color="danger"
                    />
                </div>
            </CardBody>
            <CardFooter className="flex flex-col justify-center items-center gap-2">
                <Button color="danger" variant="shadow" className="w-11/12 capitalize" size="lg"
                onClick={handleLogin}>
                    Login
                </Button>
            </CardFooter>
        </Card>
    </div>
    
  )
}

export default Login;