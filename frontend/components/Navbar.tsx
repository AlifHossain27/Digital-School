"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { useAuth } from './AuthContext'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from './ui/button';
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
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"



const Navbar = () => {
    const { setTheme } = useTheme()
    const router = useRouter()
    const { toast } = useToast()
    const { isAuthenticated, setAuthenticated } = useAuth();

    const logout = async() => {
        await fetch('http://localhost:8000/api/logout/',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          credentials: 'include'
        })
        await router.push('/')
        toast({
          title: `Bye Bye`,
          description: "Hope we will meet again !!",
        })
        setAuthenticated(false);
        router.refresh()
        
      }


  return (
        <nav className='flex flex-row justify-between px-6 items-start py-4 w-full border-b-2 border-secondary'>
            <section>
                <Link href="/" className='text-2xl font-mono w-auto'>
                    Digital School
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
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='rounded-none border-none'>Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-sm border-none">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
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
            </section>
        </nav>
  )
}

export default Navbar