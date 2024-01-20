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
    async function onSubmit(values: z.infer<typeof formSchema>) {
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
            body: form_data
        });
        if (resp.ok){
            toast({
                title: `Submitted Classwork`,
                description: `Successfully Submitted Classwork to the Classroom`,
            });
            await form.reset()
        } else {
            toast({
                variant: "destructive",
                title: `${resp.status} Failed to Submit Classwork`,
            });
        }
        
    }
  return (
    <div className='flex flex-col gap-2'>
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