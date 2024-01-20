'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import getClassworkDetail from '@/actions/getClassworkDetail'
import AddSubmission from '@/components/Classwork/AddSubmission';
import StudentSubmissionList from '@/components/Classwork/StudentSubmissionList';


interface Teacher {
  teacher_profile_id: string;
}

interface Classwork {
  id: number;
  teacher: Teacher;
  title: string;
  description: string;
  due_date: any;
  classroom: number;
  students: any[];
}

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const page = () => {
  const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)
  const uid = useAppSelector((state) => state.uidReducer.value.userID)
  const {data: classwork} = useQuery<Classwork>({
    queryFn: () => getClassworkDetail(classworkID),
    queryKey: ['classwork']
  })
  
  const formattedDueDate = classwork?.due_date
    ? new Date(classwork.due_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const daySuffix = classwork?.due_date
    ? getDaySuffix(new Date(classwork.due_date).getDate())
    : '';
  return (
    <div className='pt-6 flex flex-col'>
      <div className='text-4xl'>
        {classwork?.title}
      </div>
      <div className='text-sm pb-2 font-mono'>
      Due Date: {formattedDueDate.replace(/\b\d{1,2}\b/, `$&${daySuffix}`)}
      </div>
      <div className='pt-4'>
        <h1 className='text-2xl'>Description:</h1>
        <h1 className='text-xl'>{classwork?.description}</h1>
      </div>
      <StudentSubmissionList/>
      <AddSubmission classworkID= {classworkID} uid={uid}/>
    </div>
  )
}

export default page