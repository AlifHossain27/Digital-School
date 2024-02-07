import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useAppSelector } from '@/redux/store';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import {  UserPlus } from "lucide-react"
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    teacherID: z.string().min(4, {
      message: "Teacher ID must be at least 4 characters.",
    })
    
  })

const AddTeacher = () => {
    const router = useRouter()
    const { toast } = useToast()
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          teacherID: ""
        },
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const resp = await fetch('http://localhost:8000/api/classroom/add-teacher/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    "class_id": classroomID,
                    "teachers": values.teacherID
                }),
            });
    
            if (resp.ok) {
                queryClient.invalidateQueries({queryKey: ['teachers']});
                toast({
                    title: `${values.teacherID} Added`,
                    description: `Successfully added ${values.teacherID} to the Classroom`,
                });
                await form.reset();
            } else {
                toast({
                    variant: "destructive",
                    title: `Something went wrong`,
                    description: 'You might not be the owner of this Classroom or the Teacher might not exist'
                });
                await form.reset();
            }
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          await mutate(values);
        } catch (error) {
          console.error("Error in onSubmit:", error);
        }
      }


  return (
    <Dialog>
    <DialogTrigger asChild>
        <div>
            <UserPlus/>
        </div>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Add Teacher to Classroom</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
                <FormField
                control={form.control}
                name="teacherID"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input autoComplete='off' placeholder="Teacher ID" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogClose asChild>
                        <Button className='text-center w-full h-12 text-lg' type="submit" >Add Teacher</Button>
                </DialogClose>
            </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default AddTeacher