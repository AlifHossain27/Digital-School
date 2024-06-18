'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HiMenuAlt3 } from "react-icons/hi";

interface Menu {
    name: string; 
    link: string; 
    icon: React.ComponentType;
}

interface SidebarDesktopProps {
    menus: Menu[];
}

const SidebarDesktop = ({menus}: SidebarDesktopProps) => {
    const [open, setOpen] =useState(false);
  return (
    <div className="h-screen sticky top-0 border-r-2 border-secondary bg-background">
        <div className={`min-h-screen ${open ? 'w-[300px]':'w-[80px]'} gap-[16px] duration-500`}>
            <div className='py-5 px-5 flex justify-end'>
                <HiMenuAlt3 
                size='34'  
                onClick={()=>setOpen(!open)}/>
            </div>
            <div className="flex flex-col relative px-2">
                    {menus?.map((menu, i) => (
                      <Link href={menu?.link} key={i} className="group flex items-center p-1">
                      <Button variant= 'ghost' className={`${open ? 'w-[300px]':'w-[80px]'} text-2xl gap-3.5 justify-start rounded-none h-20`}>
                      <div>{React.createElement(menu?.icon as any, { size: 25 })}</div>
                      <h2 
                      className={
                          `whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 hidden overflow-hidden"}`
                          }>
                    {menu?.name}
                    </h2>
                    </Button>
                    </Link>
                      ))}

                </div>  
            </div>     
    </div>
  )
}

export default SidebarDesktop