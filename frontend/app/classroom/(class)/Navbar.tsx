import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const NavLinks = [
    { name: "Home", href: "home/"},
    { name: "Classwork", href: "classwork/"},
    { name: "People", href: "people/"},
  ]
  return (
    <div className='flex flex-row px-6 items-start h-12 w-full border-b-2 border-secondary'>
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