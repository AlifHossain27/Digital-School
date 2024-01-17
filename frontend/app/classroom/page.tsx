"use client"
import { useAppSelector } from '@/redux/store';
import ClassroomList from '@/components/Classroom/ClassroomList';
import StaffClassroomList from '@/components/Classroom/StaffClassroom/StaffClassroomList'
import { Separator } from "@/components/ui/separator"




const page = () => {
    const user_type = useAppSelector((state) => state.authReducer.value.userType)

  return (
    <div className='container p-12'>
        <div className='text-2xl font-mono'>
            <h1>Classrooms</h1>
        </div>
        <Separator />
        <div className='pt-6'>
                {user_type === 'staff' ? <StaffClassroomList /> : <ClassroomList />}
        </div>
    </div>
  )
}

export default page