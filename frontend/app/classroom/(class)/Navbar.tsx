import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row px-6 items-start h-12 w-full border-b-2 border-secondary'>
      <Link href='home/' className='h-full'>
        <Button variant='ghost' className='h-full rounded-none'>Home</Button>
      </Link>
      <Link href='people/' className='h-full'>
        <Button variant='ghost' className='h-full rounded-none'>People</Button>
      </Link>
    </div>
  )
}

export default Navbar