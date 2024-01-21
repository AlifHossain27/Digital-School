'use client'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"

type SubmissionData = {
    classworkID: number,
    uid: string
}

const formSchema = z.object({
    text: z.string(),
    attachment: z.any()
    
})
const AddSubmission = ({classworkID, uid}:SubmissionData) => {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
            attachment: []
        },
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation<void, Error, z.infer<typeof formSchema>>(
        {mutationFn: async (values) => {
            const form_data = new FormData();
            form_data.append("assignment_id", String(classworkID));
            form_data.append("student_profile_id", uid);
            form_data.append("submission_text", values.text);
            if (values.attachment.length > 0 && values.attachment[0] instanceof File) {
                form_data.append("attachment", values.attachment[0]);
            }

            const resp = await fetch("http://localhost:8000/api/assignment/submission/", {
                method: "POST",
                credentials: "include",
                body: form_data,
            });

            if (!resp.ok) {
                throw new Error(`${resp.status} Failed to Submit Classwork`);
            }
        },
        onSuccess: async (_, values) => {
            queryClient.invalidateQueries({queryKey: ['submissions']})
            toast({
                title: `Added Submission`,
            });
            await form.reset();
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
  return (
    <div className='flex flex-col gap-2 px-8'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
                <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-lg pb-2'>Submission:</FormLabel>
                    <FormControl>
                        <Input autoComplete='off' placeholder="" {...field} className="border-b-0 border"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="attachment"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                    <Input
                        type="file"
                        accept=".pdf"
                        {...field}
                        onChange={(e) => field.onChange(e.target.files)}
                        value={undefined}
                        className="border-b-0"
                    />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </div>
  )
}

export default AddSubmission