import React from 'react'
import { Card } from "@/components/ui/card"
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-12'>
        <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-2xl flex border-b'>
            <Link href="/">Digital School</Link>
        </div>
        <div className="flex-auto flex justify-center py-28">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-y-6 gap-x-6">
                <div>
                    <Link href= "/student/login">
                        <Card className='h-64 w-64 flex justify-center items-center rounded-xl text-xl hover:border-4 hover:text-3xl hover:shadow-xl'>
                            <h1 className='font-sans'>Student</h1>
                        </Card>
                    </Link>
                </div>
                <div>
                    <Link href= "teacher/login">
                        <Card className='h-64 w-64 flex justify-center items-center rounded-xl text-xl hover:border-4 hover:text-3xl hover:shadow-xl'>
                            <h1 className='font-sans'>Teacher</h1>
                        </Card>
                    </Link>
                </div>
                <div>
                    <Link href= "staff/login">
                        <Card className='h-64 w-64 flex justify-center items-center rounded-xl text-xl hover:border-4 hover:text-3xl hover:shadow-xl'>
                            <h1 className='font-sans'>Staff</h1>
                        </Card>
                    </Link>
                </div>
                <div>
                    <Link href= "admin/login">
                        <Card className='h-64 w-64 flex justify-center items-center rounded-xl text-xl hover:border-4 hover:text-3xl hover:shadow-xl'>
                            <h1 className='font-sans'>Admin</h1>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page