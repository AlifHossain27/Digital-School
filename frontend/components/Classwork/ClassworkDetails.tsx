'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getClassworkDetails } from '@/actions/classwork';
import { ImSpinner2 } from "react-icons/im";
import { TbClipboardText } from "react-icons/tb";

interface Teacher {
    profile_uid: string;
    full_name: string;
  }

interface Classwork {
    classwork_id: string;
    teacher: Teacher;
    title: string;
    description: string;
    due_date: any;
    classroom: number;
    
  }

const ClassworkDetails = () => {
    const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)
    const {data: classwork, isLoading} = useQuery<Classwork>({
        queryFn: () => getClassworkDetails(classworkID),
        queryKey: ['classwork']
    })
    if (isLoading) {
        return (
        <div className='pt-20 flex justify-center'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
        </div>
        )
    }
  return (
    <div className='flex flex-row gap-2'>
        <div className='pt-5'>
            <div className='bg-[#1967D2] h-12 w-12 rounded-full pt-3 pl-3'>
                <TbClipboardText size={24} color='#FFFFFF' />
            </div>
        </div>
        <div className='w-full'>
          <h1 className='text-[32px] text-[#1967D2] pt-4'>
            {classwork?.title}
          </h1>
          <div className='flex flex-row justify-between text-[14px] text-[#5F6368] pb-4 border-b border-[#1967D2]'>
            <h1>{classwork?.teacher.full_name}</h1>
            
            <h1>Due date: {new Date(classwork?.due_date).toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
          </div>
          <div className='py-4 border-b border-[#5F6368]'>
            <h1 className='text-[16px]'>{classwork?.description}</h1>
          </div>
        </div>
    </div>
  )
}

export default ClassworkDetails