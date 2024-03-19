"use client";
import React, { useState } from "react";
import { Architects_Daughter } from "next/font/google";
import {
  Sidebar as ReactProSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";

import { BiSolidCategory } from "react-icons/bi";
import { FaBookOpen, FaHome, FaHotel } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDataUsage } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  const router = useRouter();

  const handleItemClick = (link: string) => {
    setSelectedItem(link);
    router.push(link);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      link: "/admin/dashboard",
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
      link: "/admin/bookings",
    },
    {
      label: "Scrape Data",
      icon: <MdOutlineDataUsage />,
      link: "/admin/scrape-data",
    },
  ];

  return (
    <div className="min-h-[100vh] overflow-hidden">
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
        <Menu className="h-[100vh] max-h-[100vh] overflow-hidden text-black">
          <div className="flex flex-col justify-center my-10 items-center">
            <Image
              src="/logo.png"
              width={150}
              height={150}
              alt="logo"
              className="cursor-pointer"
              onClick={() => {
                router.push("/admin/dashboard");
              }}
            />
            <span className="text-2xl uppercase fonr-medium italic text-black">
              <span className={ArchitectsDaughter.className}>Bookinghound</span>
            </span>
          </div>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <MenuItem
                icon={item.icon}
                active={selectedItem === item.link}
                onClick={() => {
                  handleItemClick(item.link);
                }}
                style={{
                    backgroundColor: selectedItem === item.link ? "black" : "transparent",
                    color: selectedItem === item.link ? "white" : "black",
                }}
  
              >
                {item.label}
              </MenuItem>
            </React.Fragment>
          ))}
          <MenuItem
            icon={<LuLogOut />}
            active={selectedItem === "/admin/logout"}
            onClick={() => {
              handleItemClick("/admin/logout");
            }}
            style={{
              backgroundColor: selectedItem === '/admin/logout' ? 'black' : 'transparent',
              color: selectedItem === '/admin/logout' ? 'white' : 'black',
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </ReactProSidebar>
    </div>
  );
};

export default Sidebar;
