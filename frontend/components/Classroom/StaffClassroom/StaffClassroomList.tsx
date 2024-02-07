"use client"
import React from 'react'
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import CreateClassroom from '@/components/Classroom/StaffClassroom/CreateClassroom'
import DeleteClassroom from './DeleteClassroom'
import { useQuery } from '@tanstack/react-query';
import { getClassroom } from '@/actions/classroom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { SetClassroom } from '@/redux/features/classroom-slice';


interface Teacher {
    teacher_profile_id: string;
    full_name: string;
    email: string;
    contact_info: string;
  }
  
  interface Student {
    student_profile_id: string;
    full_name: string;
    father_name: string;
    mother_name: string;
  }
  
  interface Classroom {
    staff_profile_id: string;
    class_id: string;
    name: string;
    teachers: Teacher[];
    students: Student[];
  }

type StaffData = {
  userType: string;
  uid: string;
}

const StaffClassroomList = ( {userType,uid}: StaffData ) => {
  const dispatcher = useDispatch<AppDispatch>()
  const {data: classrooms} = useQuery({
    queryFn: () => getClassroom(userType, uid),
    queryKey: ['classrooms']
  })
  return (
    <div>
        <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-6 pb-8'>
            {classrooms?.map((classroom:Classroom) => {
              return (
                <Card className='h-32 flex justify-between items-center' key={classroom.class_id} onClick={() => dispatcher(SetClassroom(classroom.class_id))}>
                <Link href={`classroom/home`}>
                  <CardHeader>
                    <CardTitle>{classroom.name}</CardTitle>
                  </CardHeader>
                </Link>
                <div className='px-6'>
                  <DeleteClassroom classroomName={classroom.name} classroomID={classroom.class_id}/>
                </div>
              </Card>
              )
            })}
        </div>
      <Separator />
      <div className='pt-8'>
        <CreateClassroom/>
        </div>
    </div>
  )
}

export default StaffClassroomList