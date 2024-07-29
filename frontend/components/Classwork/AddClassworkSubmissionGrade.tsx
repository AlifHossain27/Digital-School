"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"

type Grade = {
    submission_id: string
    obtained_points: number
}

const formSchema = z.object({
    points: z.coerce.number()
    
})


const AddClassworkSubmissionGrade = ( { submission_id, obtained_points }: Grade) => {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            points: obtained_points
        },
    });

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) =>
        fetch(`http://localhost:8000/api/classwork/submission/${submission_id}/`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
            "obtained_points": Number(values.points)
        }),
        }),
        onSuccess: async (_, values) => {
        queryClient.invalidateQueries({queryKey: ['submission']})
        toast({
            title: "Point Updated",
            description: `Successfully updated point`,
        });
        router.back();
        },
        onError: (error) => {
        toast({
            variant: "destructive",
            title: `Failed to Update Classwork: ${error.message || "Unknown error"}`,
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
    <div className='flex flex-col py-4'>
        <div className='h-auto border rounded-lg shadow-lg px-5 py-5'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-md'>Obtained Points:</FormLabel>
                    <FormControl>
                        <Input type='number' className='border-t border-l border-r rounded-md h-10' {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button className='text-center w-full h-10 text-md' type="submit" >Update</Button>
                
            </form>
        </Form>
        </div>
    </div>
  )
}

export default AddClassworkSubmissionGrade