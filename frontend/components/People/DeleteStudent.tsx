import React from 'react'
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '../ui/button'
import { RiDeleteBin5Line } from "react-icons/ri"

type StudentData = {
    class_id: string
    profile_uid: string
}

const DeleteStudent = ( {class_id, profile_uid}: StudentData ) => {
    const router = useRouter()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async () => {
            const resp = await fetch('http://localhost:8000/api/classroom/remove-student/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    "class_id": class_id,
                    "students": profile_uid
                }),
            });
            if (resp.ok) {
                queryClient.invalidateQueries({queryKey: ['students']});
                toast({
                    title: `${profile_uid} Removed`,
                    description: `Successfully removed ${profile_uid} from the Classroom`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: `Something went wrong`,
                    description: 'You might not be the owner of this Classroom or the Student might not exist'
                });
            }
    
        }
    });

    async function deleteStudent(){
        try {
            await mutate();
          } catch (error) {
            console.error("Error in onSubmit:", error);
          }
    }
  return (
    <div>
        <Button variant="destructive" onClick={deleteStudent}>
            <RiDeleteBin5Line size={20}/>
        </Button>
    </div>
  )
}

export default DeleteStudent