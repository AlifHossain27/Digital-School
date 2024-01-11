import React from 'react'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import {  UserPlus } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
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
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const formSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  })


const AddStaff = () => {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        const resp = await fetch("http://localhost:8000/api/teacher/signup/",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
            'username': values.username,
            'password': values.password
        })
    })
    if (resp.ok){
        await router.refresh()
        await form.reset();
        toast({
            title: `Successfully Created New Teacher`,
        })
        } else {
            toast({
                variant: "destructive",
                title: `${resp.status} Teacher Creation Failed`,
                description: "Something went wrong. Please try again",
            })
            await router.refresh()
        }
    }

  return (
    <div>
    <Dialog>
        <DialogTrigger asChild>
            <Button variant='ghost' size='sm'><UserPlus size={20}/></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="text-3xl">Create New Teacher:</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input autoComplete='off' placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input type='password' placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogClose asChild>
                        <Button className='text-center w-full h-12 text-lg' type="submit" >Create</Button>
                    </DialogClose>
                </form>
            </Form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddStaff