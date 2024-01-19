'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { RiDeleteBin5Line } from "react-icons/ri"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import {  useMutation, useQueryClient } from '@tanstack/react-query';

type DeleteData = {
    classroomName: string,
    classroomID: string
}

const DeleteClassroom = ({ classroomName,classroomID }: DeleteData) => {
    const router = useRouter()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
      mutationFn: async () => fetch(`http://localhost:8000/api/classroom/${classroomID}/delete/`,{
        method: "DELETE",
        credentials: "include"
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['classrooms']})
        toast({
          title: "Classroom deleted",
          description: `Successfully Deleted ${classroomName}`,
        })
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: `${error.message || "Unknown error"} oops`,
          description: "Something went wrong. Please Try again",
        })
      }
    })

    async function deleteClassroom(){
      try {
        await mutate();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    }
  return (
    <div>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="destructive">
                <RiDeleteBin5Line size={24}/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to Delete this Classroom?</DialogTitle>
            </DialogHeader>
            <DialogDescription className='text-xl'>Classroom: {classroomName}</DialogDescription>
            <DialogClose asChild>
            <Button variant="destructive" className='w-full' type="submit" onClick={deleteClassroom}>Delete</Button>
        </DialogClose>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default DeleteClassroom