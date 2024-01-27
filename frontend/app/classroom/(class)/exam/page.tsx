'use client'
import React, { Suspense } from 'react'
import { useAppSelector } from '@/redux/store';
import TeacherExamList from '@/components/Exam/TeacherExamList/TeacherExamList';
import PublicExamList from '@/components/Exam/PublicExamList';
import { ImSpinner2 } from "react-icons/im";

const page = () => {
    const user_type = useAppSelector((state) => state.authReducer.value.userType);
  return (
    <div className='container pt-12'>
        <div className='text-2xl font-mono border-b border-secondary'>
            <h1>Exams</h1>
        </div>
        <Suspense fallback = {
          <div className='pt-20 flex justify-center'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
          </div>
        }>
          <div>
          {user_type === 'teacher' || user_type === 'staff' ? 
              <TeacherExamList/>
            : <PublicExamList/>}
          </div>
        </Suspense>
    </div>
  )
}

export default page