import React from 'react'
import {  UserPlus } from "lucide-react"
import TeacherList from '@/components/People/TeacherList'
import StudentList from '@/components/People/StudentList'

const page = () => {
  return (
    <div className='xl:px-48 lg:px-32 md:px-24 sm:container pt-8'>
      <div className='flex flex-row justify-between text-2xl border-b h-10'>
        <h1 className=''>Teachers</h1>
        <UserPlus/>
      </div>
      <div className='pt-6'>
        <TeacherList/>
      </div>
      <div className='pt-8'>
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
          <h1 className=''>Students</h1>
          <UserPlus/>
        </div>
        <div className='pt-6'>
          <StudentList/>
        </div>
      </div>
    </div>
  )
}

export default page