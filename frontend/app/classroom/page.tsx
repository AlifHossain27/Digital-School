'use client'
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import ClassroomList from '@/components/Classroom/ClassroomList';
import StaffClassroomList from '@/components/Classroom/StaffClassroom/StaffClassroomList'
import { Separator } from "@/components/ui/separator"
import { ImSpinner2 } from "react-icons/im";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userType = useAppSelector((state) => state.authReducer.value.userType);
  const uid = useAppSelector((state) => state.uidReducer.value.userID);

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
        <div className='pt-20 flex justify-center'>
          <ImSpinner2 className="animate-spin" size="50" />
        </div>
      ) : (
        <div className='pt-6'>
          {userType === 'staff' ? 
          <QueryClientProvider client={queryClient}>
            <StaffClassroomList userType= {userType} uid= {uid} />
          </QueryClientProvider> : <ClassroomList />}
        </div>
      )}
    </div>
  );
}

export default page