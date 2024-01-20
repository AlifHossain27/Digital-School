import { cn } from "@/lib/utils"
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
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useAppSelector } from '@/redux/store';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"


const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    due_date: z.any()
})

type ClassworkData = {
    classworkID: number,
    classworkTitle: string,
    classworkDescription: string,
    classworkDueDate: any
}

const EditClasswork = ({classworkID, classworkTitle, classworkDescription, classworkDueDate}: ClassworkData) => {
    const { toast } = useToast()
    const router = useRouter()
    const uid = useAppSelector((state) => state.uidReducer.value.userID)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: classworkTitle,
            description: classworkDescription,
            due_date: classworkDueDate
        },
    });

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) =>
        fetch(`http://localhost:8000/api/assignment/${classworkID}/`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
            "teacher_profile_id": uid,
            "title": values.title,
            "description": values.description,
            "due_date": values.due_date
            ? format(new Date(values.due_date), "yyyy-MM-dd")
            : null
        }),
        }),
        onSuccess: async (_, values) => {
        queryClient.invalidateQueries({queryKey: ['classworks']})
        toast({
            title: `${values.title} Updated`,
            description: `Successfully updated ${values.title}`,
        });
        await form.reset();
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
    <Dialog>
    <DialogTrigger asChild>
        <Button className="rounded-full">Update Classwork</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Create A New Classwork</DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-lg pb-2'>Title:</FormLabel>
                    <FormControl>
                        <Input autoComplete='off' placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-lg pb-2'>Description:</FormLabel>
                    <FormControl>
                        <Input autoComplete='off' placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Due Date:</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal rounded-none h-12",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <DialogClose asChild>
                        <Button className='text-center w-full h-12 text-lg' type="submit" >Update</Button>
                </DialogClose>
            </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default EditClasswork