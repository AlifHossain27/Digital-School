"use client"
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getClassworkSubmissionDetails } from '@/actions/classwork'
import { ImSpinner2 } from "react-icons/im";

interface Submission {
    submission_id: string,
    classwork: number,
    turn_in: boolean,
    attachment: string,
    attachment_name: string,
    attachment_size: number,
    obtained_points: number
}

const ClassworkGrade = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)

    const {data: classworkGrade, isLoading} = useQuery({
        queryFn: () => getClassworkSubmissionDetails(classworkID,classroomID),
        queryKey: ['classwork-submission']
      })
  return (
    <div className='py-5'>
        <div className='h-auto border rounded-lg shadow-lg px-5 py-5'>
        { isLoading && (
            <div className='flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>
        )}
        { classworkGrade && classworkGrade?.length === 0 ? (
            <h1>Your Point: 0</h1>
        ) : ( classworkGrade?.map((grade: Submission, i: number) => {
            const { obtained_points } = grade
            return (
                <h1>Your Point: { obtained_points }</h1>
            )
        })
            
        )}
        </div>
    </div>
  )
}

export default ClassworkGrade