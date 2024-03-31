'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { getExams } from '@/actions/exam'
import CreateExam from './CreateExam'
import Link from "next/link";
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns'
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { BiRightArrowAlt } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { ImSpinner2 } from "react-icons/im";
import { Button } from '@/components/ui/button'
import { SetExam } from '@/redux/features/exam-slice'

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

const TeacherExamList = () => {
  const dispatcher = useDispatch<AppDispatch>()
  const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
  const {data: exams, isLoading} = useQuery({
    queryFn: () => getExams(classroomID),
    queryKey: ['exams']
  })
  if (isLoading) {
    return (<div className='pt-20 flex justify-center'>
              <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>)
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8'>
      <CreateExam/>
      {exams?.map((exam: Exam) => {
          return (
            <Card key={exam.id}>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 justify-between'>
                  <span className='truncate font-bold'>
                    {exam.name}
                  </span>
                  {exam.published && <Badge>Published</Badge>}
                  {!exam.published && <Badge variant="destructive">Draft</Badge>}
                </CardTitle>
                <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
                  {formatDistance(exam.created_at, new Date(), {
                    addSuffix: true
                  })}
                  {
                    !exam.published && (
                      <span className='flex items-center gap-2'>
                        <LuView className='text-muted-foreground'/>
                        <span>{exam.visits.toLocaleString()}</span>
                        <FaWpforms className='text-muted-foreground'/>
                        <span>{exam.submissions.toLocaleString()}</span>
                      </span>
                    )
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
                  {exam.description || "No Description"}
              </CardContent>
              <CardFooter>
                {exam.published && (
                  <Button asChild variant="outline" className='w-full mt-2 text-md gap-4' onClick={() => dispatcher(SetExam(exam.id))}>
                    <Link href={'/classroom/exam/submissions'}>
                      View Submissions <BiRightArrowAlt/>
                    </Link>
                  </Button>
                )}
                {!exam.published && (
                  <Button asChild variant="outline" className='w-full mt-2 text-md gap-4' onClick={() => dispatcher(SetExam(exam.id))}>
                    <Link href={'/classroom/exam/edit'}>
                      Edit Exam <FaEdit/>
                    </Link>
                  </Button>
                )}
              </CardFooter>
          </Card>
          )
        })}
    </div>
  )
}

export default TeacherExamList