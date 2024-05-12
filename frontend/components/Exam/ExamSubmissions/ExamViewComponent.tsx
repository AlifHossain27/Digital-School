'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getExamSubmission } from '@/actions/exam';
import { ImSpinner2 } from "react-icons/im";
import { FormElementInstance, FormElements } from '../ExamForm/FormElements'

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

const ExamViewComponent = ({examID,content,submissionID}: {content: FormElementInstance[]; examID: number; submissionID: string}) => {
    const {data: submittedData, isLoading} = useQuery<ExamSubmission>({
        queryFn: () => getExamSubmission(examID, Number(submissionID)),
        queryKey: ['exam-submission', submissionID]
    })

    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }

    const submissionData = `${submittedData?.content ?? '[]'}`
    const submissionContent = JSON.parse(submissionData) as FormElementInstance[]

    return (
        <div className='flex justify-center w-full h-full items-center p-8'>
            <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-xl shadow-blue-700 rounded opacity-80 cursor-not-allowed pointer-events-none'>
                {
                    content.map((element) => {
                        const FormElement = FormElements[element.type].formComponent;
                        return <FormElement 
                                key={element.id} 
                                elementInstance={element} 
                                defaultValue= {String(submissionContent[Number(element.id)]) || ''}
                                />
                    })   
                }
            </div>
        </div>
    )
}

export default ExamViewComponent