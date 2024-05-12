'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/card-drop"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { useAppSelector } from '@/redux/store';
import { getClassworks } from "@/actions/classwork";
import { Button } from "../ui/button";
import EditClasswork from "./EditClasswork";
import DeleteClasswork from "./DeleteClasswork";
import Link from "next/link";
import { FaEllipsisV } from "react-icons/fa"
import { SetClasswork } from "@/redux/features/classwork-slice";
import { ImSpinner2 } from "react-icons/im";
import { TbClipboardText } from "react-icons/tb";

interface Classwork {
    classwork_id: string;
    title: string;
    description: string;
    due_date: string;
    teacher: string;
    classroom: string;
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
        <div className='flex flex-row justify-between text-lg border-b h-10'>
            <h1 className=''>Classworks</h1>
        </div>
        {isLoading && (<div className='pt-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>)}
        {classworks?.length === 0 && (
            <div className="flex w-full items-center justify-center">
                <h1 className="pt-5">No Classwork</h1>
            </div>
        )}
        <div className="flex flex-col gap-4 pt-4">
        {classworks?.map((classwork: Classwork,i: number) => {
            return (
            <Accordion type="single" collapsible className="" key={classwork.classwork_id}>
                <AccordionItem value={`item-${i}`}>
                <AccordionTrigger className="text-[18px] data-[state=open]:border-b px-4">
                    <div className="flex gap-2">
                        <div className='bg-[#1967D2] h-12 w-12 rounded-full pt-3 pl-3'>
                            <TbClipboardText size={24} color='#FFFFFF' />
                        </div>
                        <h1 className="pt-3">{classwork.title}</h1>
                    </div>
                    { userType==="teacher" && (
                        <div className="relative rounded-full hover:bg-accent h-12 w-12">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="pt-4" onClick={(e) => e.stopPropagation()}>
                                    <FaEllipsisV />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-none rounded-none min-w-[10rem]">
                                    <div className="flex flex-col">
                                    <EditClasswork 
                                            classworkID={classwork.classwork_id} 
                                            classworkTitle={classwork.title} 
                                            classworkDescription={classwork.description}
                                            classworkDueDate={classwork.due_date}
                                        />
                                    <DeleteClasswork 
                                            classworkID={classwork.classwork_id} 
                                            classworkTitle={classwork.title}
                                        />
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </AccordionTrigger>
                <AccordionContent className="text-[16px]">
                    <div className="flex flex-col gap-2 px-4 py-4 min-h-32">
                        <h1 className="text-[12px] text-[#5F6368]">Due Date: {new Date(classwork.due_date).toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
                        <h1 className="text-[14px]">{classwork.description}</h1>
                    </div>
                    {userType==="teacher" ? (
                    <div className="flex flex-row gap-6 px-4 border-t pt-4">
                        <Link href='/classroom/classwork/submission/' onClick={() => dispatcher(SetClasswork(classwork.classwork_id))}>
                            <Button className="rounded-sm" variant='ghost'>View Submissions</Button>
                        </Link>
                    </div>
                    ):(<div className="flex flex-row gap-6 px-4 border-t pt-4">
                        <Link href='/classroom/classwork/view/' onClick={() => dispatcher(SetClasswork(classwork.classwork_id))}>
                            <Button className="rounded-sm" variant='ghost'>View Classwork</Button>
                        </Link>
                    </div>)}
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            )
        })}
        </div>
    </div>
    
  )
}

export default ClassworkList