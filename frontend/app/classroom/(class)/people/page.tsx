'use client'
import React from 'react'
import {  UserPlus } from "lucide-react"
import { useAppSelector } from '@/redux/store';
import TeacherList from '@/components/People/TeacherList'
import StudentList from '@/components/People/StudentList'
import AddTeacher from '@/components/People/AddTeacher';

const page = () => {
  const user_type = useAppSelector((state) => state.authReducer.value.userType);
  return (
    <div className='xl:px-48 lg:px-32 md:px-24 sm:container pt-8'>
      <div className='flex flex-row justify-between text-2xl border-b h-10'>
        <h1 className=''>Teachers</h1>
        {user_type === 'staff' ? <AddTeacher/> : <></>}
        
      </div>
      <div className='pt-6'>
        <TeacherList/>
      </div>
      <div className='pt-8'>
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
          <h1 className=''>Students</h1>
          {user_type === 'staff' ? <UserPlus/> : <></>}
        </div>
        <div className='pt-6'>
          <StudentList/>
        </div>
      </div>
    </div>
  )
}

export default page