'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { useAppSelector } from '@/redux/store';
import getClassworks from '@/actions/getClassworks'
import { Button } from "../ui/button";
import EditClasswork from "./EditClasswork";
import DeleteClasswork from "./DeleteClasswork";
import Link from "next/link";
import { SetClasswork } from "@/redux/features/classwork-slice";

interface Classwork {
    id: number,
    teacher_profile_id: string,
    title: string,
    description: string,
    due_date: any
}

const ClassworkList = () => {
    const dispatcher = useDispatch<AppDispatch>()
    const userType = useAppSelector((state) => state.authReducer.value.userType)
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const {data: classworks} = useQuery({
        queryFn: () => getClassworks(classroomID),
        queryKey: ['classworks']
      })
  return (
    <div className="pt-6">
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
            <h1 className=''>Classworks</h1>
        </div>
        {classworks?.map((classwork: Classwork,i: number) => {
            return (
            <Accordion type="single" collapsible className="text-xl" key={classwork.id}>
                <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>{classwork.title}</AccordionTrigger>
                <AccordionContent className="text-lg">
                    {classwork.description}
                    {userType==="teacher" ? (
                    <div className="pt-6 flex flex-row gap-6">
                        <Link href='/classroom/classwork/submissions/'>
                            <Button className="rounded-full">View Submissions</Button>
                        </Link>
                        <EditClasswork 
                        classworkID={classwork.id} 
                        classworkTitle={classwork.title} 
                        classworkDescription={classwork.description}
                        classworkDueDate={classwork.due_date}/>
                        <DeleteClasswork classworkID={classwork.id} classworkTitle={classwork.title}/>
                    </div>
                    ):(<div className="pt-6 flex flex-row gap-6">
                        <Link href='/classroom/classwork/view/' onClick={() => dispatcher(SetClasswork(classwork.id))}>
                            <Button className="rounded-full">View Submissions</Button>
                        </Link>
                    </div>)}
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            )
        })}
    </div>
  )
}

export default ClassworkList