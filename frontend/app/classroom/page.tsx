'use client'
import { useAppSelector } from '@/redux/store';
import ClassroomList from '@/components/Classroom/ClassroomList';
import StaffClassroomList from '@/components/Classroom/StaffClassroom/StaffClassroomList'
import { Separator } from "@/components/ui/separator"
import { Suspense } from 'react';
import { ImSpinner2 } from "react-icons/im";



const page = () => {
    const user_type = useAppSelector((state) => state.authReducer.value.userType)

  return (
    <div className='container p-12'>
        <div className='text-2xl font-mono'>
            <h1>Classrooms</h1>
        </div>
        <Separator />
        <Suspense fallback={
          <div className='pt-20'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
          </div>
        }>
        <div className='pt-6'>
                {user_type === 'staff' ? <StaffClassroomList /> : <ClassroomList />}
        </div>
        </Suspense>
    </div>
  )
}

export default page