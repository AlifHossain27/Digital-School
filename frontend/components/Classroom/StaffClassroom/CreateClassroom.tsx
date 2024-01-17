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


const formSchema = z.object({
  classroom: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  
})

const CreateClassroom = () => {
  const { toast } = useToast()
  const router = useRouter()
  const uid = useAppSelector((state) => state.uidReducer.value.userID)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classroom: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("http://localhost:8000/api/classroom/create/",{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
          "staff_profile_id": uid,
          "name": values.classroom
      })
    })
    if (res.ok){
      toast({
        title: `Classroom ${values.classroom} created`,
        description: `Successfully created ${values.classroom}`,
      })
      await form.reset();
      await router.push('/classroom')
    }
    else {
      toast({
        variant: "destructive",
        title: `${res.status} Failed to create new Classroom`,
      })
      await router.refresh()
    }
  }

  return (
    <div>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant= "outline" className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
                <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
                <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create New Classroom</p>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create A New Classroom</DialogTitle>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="classroom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input autoComplete='off' placeholder="Classroom Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button className='w-full' type="submit" >Create</Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateClassroom