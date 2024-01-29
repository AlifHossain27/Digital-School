'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query'
import getExam from '@/actions/getExam';
import { ImSpinner2 } from 'react-icons/im'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FormElementInstance } from '../ExamForm/FormElements';
import FormSubmitComponent from './FormSubmitComponent';


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


const SubmitPage = () => {
    const examID = useAppSelector((state) => state.examReducer.value.examID)
    const {data: exam, isLoading} = useQuery<Exam>({
        queryFn: () => getExam(examID),
        queryKey: ['submit']
      })
    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }
    if (!exam){
        throw new Error("Exam not found")
    }
    const examContent = `${exam?.content ?? '[]'}`
    const formContent = JSON.parse(examContent) as FormElementInstance[];
  return (
    <div className='w-full h-full'>
        <FormSubmitComponent examID={examID} content={formContent}/>
    </div>
  )
}

export default SubmitPage