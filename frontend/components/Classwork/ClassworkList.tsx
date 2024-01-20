'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import getClassworks from '@/actions/getClassworks'

interface Classwork {
    id: number,
    teacher_profile_id: string,
    title: string,
    description: string,
    due_date: any
}

const ClassworkList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const {data: classworks} = useQuery({
        queryFn: () => getClassworks(classroomID),
        queryKey: ['classworks']
      })
  return (
    <div>
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
            <h1 className=''>Classworks</h1>
        </div>
        {classworks?.map((classwork: Classwork) => {
            return (
        <div className='py-4 text-xl pl-4' key={classwork.id}>
            <h1 >{classwork.title}</h1>
        </div>
            )
        })}
    </div>
  )
}

export default ClassworkList