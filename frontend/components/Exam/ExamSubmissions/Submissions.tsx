'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query'
import { getExam } from '@/actions/exam';
import { ImSpinner2 } from 'react-icons/im'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SubmissionsTable from './SubmissionsTable';


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


const Submissions = () => {
    const examID = useAppSelector((state) => state.examReducer.value.examID)
    const {data: exam, isLoading} = useQuery<Exam>({
        queryFn: () => getExam(examID),
        queryKey: ['submissions']
      })
    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }
  return (
    <div>
        <div className='py-4 border-b border-muted'>
            <div className='flex justify-between container'>
                <h1 className='text-4xl font-bold truncate'>{exam?.name}</h1>
                <Button asChild className='w-[200px]'>
                    <Link href={'/classroom/exam/attend'}>Visit</Link>
                </Button>
            </div>
        </div>
        <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>

        </div>
        <div className='container pt-10'>
            <SubmissionsTable examID={examID}/>
        </div>
    </div>
  )
}

export default Submissions