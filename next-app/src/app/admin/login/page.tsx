"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react'; 
import { useState } from 'react';
import { Architects_Daughter } from 'next/font/google';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const ArchitectsDaughter = Architects_Daughter({
    weight:"400",
    style:"normal",
    subsets:["latin"],
})

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const notifyA = (err:string)=>toast.error(err);
    const notifyB = (suc:string)=>toast.error(suc);

    const router = useRouter();

    const regexEmail =/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    const handleLogin = async ()=>{
        if(!regexEmail.test(email))
        {
            notifyA("Invalid Email Format");
            return; 
        }
        try
        {
            const response =  await fetch("http://localhost:3000/api/admin/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                })

            })
            const data = await response.json();
            if(!response.ok)
            {
                notifyA(data.message);
            }
            else
            {
                notifyB(data.message);
                router.push("/admin");
            }
        }
        catch
        {
            notifyA("Login Failed");
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
                <div className="flex flex-col gap-2 w-11/12">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }} 
                        className="h-14"
                        color="danger"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }} 
                        className="h-14"
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