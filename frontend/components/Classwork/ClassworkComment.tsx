'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal, UsersRound } from 'lucide-react'
import { Button } from '../ui/button'
import { ImSpinner2 } from "react-icons/im";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { getPublicComments } from '@/actions/classwork'
import { Input } from '../ui/input'

interface Author {
    profile_uid: string;
    full_name: string;
    profile_picture: string;
}
type Comment = {
    id: number,
    user_type: string,
    text: string,
    created_at: string,
    classwork_id: number,
    student: Author,
    teacher: Author
}

const formSchema = z.object({
    comment: z.string()
    
})

const ClassworkComment = () => {

    const { toast } = useToast()
    const router = useRouter()
    const classworkID = useAppSelector((state)=> state.classworkReducer.value.classworkID)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: ""
        },
    });

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) =>
        fetch(`http://localhost:8000/api/classwork/${classworkID}/public-comment/`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
            "text": values.comment
        }),
        }),
        onSuccess: async (_, values) => {
        queryClient.invalidateQueries({queryKey: ['public-comments']})
        toast({
            title: "You Commented to the Classwork"
        });
        await form.reset();
        },
        onError: (error) => {
        toast({
            variant: "destructive",
            title: "Failed to Comment",
        });
        router.refresh();
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await mutate(values);
          } catch (error) {
            console.error("Error in onSubmit:", error);
          }

    };

    const {data: comments, isLoading} = useQuery({
        queryFn: () => getPublicComments(classworkID),
        queryKey: ['public-comments']
    })

    if (isLoading) {
        return (
        <div className='pt-20 flex justify-center'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
        </div>
        )
    }
    const commentCount = comments?.length
  return (
    <div className='container mx-5 py-5'>
        <div className='text-[14px] text-[#5F6368] flex gap-1'>
            <UsersRound />
            <h1 className='pt-1'>{commentCount}</h1>
            <h1 className='pt-1'>Class Comment</h1>
        </div>
            <div className='py-2'>
            { comments?.map((comment: Comment) => {
                const user_type = comment.user_type
                return (
                    <div key={comment.id} className='flex gap-4 py-2'>
                        { user_type === "student" ? 
                        <div className='flex gap-4'>
                            <Avatar>
                                <AvatarImage src={comment.student.profile_picture} alt="@profile" />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <div className='flex gap-4'>
                                    <h1 className='text-[15px]'>{comment.student.full_name}</h1>
                                    <h1 className='text-[12px] text-[#5F6368]'>{new Date(comment?.created_at).toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
                                </div>
                                <h1 className='text-[13px]'>{comment.text}</h1>
                            </div>
                            
                        </div> : 
                        <div>

                        </div>}
                    </div> 
                )
            })}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className='flex gap-2'>
                                <FormControl>
                                        <Input className='border rounded-full h-14 focus-visible:border-[#1967D2]' autoComplete='off' placeholder='Add Class Comment' {...field} />
                                </FormControl>
                                <Button type="submit" className=''>
                                    <SendHorizontal/>
                                </Button>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        
    </div>
  )
}

export default ClassworkComment