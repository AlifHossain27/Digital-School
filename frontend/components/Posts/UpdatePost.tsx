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
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from '@/components/ui/use-toast'
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { updatePost } from '@/actions/classroom_post'

const formSchema = z.object({
    post: z.string()
})

interface postData {
    postID: number,
    classroom: string,
    post: string,
    post_type: string
}

const UpdatePost = ({postID, classroom, post, post_type}: postData) => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            post: post
        },
    });

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => updatePost(postID, classroom, values.post, post_type),
        onSuccess: async (_, values) => {
        queryClient.invalidateQueries({queryKey: ['posts']})
        toast({
            title: `Post Updated`
        });
        await form.reset();
        },
        onError: (error) => {
        toast({
            variant: "destructive",
            title: `Failed to Upload the post: ${error.message || "Unknown error"}`,
        });
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
        <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="w-[10rem] text-center rounded-none">Update</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Post</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                        <FormItem className="flex flex-col justify-between gap-5">
                        <FormControl>
                            <Input autoComplete='off' className='h-14 w-full border rounded-md' placeholder="Announcement" {...field} />
                        </FormControl>
                        <DialogClose asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="destructive" className='w-full' type="submit">Update</Button>
                        </DialogClose>
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
            
        </DialogContent>
    </Dialog>
  )
}

export default UpdatePost