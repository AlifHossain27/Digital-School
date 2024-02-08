'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { getTeachers } from '@/actions/classroom'
import AddTeacher from '@/components/People/AddTeacher';
import { ImSpinner2 } from "react-icons/im";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import DeleteTeacher from './DeleteTeacher';

interface Teacher {
    profile_uid: string;
    full_name: string;
    email: string;
    contact_info: string;
    profile_picture: string;
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
        {teachers?.length === 0 && (
          <div className='pt-5 flex justify-center text-xl'>No Teacher</div>
        )}
        {teachers?.map((teacher:Teacher) => {
            return (
        <div className='py-4 text-xl pl-4 flex flex-row justify-between' key={teacher.profile_uid}>
          <div className='flex flex-row gap-6'>
            <Avatar>
                <AvatarImage src={teacher.profile_picture} alt="@profile" />
                <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <h1 className='pt-2'>{teacher.full_name}</h1>
          </div>
          { userType === "staff" && (
            <DeleteTeacher class_id={classroomID} profile_uid={teacher.profile_uid}/>
          )}
        </div>
            )
        })}
    </div>
  )
}

export default TeacherList