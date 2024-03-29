'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getSubmission } from '@/actions/classwork';

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
    attachment_size: number
  }

const SubmissionViewPage = ( { params }: { params: { submissionID: string}} ) => {
    const {data: submission, isLoading} = useQuery<Submission>({
        queryFn: () => getSubmission(params.submissionID),
        queryKey: ['submission']
      })
  return (
    <div className='grid grid-cols-3'>
        <div className='col-span-2'>
            <h1 className='px-4 py-4 text-[24px]'>Student: {submission?.student.full_name}</h1>
            <iframe src={submission?.attachment} className='px-4 py-4 w-full h-[740px]'></iframe>
        </div>
        
        <div className=''>Details</div>
    </div>
  )
}

export default SubmissionViewPage