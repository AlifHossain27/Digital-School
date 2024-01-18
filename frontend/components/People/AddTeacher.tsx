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

    async function onSubmit(values: z.infer<typeof formSchema>){
        const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/teacher/`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
            "teacher_profile_id": values.teacherID
        })
    })
    if (resp.ok){
        await router.refresh()
        await form.reset();
        toast({
            title: `Successfully Added Teacher`,
        })
        } else {
            toast({
                variant: "destructive",
                title: `${resp.status} Failed to add Teacher`,
                description: "Something went wrong. Please try again",
            })
            await router.refresh()
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
                        <Button className='text-center w-full h-12 text-lg' type="submit" >Create</Button>
                </DialogClose>
            </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default AddTeacher