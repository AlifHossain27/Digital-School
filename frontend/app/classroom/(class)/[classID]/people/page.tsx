import React, {Suspense} from 'react'
import { ImSpinner2 } from "react-icons/im";
import ClassroomTeacherList from '@/components/People/ClassroomTeacherList/ClassroomTeacherList'
import ClassroomStudentList from '@/components/People/ClassroomStudentList/ClassroomStudentList'

const page = ({params,}:{
    params: {classID: 'string'}
}) => {
  return (
    <div className='xl:px-48 lg:px-32 md:px-24 sm:container pt-8'>
      <Suspense fallback = {
              <div className='pt-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
              </div>
        }>
      <div className='pt-6'>
        <ClassroomTeacherList classID={params.classID}/>
      </div>

      <div className='pt-6'>
        <ClassroomStudentList classID={params.classID} />
      </div>
      </Suspense>
    </div>
  )
}

export default page