import React, { Suspense } from 'react';
import { ImSpinner2 } from "react-icons/im";
import StudentProfile from '@/components/Profile/StudentProfile';

const page = () => {
  return (
    <main className="flex h-full flex-col p-12">
      <Suspense fallback = {
              <div className='pt-20'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
        <StudentProfile/>
      </Suspense>
    </main>
  )
}

export default page