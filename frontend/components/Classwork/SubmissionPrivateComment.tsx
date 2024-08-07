'use client'
import React, { useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { getPrivateComments } from '@/actions/classwork'
import { ImSpinner2 } from "react-icons/im";
import { SendHorizontal, CornerDownRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Reply } from 'lucide-react';
import { Input } from '../ui/input';

interface Author {
    profile_uid: string;
    full_name: string;
    profile_picture: string;
}
type Comment = {
    id: number,
    text: string,
    reply: string,
    created_at: string,
    classwork_id: number,
    student: Author,
    teacher: Author
}

const formSchema = z.object({
    reply: z.string()
    
  })

const SubmissionPrivateComment = () => {
    const router = useRouter()
    const classworkID = useAppSelector((state)=> state.classworkReducer.value.classworkID)
    const uid = useAppSelector((state)=> state.uidReducer.value.userID)
    const searchParams = useSearchParams()
    const studentID = searchParams.get('studentID')
    const [ reply, setReply ] = useState(false)
    const [ commentID, setCommentID ] = useState(0)
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reply: ""
          },
      });

    
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) =>
        fetch(`http://localhost:8000/api/classwork/private-comment/${commentID}/`,{
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                "teacher": uid,
                "reply": values.reply,
        }),
        }),
        onSuccess: async (_, values) => {
            queryClient.invalidateQueries({queryKey: ['private-comments']})
            await form.reset();
        },
        onError: (error) => {
            router.refresh();
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await mutate(values);
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }

    };

    const {data: comments, isLoading} = useQuery({
        queryFn: () => getPrivateComments(classworkID, studentID!),
        queryKey: ['private-comments']
      })
    
    if (isLoading) {
        return (
        <div className='pt-20 flex justify-center'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
        </div>
        )
    }
  return (
    <div>
        {comments.length === 0 ? (
        <div className='px-2 py-2'>
            No private comment
        </div>) : (
    <div className='flex flex-col justify-between border rounded-md h-full'>
        <div className='flex flex-col px-2 py-2'>
            <div className='px-2 py-4 border-b'>Private comments:</div>
                {comments?.map((comment: Comment) => {
                    return (
                        <div key={comment.id} className='flex gap-4 px-2 py-2'>
                            
                            <div className='flex flex-col w-full'>
                                <div className='flex justify-between'>
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
                                    </div>
                                    <Reply onClick={() => {
                                        setReply(true)
                                        setCommentID(comment.id)
                                    }} className='hover:cursor-pointer' />
                                </div>
                                { comment?.teacher && (
                                    <div className='flex gap-4 px-4 py-4'>
                                    <CornerDownRight size='32' />
                                    <Avatar>
                                        <AvatarImage src={comment.student.profile_picture} alt="@profile" />
                                        <AvatarFallback>Profile</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <h1 className='text-[15px]'>{comment?.teacher.full_name || "No Reply"}</h1>
                                        <h1 className='text-[13px]'>{comment?.reply}</h1>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div> 
                    )
                })}
        </div>
        { reply && (
            <div className='px-4 py-4'>
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="reply"
                    render={({ field }) => (
                        <FormItem className='flex gap-2'>
                            <FormControl>
                                <Input className='border rounded-md h-12 focus-visible:border-[#1967D2]' autoComplete='off' placeholder='Reply ...' {...field} />
                            </FormControl>
                            <Button type="submit">
                                <SendHorizontal/>
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
            </div>
        )}
    </div>
    )}
    </div>
  )
}

export default SubmissionPrivateComment