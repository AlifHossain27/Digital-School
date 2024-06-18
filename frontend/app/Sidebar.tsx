"use client"
import React, {useState, useEffect} from 'react'
import { useAppSelector } from '@/redux/store';
import { navItems } from '@/actions/navItems';
import { useMediaQuery } from 'usehooks-ts';
import SidebarDesktop from '@/components/Sidebar/SidebarDesktop';
import SidebarMobile from '@/components/Sidebar/SidebarMobile';

const Sidebar = () => {
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuthenticated)
    const [menus, setMenus] = useState<
      { name: string; link: string; icon: React.ComponentType }[]
    >([]);

    const isDesktop = useMediaQuery('(min-width: 640px)', {
      initializeWithValue: false
    })

    useEffect(() => {
      const fetchMenus = async () => {
        try {
          const result = await navItems();
          setMenus(result);
        } catch (error) {
          console.error('Error fetching menus:', error);
        }
      };
  
      fetchMenus();
    }, [isAuth]);

    if (isDesktop) return <SidebarDesktop menus={menus}/>;

  return (
    
    <SidebarMobile menus={menus}/>
    
  )
}

export default Sidebar