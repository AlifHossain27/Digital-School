import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const NavLinks = [
    { name: "Home", href: "/classroom/home/"},
    { name: "Classwork", href: "/classroom/classwork/"},
    { name: "Exam", href: "/classroom/exam/"},
    { name: "People", href: "/classroom/people/"},
  ]
  return (
    <div className='flex flex-row px-0 md:px-4 lg:px-6 items-start h-12 w-full border-b-2 border-secondary bg-background'>
      { NavLinks.map((link) => {
        return(
        <Link href={link.href} key={link.name} className='h-full'>
          <Button variant='ghost' className='h-full rounded-none'>{link.name}</Button>
        </Link>
      )})}
    </div>
  )
}

export default Navbar