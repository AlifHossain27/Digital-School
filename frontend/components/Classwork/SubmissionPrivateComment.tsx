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
import { getPrivateComments } from '@/actions/classwork'
import { ImSpinner2 } from "react-icons/im";
import { SendHorizontal } from 'lucide-react'
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
    user_type: string,
    text: string,
    created_at: string,
    classwork_id: number,
    student: Author,
    teacher: Author
}

const formSchema = z.object({
    reply: z.string()
    
  })

const SubmissionPrivateComment = () => {
    const classworkID = useAppSelector((state)=> state.classworkReducer.value.classworkID)
    const [ reply, setReply ] = useState(false)
    const [ replyId, setReplyId ] = useState(0)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reply: ""
          },
      });

    const {data: comments, isLoading} = useQuery({
        queryFn: () => getPrivateComments(classworkID),
        queryKey: ['private-comments']
      })
    
    if (isLoading) {
        return (
        <div className='pt-20 flex justify-center'>
            <ImSpinner2 className= "animate-spin" size= "50"/>
        </div>
        )
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        console.log(replyId)
    };
  return (
    <div className='flex flex-col justify-between border rounded-md h-full'>
        <div className='flex flex-col px-2 py-2'>
            { comments?.map((comment: Comment) => {
                const user_type = comment.user_type
                return (
                    <div key={comment.id} className='flex gap-4 px-2 py-2'>
                        { user_type === "student" ? 
                        <div className='flex flex-row w-full justify-between'>
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
                                setReplyId(comment.id)
                            }} />
                            
                        </div> : 
                        <div>

                        </div>}
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
  )
}

export default SubmissionPrivateComment