import React, {Suspense} from 'react'
import { ImSpinner2 } from "react-icons/im";
import StaffDataTable from '@/components/StaffList/StaffDataTable'

const StaffListPage = () => {
  return (
    <div className='px-4'>
      <Suspense fallback = {
          <div className='h-full flex items-center justify-center pt-10'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
          </div>
        }>
      <StaffDataTable/>
      </Suspense>
    </div>
  )
}

export default StaffListPage