'use client'
import React, {Suspense} from 'react'
import { ImSpinner2 } from "react-icons/im";
import { useAppSelector } from '@/redux/store';
import ClassroomTeacherList from '@/components/People/ClassroomTeacherList/ClassroomTeacherList'
import ClassroomStudentList from '@/components/People/ClassroomStudentList/ClassroomStudentList'
import TeacherList from '@/components/People/TeacherList';
import StudentList from '@/components/People/StudentList';

const page = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
  return (
    <div className='xl:px-48 lg:px-32 md:px-24 sm:container pt-8'>
      <Suspense fallback = {
              <div className='pt-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
      <div className='pt-6'>
        <TeacherList/>
        
      </div>

      <div className='pt-6'>
        <StudentList/>
      </div>
      </Suspense>
    </div>
  )
}

export default page