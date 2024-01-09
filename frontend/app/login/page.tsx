import React, { Suspense } from 'react'
import { Card } from "@/components/ui/card"
import { ImSpinner2 } from "react-icons/im";
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex h-full flex-col items-center justify-between p-12'>  
        <Suspense fallback = {
          <div className='pt-20'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
          </div>
        }>
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
        </Suspense>
    </div>
  )
}

export default page