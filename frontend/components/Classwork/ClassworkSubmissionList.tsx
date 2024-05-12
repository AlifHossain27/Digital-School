'use client'
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { getClassworkSubmission } from "@/actions/classwork";
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { ImSpinner2 } from "react-icons/im";
import Link from 'next/link';

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


const ClassworkSubmissionList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)
    const {data: submissionList, isLoading} = useQuery({
        queryFn: () => getClassworkSubmission(classworkID, classroomID),
        queryKey: ['classwork-submissions']
      })
    const submissionCount = submissionList?.length
    let classworkTitle
    submissionList?.map((submission:Submission) =>{
        classworkTitle = submission.classwork
    })
  return (
    <div className='container'>
      { isLoading ? (
            <div className='flex justify-center pt-5'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>
        ) : (
          <div>
            <h1 className='text-[32px]'>{classworkTitle}</h1>
        
            <div className='flex py-5'>
                <div className='border-l border-r px-5'>
                    <h1 className='text-[36px] text-center'>{submissionCount}</h1>
                    <h1 className='text-[14px]'>Turned In</h1>
                </div>
            </div>
            <h1 className='py-2 border-b border-accent'>All Submissions</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
            {submissionList && submissionList.length === 0 ? (
              <h1 className='text-[12px] py-5 px-2'>No Submissions</h1>
            ) : (
              submissionList?.map((submission: Submission) => {
                return (
                  <Link href={{
                    pathname: `submission/${submission.submission_id}/`,
                    query: {
                      studentID: submission.student.profile_uid
                    }
                  }} className='py-5'>
                  <div key={submission.submission_id} className='border rounded-md h-auto py-4 px-4'>
                      <div className='flex gap-2 hover:cursor-pointer'>
                      <Avatar>
                          <AvatarImage src={submission.student.profile_picture} alt="@profile" />
                          <AvatarFallback>Profile</AvatarFallback>
                      </Avatar>
                    <h1 className='pt-1'>{submission.student.full_name}</h1>
                    </div>
                  </div>
                  </Link>
                )
              })
            )}
            
          </div>
              </div>
        )}
        
    </div>
  )
}

export default ClassworkSubmissionList