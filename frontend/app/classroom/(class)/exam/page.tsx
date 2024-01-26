'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import TeacherExamList from '@/components/Exam/TeacherExamList/TeacherExamList';
import PublicExamList from '@/components/Exam/PublicExamList';

const page = () => {
    const user_type = useAppSelector((state) => state.authReducer.value.userType);
  return (
    <div className='pt-12'>
        <div className='text-2xl font-mono border-b border-secondary'>
            <h1>Exams</h1>
        </div>
        <div>
        {user_type === 'teacher' || user_type === 'staff' ? 
            <TeacherExamList/>
           : <PublicExamList/>}
        </div>
    </div>
  )
}

export default page