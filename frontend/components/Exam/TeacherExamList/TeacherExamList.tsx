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
import getExams from '@/actions/getExams'
import CreateExam from './CreateExam'
import Link from "next/link";
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns'
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { BiRightArrowAlt } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

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
  const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
  const {data: exams} = useQuery({
    queryFn: () => getExams(classroomID),
    queryKey: ['exams']
  })
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
                  <Button asChild variant="outline" className='w-full mt-2 text-md gap-4'>
                    <Link href={'/classroom/exam/view'}>
                      View Submissions <BiRightArrowAlt/>
                    </Link>
                  </Button>
                )}
                {!exam.published && (
                  <Button asChild variant="outline" className='w-full mt-2 text-md gap-4'>
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