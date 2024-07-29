'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getSubmission } from '@/actions/classwork';
import { ChevronLeft } from 'lucide-react';
import { ImSpinner2 } from "react-icons/im";
import Link from 'next/link';
import SubmissionPrivateComment from '@/components/Classwork/SubmissionPrivateComment';
import AddClassworkSubmissionGrade from '@/components/Classwork/AddClassworkSubmissionGrade';

interface Student {
  profile_uid: string;
  full_name: string;
  profile_picture: string;
}
  
interface Classwork {
  classwork_id: string;
  title: string;
  description: string;
  due_date: any;
  classroom: string;
}


interface Submission {
  submission_id: string;
  classwork: Classwork;
  student: Student;
  turn_in: boolean;
  attachment: string;
  attachment_name: string;
  attachment_size: number;
  obtained_points: number;
}

const SubmissionViewPage = ( { params }: { params: { submissionID: string}} ) => {
    const {data: submission, isLoading} = useQuery({
        queryFn: () => getSubmission(params.submissionID),
        queryKey: ['submission']
      })
  return (
    <div className='flex flex-col h-full w-full'>
      { isLoading && (
            <div className='flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>
        )}
      <div className='flex px-5 py-4 gap-4 border-b border-accent'>
        <Link href='/classroom/classwork/submission'>
          <ChevronLeft size='36' />
        </Link>
        
        <h1 className='text-[24px]'>{submission?.classwork}</h1>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1'>
          <div className='col-span-2'>
              <iframe src={submission?.attachment} className='px-4 py-4 w-full h-[740px]'></iframe>
          </div>
          
          <div className='px-4 py-4 w-screen md:w-full lg:w-full'>
            <AddClassworkSubmissionGrade submission_id={params.submissionID} obtained_points={submission?.obtained_points} />
            <SubmissionPrivateComment/>
          </div>
      </div>
    </div>
  )
}

export default SubmissionViewPage