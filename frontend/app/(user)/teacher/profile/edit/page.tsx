import React, { Suspense } from 'react';
import { ImSpinner2 } from "react-icons/im";
import EditEmployeeProfile from '@/components/EditProfile/EditEmployeeProfile';

const TeacherProfileUpdate = () => {
  return (
    <main className="flex h-full flex-col p-12">
      <Suspense fallback = {
              <div className='h-full flex items-center justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
          <EditEmployeeProfile/>
        </Suspense>
    </main>
  )
}

export default TeacherProfileUpdate