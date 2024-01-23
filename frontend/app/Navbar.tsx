'use client'
import React, { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '../components/ui/use-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { useAppSelector } from '@/redux/store';
import { logIn, logOut } from '@/redux/features/auth-slice'
import { SetUID, ResetUID } from '@/redux/features/uid-slice' 
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from '../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    LogOut,
    Settings,
    User,
  } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"



const Navbar = () => {
    const { setTheme } = useTheme()
    const router = useRouter()
    const { toast } = useToast()
    const dispatcher = useDispatch<AppDispatch>()
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuthenticated)
    const user_type = useAppSelector((state) => state.authReducer.value.userType)
    const uid = useAppSelector((state) => state.uidReducer.value.userID)
    const [ userAvatar, SetUserAvatar ] =useState('/media/Default.png')

    useEffect(() => {
        fetch('http://localhost:8000/api/me/', {
          credentials: 'include',
        })
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error('Connection failed');
            }
          })
          .then((data) => {
            const user_type = data.user_type;
            const uid = data.admin_id || data.staff_id || data.teacher_id || data.student_id
            dispatcher(logIn(user_type));
            dispatcher(SetUID(uid))
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            dispatcher(logOut());
            dispatcher(ResetUID())
          });
      }, []);

      useEffect(() => {
        (
          async () => {
            try {
            const resp = await fetch(`http://localhost:8000/api/${user_type}/${uid}/`,{
              credentials: 'include'
            })
            const data = await resp.json();
            if (resp.ok){
              SetUserAvatar(data.profile_picture)
            }else{
              SetUserAvatar('/media/Default.png')
            }
          } catch(e){
            console.log('connection failed')
          }
          }
        )()
      })

    const logout = async() => {
        await fetch('http://localhost:8000/api/logout/',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          credentials: 'include'
        })
        toast({
          title: `Bye Bye`,
          description: "Hope we will meet again !!",
        })
        dispatcher(logOut())
        await router.push('/')
      }
  return (
        <nav className='sticky top-0 flex flex-row justify-between px-6 items-start py-4 w-full border-b-2 border-secondary bg-background'>
            <section>
                <Link href="/">
                    <h1 className='text-2xl font-mono w-auto'>Digital School</h1>
                </Link>
            </section>
            <section className='flex items-center gap-4'>
                {/* Theme Toggle */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className='rounded-none border-none'>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-none border-none">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile Menu */}
                <Suspense fallback = {
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                }>
                {isAuth ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={userAvatar} alt="@profile" />
                            <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 rounded-sm border-none">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push(`/${user_type}/profile`)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                  <div></div>
                )}
                </Suspense>
                
            </section>
        </nav>
  )
}

export default Navbar