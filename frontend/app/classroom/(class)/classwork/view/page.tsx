import React from 'react'
import ClassworkDetails from '@/components/Classwork/ClassworkDetails'
import ClassworkSubmission from '@/components/Classwork/ClassworkSubmission'
import ClassworkComment from '@/components/Classwork/ClassworkComment'
import ClassworkPrivateComment from '@/components/Classwork/ClassworkPrivateComment'
import ClassworkGrade from '@/components/Classwork/ClassworkGrade'


const ClassworkViewPage = () => {
  return (
    <div className='container mx-auto pt-5'>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-1 gap-4'>
        <div className='col-span-2'>
          <ClassworkDetails/>
          <ClassworkComment/>
        </div>
        <div className='container col-span-1'>
          <ClassworkSubmission/>
          <ClassworkGrade/>
          <ClassworkPrivateComment/>
        </div>
      </div>
    </div>
  )
}

export default ClassworkViewPage