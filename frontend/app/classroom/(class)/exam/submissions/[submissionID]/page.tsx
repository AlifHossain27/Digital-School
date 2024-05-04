'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import { getExam, getExamSubmission } from '@/actions/exam';
import { ImSpinner2 } from "react-icons/im";
import { ChevronLeft } from 'lucide-react';
import { FormElementInstance } from '@/components/Exam/ExamForm/FormElements';
import ExamViewComponent from '@/components/Exam/ExamSubmissions/ExamViewComponent';
import Link from 'next/link';

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
  

const ExamSubmissionView = ( { params }: { params: { submissionID: string}} ) => {
    const examID = useAppSelector((state) => state.examReducer.value.examID)
    const {data: exam , isLoading} = useQuery<Exam>({
      queryFn: () => getExam(examID),
      queryKey: ['exam-data'],
    })
    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }

    const examData = `${exam?.content ?? '[]'}`
    const examContent = JSON.parse(examData) as FormElementInstance[]

  return (
    <div className='w-full'>
        <div className='flex py-4 border-b border-muted'>
            <Link href={'/classroom/exam/submissions/'} className='pt-2 pl-4'>
              <ChevronLeft />
            </Link>
            <div className='flex justify-between container'>
                <h1 className='text-4xl font-bold truncate'>{exam?.name}</h1>
            </div>
        </div>
        <ExamViewComponent examID={examID} content={examContent} submissionID={params.submissionID}/>
    </div>
  )
}

export default ExamSubmissionView