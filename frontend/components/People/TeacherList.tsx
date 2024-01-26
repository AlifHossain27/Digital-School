'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import getTeachers from '@/actions/getTeachers'
import AddTeacher from '@/components/People/AddTeacher';
import { ImSpinner2 } from "react-icons/im";

interface Teacher {
    teacher_profile_id: string;
    full_name: string;
    email: string;
    contact_info: string;
}

const TeacherList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const router = useRouter()
    const {data: teachers, isLoading} = useQuery({
        queryFn: () => getTeachers(classroomID),
        queryKey: ['teachers']
      })
    
    let addBtn
    const userType = useAppSelector((state) => state.authReducer.value.userType)
    if (userType === "admin" || userType === "staff"){
      addBtn =(
        <div>
          <AddTeacher />
        </div>
      )
    } else {
      <div></div>
    }
  return (
    <div>
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
            <h1 className=''>Teachers</h1>
            {addBtn}
        </div>
        {isLoading && (
          <div className='pt-20 flex justify-center'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
          </div>
        )}
        {teachers?.map((teacher:Teacher) => {
            return (
        <div className='py-4 text-xl pl-4' key={teacher.teacher_profile_id}>
            <h1>{teacher.full_name}</h1>
        </div>
            )
        })}
    </div>
  )
}

export default TeacherList