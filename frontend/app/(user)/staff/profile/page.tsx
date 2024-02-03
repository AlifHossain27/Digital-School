import React, { Suspense } from 'react';
import { ImSpinner2 } from "react-icons/im";
import StaffProfile from '@/components/Profile/StaffProfile';


const page = () => {
  return (
    <main className="flex h-full flex-col p-12">
      <Suspense fallback = {
              <div className='pt-20'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
          <StaffProfile/>
        </Suspense>
    </main>
  )
}

export default page