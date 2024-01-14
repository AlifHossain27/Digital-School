import React, { Suspense } from 'react';
import { ImSpinner2 } from "react-icons/im";
import EditStaffProfile from '@/components/EditProfile/EditStaffProfile';

const page = () => {
  return (
    <main className="flex h-full flex-col p-12">
      <Suspense fallback = {
              <div className='pt-20'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
          <EditStaffProfile/>
        </Suspense>
    </main>
  )
}

export default page