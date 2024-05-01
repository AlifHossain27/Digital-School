'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import { getExamSubmission } from '@/actions/exam';
import { ImSpinner2 } from "react-icons/im";

interface Student {
    profile_uid: string,
    full_name: string,
    profile_picture: string
  }
  
  interface Exam {
    id: number,
    teacher: string,
    classroom: string,
    created_at: string,
    published: boolean,
    name: string,
    description: string,
    content: string,
    visits: number,
    submissions: number
  }
  
  interface ExamSubmission {
    id: number,
    student: Student,
    exam: Exam,
    content: string,
    created_at: string,
  }

const ExamSubmissionView = ( { params }: { params: { submissionID: string}} ) => {
    const examID = useAppSelector((state) => state.examReducer.value.examID)
    const {data: submission, isLoading} = useQuery<ExamSubmission>({
        queryFn: () => getExamSubmission(examID, Number(params.submissionID)),
        queryKey: ['submission']
      })
    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }
  return (
    <div className='w-full'>
        <h1>{submission?.exam?.name}</h1>
    </div>
  )
}

export default ExamSubmissionView