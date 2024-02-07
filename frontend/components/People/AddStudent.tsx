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
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import {  UserPlus } from "lucide-react"
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    studentID: z.string().min(4, {
      message: "Teacher ID must be at least 4 characters.",
    })
    
  })

const AddStudent = () => {
    const router = useRouter()
    const { toast } = useToast()
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          studentID: ""
        },
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) =>
        fetch('http://localhost:8000/api/classroom/add-student/',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                "class_id": classroomID,
                "students": values.studentID
        }),
        }),
        onSuccess: async (_, values) => {
        queryClient.invalidateQueries({queryKey: ['students']})
        toast({
            title: `${values.studentID} Added`,
            description: `Successfully added ${values.studentID} to the Classroom`,
        });
        await form.reset();
        },
        onError: (error) => {
        toast({
            variant: "destructive",
            title: `You are not the owner of this Classroom`,
        });
        router.refresh();
        },
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
        <DialogTitle>Add Student to Classroom</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
                <FormField
                control={form.control}
                name="studentID"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input autoComplete='off' placeholder="Student ID" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogClose asChild>
                        <Button className='text-center w-full h-12 text-lg' type="submit" >Add Student</Button>
                </DialogClose>
            </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default AddStudent