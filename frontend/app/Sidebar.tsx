"use client"
import React, {useState, useEffect} from 'react'
import { useAppSelector } from '@/redux/store';
import Link from 'next/link'
import { Button } from '../components/ui/button';
import { HiMenuAlt3 } from "react-icons/hi";
import { UserType } from '@/actions/UserType';

const Sidebar = () => {
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuthenticated)
    const [menus, setMenus] = useState<
      { name: string; link: string; icon: React.ComponentType }[]
    >([]);
    const [open, setOpen] =useState(true);

    useEffect(() => {
      const fetchMenus = async () => {
        try {
          const result = await UserType();
          setMenus(result);
        } catch (error) {
          console.error('Error fetching menus:', error);
        }
      };
  
      fetchMenus();
    }, [isAuth]);

  return (
    <div className="border-r-2 border-secondary">
        <div className={`min-h-screen ${open ? 'w-72':'w-16'} duration-500`}>
            <div className='py-5 px-5 flex justify-end'>
                <HiMenuAlt3 
                size='34'  
                onClick={()=>setOpen(!open)}/>
            </div>
            <div className="flex flex-col relative">
                    {menus?.map((menu, i) => (
                      <Link href={menu?.link} key={i} className="group flex items-center  p-1">
                      <Button variant= 'ghost' className={`${open ? 'w-72':'w-16'} text-2xl gap-3.5 justify-start rounded-none h-20`}>
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

export default Sidebar