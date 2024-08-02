'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from '@/components/ui/use-toast'
import { useAppSelector } from '@/redux/store';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { SendHorizontal } from 'lucide-react'
import { createPost } from '@/actions/classroom_post'

const formSchema = z.object({
    post: z.string()
})

const AddPosts = () => {
    const { toast } = useToast()
    const router = useRouter()
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            post: ""
        },
    });

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => createPost(classroomID, values.post, "general"),
        onSuccess: async (_, values) => {
        queryClient.invalidateQueries({queryKey: ['posts']})
        toast({
            title: `New post uploaded`
        });
        await form.reset();
        },
        onError: (error) => {
        toast({
            variant: "destructive",
            title: `Failed to Upload the post: ${error.message || "Unknown error"}`,
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
    <div className='w-full container py-4'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name="post"
                render={({ field }) => (
                    <FormItem className="flex justify-between gap-5">
                    <FormControl>
                        <Input autoComplete='off' className='h-14 w-full border rounded-md' placeholder="Announcement" {...field} />
                    </FormControl>
                    <Button className='h-12' type='submit'>
                        <SendHorizontal />
                    </Button>
                    </FormItem>
                )}
                />
            </form>
        </Form>
    </div>
  )
}

export default AddPosts