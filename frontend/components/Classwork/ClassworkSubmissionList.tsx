'use client'
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle
} from '@/components/ui/card';
import { getClassworkSubmission } from "@/actions/classwork";
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { ImSpinner2 } from "react-icons/im";
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { User } from 'lucide-react';
import Link from 'next/link';
import { getStudents } from '@/actions/classroom';

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
    const {data: studentList} = useQuery({
      queryFn: () => getStudents(classroomID),
      queryKey: ['students']
    })
    const submissionCount = submissionList?.length
    let classworkTitle
    submissionList?.map((submission:Submission) =>{
        classworkTitle = submission.classwork
    })
  return (
    <div>
      { isLoading ? (
            <div className='flex justify-center pt-5'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>
        ) : (
          <div>
            <div className='py-4 border-b border-muted'>
              <div className='flex justify-between container'>
                  <h1 className='text-4xl font-bold truncate'>{classworkTitle}</h1>
              </div>
            </div>
        
            <div className='w-full py-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container'>
              <Card className='shadow-md shadow-blue-600'>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                      <CardTitle className='text-sm font-medium text-muted-foreground'>Total Submissions</CardTitle>
                      <FaWpforms className='text-blue-600'size={20}/>
                  </CardHeader>
                  <CardContent>
                  <div className='text-2xl font-bold'>{submissionCount}</div>
                      <p className='text-xs text-muted-foreground pt-1'>Number of Assignment submission</p>
                  </CardContent>
              </Card>
              <Card className='shadow-md shadow-yellow-600'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium text-muted-foreground'>Total Students</CardTitle>
                    <User className='text-yellow-600'/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{studentList?.length}</div>
                    <p className='text-xs text-muted-foreground pt-1'>Total students in the classroom</p>
                </CardContent>
              </Card>
              <Card className='shadow-md shadow-green-600'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium text-muted-foreground'>Submission Rate</CardTitle>
                    <HiCursorClick className='text-green-600' size={20}/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{((submissionCount/studentList.length)*100).toFixed(2)} %</div>
                    <p className='text-xs text-muted-foreground pt-1'>Rate of Assignment submission</p>
                </CardContent>
              </Card>
            </div>
            <h1 className='text-2xl font-bold py-2 border-b border-accent'>All Submissions</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-2 md:gap-2 lg:gap-5 xl:gap-5 py-2'>
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
                  <div key={submission.submission_id} className='border rounded-md h-auto py-6 px-4'>
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