'use client'
import React, {Suspense} from 'react'
import { ImSpinner2 } from "react-icons/im";
import { useAppSelector } from '@/redux/store';
import AddClasswork from '@/components/Classwork/AddClasswork';
import ClassworkList from '@/components/Classwork/ClassworkList';



const page = () => {
  let addBtn
    const userType = useAppSelector((state) => state.authReducer.value.userType)
    if (userType === "teacher"){
      addBtn =(
        <div>
          <AddClasswork/>
        </div>
      )
    } else {
      <div></div>
    }
  return (
    <div className='xl:px-48 lg:px-32 md:px-24 sm:container pt-6'>
      <Suspense fallback = {
              <div className='pt-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
      <div className='pt-4'>
        {addBtn}
      </div>

      <div className='pt-4'>
        <ClassworkList/>
      </div>
      </Suspense>
    </div>
  )
}

export default page