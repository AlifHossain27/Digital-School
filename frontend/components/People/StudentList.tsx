'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import getStudents from '@/actions/getStudents'
import AddStudent from './AddStudent';

interface Student {
    student_profile_id: string;
    full_name: string;
    father_name: string;
    mother_name: string;
}

const StudentList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)

    const {data: students} = useQuery({
        queryFn: () => getStudents(classroomID),
        queryKey: ['students']
      })

    let addBtn
    const userType = useAppSelector((state) => state.authReducer.value.userType)
    if (userType === "admin" || userType === "staff"){
      addBtn =(
        <div>
          <AddStudent />
        </div>
      )
    } else {
      <div></div>
    }
  return (
    <div>
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
            <h1 className=''>Students</h1>
            {addBtn}
        </div>
        {students?.map((student: Student) => {
            return (
        <div className='py-4 text-xl pl-4' key={student.student_profile_id}>
            <h1>{student.full_name}</h1>
        </div>
            )
        })}
    </div>
  )
}

export default StudentList