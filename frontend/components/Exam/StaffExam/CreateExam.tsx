import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAppSelector } from '@/redux/store';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BsFileEarmarkPlus } from "react-icons/bs"
import {  useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  title: z.string().min(4,{
    message: "Tilte must be of 4 characters"
  }),
  description: z.string().min(4, {
    message: "Description must be of 4 characters"
  }),
  
})

const CreateExam = () => {
  const { toast } = useToast()
  const router = useRouter()
  const uid = useAppSelector((state) => state.uidReducer.value.userID)
  const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      fetch("http://localhost:8000/api/classroom/exam/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          teacher: uid,
          classroom: classroomID,
          name: values.title,
          description: values.description,
        }),
      }),
    onSuccess: async (_, values) => {
      {/*
      queryClient.invalidateQueries({queryKey: ['exams']})
      */}
      toast({
        title: `Exam ${values.title} created`,
        description: `Successfully created ${values.title}`,
      });
      await form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Failed to create new Exam: ${error.message || "Unknown error"}`,
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
    <div>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant= "outline" className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
                <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
                <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create New Exam</p>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create A New Exam</DialogTitle>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Input autoComplete='off' placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button className='w-full' type="submit">Create</Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateExam