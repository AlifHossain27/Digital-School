'use client'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getExamSubmission } from '@/actions/exam';
import { ImSpinner2 } from "react-icons/im";
import { FormElementInstance, FormElements } from '../ExamForm/FormElements'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  interface Mark {
    id: number;
    value: number;
}

const ExamViewComponent = ({examID,content,submissionID}: {content: FormElementInstance[]; examID: number; submissionID: string}) => {
    const {data: submittedData, isLoading} = useQuery<ExamSubmission>({
        queryFn: () => getExamSubmission(examID, Number(submissionID)),
        queryKey: ['exam-submission', submissionID]
    })

    const [marks, setMarks] = useState<Mark[]>([])

    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }

    const submissionData = `${submittedData?.content ?? '[]'}`
    const submissionContent = JSON.parse(submissionData) as FormElementInstance[]

    let assignedMarks: String[] = []
    let hasHelperText = false
    
    const handleMarkChange = (index: number, value: number) => {
        setMarks(prevMarks => {
            const markIndex = prevMarks.findIndex(mark => mark.id === index);
            if (markIndex >= 0) {
                // If the mark with the same index exists, update its value
                const updatedMarks = [...prevMarks];
                updatedMarks[markIndex].value = value;
                return updatedMarks;
            } else {
                // If the mark does not exist, add a new one
                return [...prevMarks, { id: index, value }];
            }
        });
    };

    const totalMarksObtained = marks.reduce((acc, curr) => acc + curr.value, 0);
    
    return (
        <div className='flex flex-col gap-8 justify-center w-full h-full items-center p-8'>
            <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-lg shadow-blue-700 rounded opacity-80'>
                {
                    content.map((element, i) => {
                        const FormElement = FormElements[element.type].formComponent;
                        if (element?.extraAttributes?.helperText) {
                            hasHelperText = true
                            assignedMarks.push(element.extraAttributes.helperText)
                        }
                        return (
                        <div key={i}>
                            <div className='cursor-not-allowed pointer-events-none'>
                                <FormElement 
                                    key={element.id} 
                                    elementInstance={element} 
                                    defaultValue= {String(submissionContent[Number(element.id)]) || ''}
                                    />
                            </div>
                            {element?.extraAttributes?.helperText ? (
                                <div className='flex gap-4 pt-2'>
                                    <Input type='number' 
                                        className='w-40 h-8 border-t-[0.4px] border-l-[0.4px] border-r-[0.4px]' 
                                        max={element.extraAttributes.helperText} 
                                        onChange={(e)=>{ 
                                            e.preventDefault()
                                            const newValue = Number(e.target.value);
                                                if (newValue >= 0 && newValue <= Number(element?.extraAttributes?.helperText)) {
                                                    handleMarkChange(i, newValue);
                                                }
                                                if (newValue > Number(element?.extraAttributes?.helperText)){
                                                    e.target.value = ""
                                                }
                                                }}/>
                                    <h1 className='pt-1'>{assignedMarks[i]}</h1>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>)
                    })   
                }
            </div>
            {hasHelperText && (
                <div className='flex justify-between max-w-[620px] bg-background w-full p-8 shadow-xl shadow-green-700 rounded opacity-80'>
                    <h1 className='pt-2'>Total Marks Obtained: {totalMarksObtained} / {assignedMarks.map(Number).reduce((acc, curr) => acc + curr, 0)}</h1>
                    <Button className='bg-green-600 h-10 rounded-none'>Submit Marks</Button>
                </div>
            )}
        </div>
    )
}

export default ExamViewComponent