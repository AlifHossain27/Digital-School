'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import getClassworks from '@/actions/getClassworks'
import { Button } from "../ui/button";
import EditClasswork from "./EditClasswork";

interface Classwork {
    id: number,
    teacher_profile_id: string,
    title: string,
    description: string,
    due_date: any
}

const ClassworkList = () => {
    const userType = useAppSelector((state) => state.authReducer.value.userType)
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
        {classworks?.map((classwork: Classwork,i: number) => {
            return (
            <Accordion type="single" collapsible className="text-xl" key={classwork.id}>
                <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>{classwork.title}</AccordionTrigger>
                <AccordionContent className="text-lg">
                    {classwork.description}
                    {userType==="teacher" ? (
                    <div className="pt-6 rounded-full flex flex-row gap-6">
                        <EditClasswork 
                        classworkID={classwork.id} 
                        classworkTitle={classwork.title} 
                        classworkDescription={classwork.description}
                        classworkDueDate={classwork.due_date}/>
                        <Button variant='destructive'>Delete Classwork</Button>
                    </div>
                    ):(<div></div>)}
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            )
        })}
    </div>
  )
}

export default ClassworkList