import Sidebar from "@/components/admin/sidebar/sidebar";

import React from 'react';

const adminLayout = ({ children }:{ children: React.ReactNode })=>{
    return (
        <section className="bg-[#f5f5fe] flex">
            <Sidebar />
            <section className="flex flex-col flex-1">
                <div className="h-48 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3">
                    <h1 className="text-5xl">Dashboard</h1>
                    <p>My name is aarav lodha and i am the admin</p>
                </div>
                {children}
            </section>
        </section>
    )
}

export default adminLayout;