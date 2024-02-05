import EditStudentProfile from '@/components/EditProfile/EditStudentProfile';
import React, { Suspense } from 'react';
import { ImSpinner2 } from "react-icons/im";


const StudentProfileUpdate = () => {
  return (
    <main className="flex h-full flex-col p-12">
      <Suspense fallback = {
              <div className='h-full flex items-center justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
          <EditStudentProfile/>
        </Suspense>
    </main>
  )
}

export default StudentProfileUpdate