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
import { Textarea } from '../ui/textarea'
import { SendHorizontal } from 'lucide-react'
import { Button } from '../ui/button'

const formSchema = z.object({
    comment: z.string()
    
})

const ClassworkComment = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    };

  return (
    <div className='container mx-5 py-5'>
        <h1 className='text-[14px] text-[#5F6368]'>Class Comment</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className='flex gap-2 py-2'>
                                <FormControl>
                                    <Textarea placeholder='Add class comment' {...field}/>
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
  )
}

export default ClassworkComment