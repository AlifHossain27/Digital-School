'use client'
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import ClassroomList from '@/components/Classroom/ClassroomList';
import StaffClassroomList from '@/components/Classroom/StaffClassroom/StaffClassroomList'
import { Separator } from "@/components/ui/separator"
import { ImSpinner2 } from "react-icons/im";


const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user_type = useAppSelector((state) => state.authReducer.value.userType);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='container p-12'>
      <div className='text-2xl font-mono'>
        <h1>Classrooms</h1>
      </div>
      <Separator />
      {isLoading ? (
        <div className='pt-20'>
          <ImSpinner2 className="animate-spin" size="50" />
        </div>
      ) : (
        <div className='pt-6'>
          {user_type === 'staff' ? <StaffClassroomList /> : <ClassroomList />}
        </div>
      )}
    </div>
  );
}

export default page