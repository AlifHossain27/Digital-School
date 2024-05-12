'use client'
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Plus, File, X } from 'lucide-react'
import { ImSpinner2 } from "react-icons/im";
import path from 'path'
import { getClassworkSubmissionDetails } from '@/actions/classwork'
import DeleteClassworkSubmission from './DeleteSubmission'

interface Submission {
    submission_id: string,
    classwork: number,
    turn_in: boolean,
    attachment: string,
    attachment_name: string,
    attachment_size: number
}

const formSchema = z.object({
    attachment: z.any()
    
})

const ClassworkSubmission = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)
    const router = useRouter()
    const { toast } = useToast()

    const [ fileUploaded, setFileUploaded ] = useState(false)
    const [ fileName, setFileName ] = useState('')
    const [ fileSize, setFileSize ] = useState(0)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            attachment: []
        },
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation<void, Error, z.infer<typeof formSchema>>(
        {mutationFn: async (values) => {
            const form_data = new FormData();
            form_data.append("classwork", classworkID);
            form_data.append("turn_in", "true");
            if (values.attachment.length > 0 ) {
                form_data.append("attachment", values.attachment[0]);
            }

            const resp = await fetch(`http://localhost:8000/api/classwork/${classworkID}/submission/create/`, {
                method: "POST",
                credentials: "include",
                body: form_data,
            });

            if (!resp.ok) {
                console.log(resp.json())
                throw new Error(`${resp.status} Failed to Submit Classwork`);
            }
        },
        onSuccess: async (_, values) => {
            queryClient.invalidateQueries({queryKey: ['classwork-submission']})
            toast({
                title: `Added Submission`,
            });
            await form.reset();
            await router.refresh();
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: `Failed to Create Classwork: ${error.message || "Unknown error"}`,
            });
        }
        });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await mutate(values)
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };

    const {data: submissions, isLoading} = useQuery({
        queryFn: () => getClassworkSubmissionDetails(classworkID,classroomID),
        queryKey: ['classwork-submission']
      })

  return (
    <div className='h-auto border rounded-lg shadow-lg px-5 py-5'>
        { isLoading && (
            <div className='flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>
        )}

        {submissions && submissions.length === 0 ? (
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-[22px]'>Your Work</h1>
                        <h1 className='py-2 text-yellow-500 text-[14px]'>Pending</h1>
                    </div>

                    { fileUploaded && (
                        <div className='flex border rounded-lg bg-secondary w-auto'>
                            <div className='border-r py-3 px-3'>
                                <File size={54} />
                            </div>
                            <div className='flex flex-col justify-center px-2 min-w-0'>
                                <h1 className='text-[16px] font-semibold truncate min-w-0'>{fileName}</h1>
                                <h1 className='text-[12px] text-[#5F6368] font-semibold truncate'>{(fileSize/1048576).toFixed(2)} MB</h1>
                            </div>
                            <div className='border-l pt-6 px-2 cursor-pointer hover:bg-red-600 rounded-r-lg' onClick={() => {
                                setFileUploaded(false);
                            }}>
                                <X />
                            </div>
                        </div>
                    )}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="attachment"
                                render={({ field }) => (
                                    <FormItem className='py-2'>
                                        <FormLabel>
                                            <div className='flex flex-row justify-center items-center w-full bg-secondary text-center h-10 rounded hover:border'>
                                                <Plus />
                                                Add File
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.files);
                                                    if (!e.target.files || e.target.files.length === 0) {
                                                        form.setValue('attachment', []);
                                                    } else {
                                                        const attachmentName = e.target.files[0]?.name;
                                                        const attachmentSize = e.target.files[0]?.size;
                                                        setFileName(attachmentName);
                                                        setFileSize(attachmentSize);
                                                        setFileUploaded(true);
                                                    }
                                                }}
                                                value={undefined}
                                                className="hidden"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className='py-3'>
                            <Button type="submit" className="w-full">Mark as done</Button>
                            </div>
                        </form>
                    </Form>
                        
                </div>
            ) : (
                submissions?.map((submission: Submission, i: number) => {
                    const { submission_id, attachment_name, attachment_size, turn_in } = submission;
                    const filename = attachment_name ? path.basename(attachment_name) : "NoFileName";
                    return (
                        <div key={i}>
                            <div className='flex justify-between'>
                                <h1 className='text-[22px]'>Your Work</h1>
                                { turn_in ? <h1 className='py-2 text-green-600 text-[14px]'> Turned in</h1> : <h1 className='py-1 text-yellow-500'>Due</h1>}
                            </div>
                            <div className='py-3'>
                            { turn_in && (
                                <div className='flex border rounded-lg bg-secondary w-auto'>
                                    <div className='border-r py-3 px-3'>
                                        <File size={54} />
                                    </div>
                                    <div className='flex flex-col justify-center px-2 min-w-0'>
                                        <h1 className='text-[16px] font-semibold truncate'>{filename}</h1>
                                        <h1 className='text-[12px] text-[#5F6368] font-semibold truncate'>{(attachment_size/1048576).toFixed(2)} MB</h1>
                                    </div>
                                </div>
                            )}
                            <div className='pt-3'>
                                <DeleteClassworkSubmission submissionID={submission_id}/>
                            </div>
                            </div>
                        </div>
                    );
                })
            )}

    </div>
  )
}

export default ClassworkSubmission