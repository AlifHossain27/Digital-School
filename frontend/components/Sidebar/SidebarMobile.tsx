'use client'
import React from 'react'
import Link from 'next/link';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface Menu {
    name: string; 
    link: string; 
    icon: React.ComponentType;
}

interface SidebarMobileProps {
    menus: Menu[];
}

const SidebarMobile = ({menus}: SidebarMobileProps) => {
  return (
    <div className='h-16 px-4 py-4 border-b-2 border-secondary bg-background'>
        <Sheet>
            <SheetTrigger>
                <Menu size={25} />
            </SheetTrigger>
            <SheetContent side={'left'} className='px-4 py-4 border-secondary' hideClose >
                <SheetHeader className='flex flex-row justify-end items-end'>
                    <SheetClose>
                        <X size={25}/>
                    </SheetClose>
                </SheetHeader>
                <div className='w-full pt-5'>
                {menus?.map((menu, i) => (
                    <Link href={menu?.link} key={i} className="group flex items-center">
                        <SheetClose asChild>
                            <Button variant= 'ghost' className={`text-xl gap-3.5 justify-start rounded-none h-16`}>
                                <div>{React.createElement(menu?.icon as any, { size: 25 })}</div>
                                <h2>
                                    {menu?.name}
                                </h2>
                            </Button>
                        </SheetClose>
                    </Link>
                      ))}
                </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default SidebarMobile