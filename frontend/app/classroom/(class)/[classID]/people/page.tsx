import React from 'react'
import {  UserPlus } from "lucide-react"
import TeacherList from '@/components/People/TeacherList'
import ClassroomTeacherList from '@/components/People/ClassroomTeacherList/ClassroomTeacherList'
import ClassroomStudentList from '@/components/People/ClassroomStudentList/ClassroomStudentList'

const page = ({params,}:{
    params: {classID: 'string'}
}) => {
  return (
    <div className='xl:px-48 lg:px-32 md:px-24 sm:container pt-8'>
      <div className='pt-6'>
        <ClassroomTeacherList classID={params.classID}/>
      </div>
      <div className='pt-6'>
        <ClassroomStudentList classID={params.classID} />
      </div>
    </div>
  )
}

export default page