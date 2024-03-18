"use client"
import React from 'react'
import { Architects_Daughter } from 'next/font/google';
import {Sidebar as ReactProSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";

import { BiSolidCategory } from "react-icons/bi";
import { FaBookOpen, FaHome, FaHotel } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDataUsage } from "react-icons/md";

const ArchitectsDaughter = Architects_Daughter({
  weight:"400",
  style:"normal",
  subsets:["latin"],
})

export const Sidebar = () => {

  const menuItems = [
    { 
      label: "Dashboard", 
      icon: <FaHome />, 
      link: "/admin/dashboard" 
    },
    {
      label: "Trips",
      icon: <BiSolidCategory />,
      link: "/admin/trips",
    },
    {
      label: "Hotels",
      icon: <FaHotel />,
      link: "/admin/hotels",
    },
    { 
      label: "Bookings", 
      icon: <FaBookOpen />, 
      link: "/admin/bookings" 
    },
    {
      label: "Scrape Data",
      icon: <MdOutlineDataUsage />,
      link: "/admin/scrape-data",
    },
  ];

  return (
    <div className="">
      <ReactProSidebar
        className="h-full overflow-hidden"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#ffffff",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        }}
      >
        <Menu>
          
        </Menu>
      </ReactProSidebar>
    </div>
  )
}

export default Sidebar;