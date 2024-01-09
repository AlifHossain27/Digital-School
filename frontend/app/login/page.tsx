import React, { Suspense } from 'react'
import { Card } from "@/components/ui/card"
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex h-full flex-col items-center justify-between p-12'>  
        <Suspense fallback = {
          <div className='pt-10'>
            <svg 
            className='animate-spin h-24 w-24'
            fill="none" 
            height="20" 
            viewBox="0 0 20 20" 
            width="20" 
            xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" 
            fill="#212121"/></svg>
          </div>
        }
        />
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