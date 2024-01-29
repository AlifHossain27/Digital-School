"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'

const error = ({error}: {error:Error}) => {
    useEffect(() => console.log(error), [error])
  return (
    <div className='flex w-full h-full flex-col justify-center items-center gap-4'>
        <h2 className='text-4xl'>Something went wrong</h2>
        <Button asChild>
            <Link href="/classroom/">Go to Classroom</Link>
        </Button>
    </div>
  )
}

export default error