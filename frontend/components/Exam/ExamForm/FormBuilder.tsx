'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query'
import getExam from '@/actions/getExam';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import Designer from './Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';

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

const FormBuilder = () => {
    const examID = useAppSelector((state) => state.examReducer.value.examID)
    const {data: exam, isLoading} = useQuery<Exam>({
        queryFn: () => getExam(examID),
        queryKey: ['exam']
      })
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        }
    })
    const sensors = useSensors(mouseSensor, touchSensor)
  return (
    <DndContext sensors={sensors}>
        <main className='flex flex-col w-full h-full'>
            <nav className='flex justify-between border-b-2 border-secondary p-4 gap-3 items-center'>
                <h2 className='truncate font-medium'>
                    <span className='text-muted-foreground mr-2'>Exam: </span>
                    {exam?.name}
                </h2>
                <div className='flex items-center gap-2'>
                    <PreviewDialogBtn/>
                        {!exam?.published && (
                            <div className='flex items-center gap-2'>
                                <SaveFormBtn examID={examID}/>
                                <PublishFormBtn/>
                            </div>
                        )}
                </div>
            </nav>
            <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[740px] bg-accent bg-[url(/paper.svg)]'>
                <Designer/>
            </div>
        </main>
        <DragOverlayWrapper/>
    </DndContext>
  )
}

export default FormBuilder