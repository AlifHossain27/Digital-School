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
import { getClassworks } from "@/actions/classwork";
import { Button } from "../ui/button";
import EditClasswork from "./EditClasswork";
import DeleteClasswork from "./DeleteClasswork";
import Link from "next/link";
import { SetClasswork } from "@/redux/features/classwork-slice";
import { ImSpinner2 } from "react-icons/im";

interface Classwork {
    classwork_id: string;
    title: string;
    description: string;
    due_date: string;
    teacher: string;
    classroom: string;
    students: string;
}

const ClassworkList = () => {
    const dispatcher = useDispatch<AppDispatch>()
    const userType = useAppSelector((state) => state.authReducer.value.userType)
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const {data: classworks, isLoading} = useQuery({
        queryFn: () => getClassworks(classroomID),
        queryKey: ['classworks']
      })
  return (
    <div className="pt-6">
        <div className='flex flex-row justify-between text-2xl border-b h-10'>
            <h1 className=''>Classworks</h1>
        </div>
        {isLoading && (<div className='pt-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>)}
        {classworks?.map((classwork: Classwork,i: number) => {
            return (
            <Accordion type="single" collapsible className="text-xl" key={classwork.classwork_id}>
                <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>{classwork.title}</AccordionTrigger>
                <AccordionContent className="text-lg">
                    {classwork.description}
                    {userType==="teacher" ? (
                    <div className="pt-6 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        <Link href='/classroom/classwork/submissions/' onClick={() => dispatcher(SetClasswork(classwork.classwork_id))}>
                            <Button className="rounded-full w-full">View Submissions</Button>
                        </Link>
                        <EditClasswork 
                        classworkID={classwork.classwork_id} 
                        classworkTitle={classwork.title} 
                        classworkDescription={classwork.description}
                        classworkDueDate={classwork.due_date}/>
                        <DeleteClasswork classworkID={classwork.classwork_id} classworkTitle={classwork.title}/>
                    </div>
                    ):(<div className="pt-6 flex flex-row gap-6">
                        <Link href='/classroom/classwork/view/' onClick={() => dispatcher(SetClasswork(classwork.classwork_id))}>
                            <Button className="rounded-full">View Classwork</Button>
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