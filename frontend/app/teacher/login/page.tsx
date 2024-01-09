"use client"
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    username: z.string().min(4, {
      message: "Teacher ID must be at least 4 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  })

const page = () => {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await fetch("http://localhost:8000/api/teacher/login/",{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          'teacher_id': values.username,
          'password': values.password
      })
    })
    if (res.ok){
      await router.push('/')
      toast({
        title: `Welcome ${values.username}`,
        description: "Successfully logged in",
      })
      await router.refresh()
    }else{
      toast({
        variant: "destructive",
        title: `${res.status} Login failed`,
        description: "Incorrect username or password",
      })
      await router.refresh()
    }
    }

  return (
    <div className='flex h-full flex-col items-center p-12'>
    <div className='pt-12'>
        <Suspense fallback = {
          <div className='pt-10'>
            <svg 
            className='animate-spin h-24 w-24'
            fill="none" 
            height="20" 
            viewBox="0 0 20 20" 
            width="20" 
            xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" 
            fill="#212121"/></svg>
          </div>
        }
        />
        <Card className='rounded-lg border-4 border-secondary h-max w-80'>
                <CardHeader>
                    <CardTitle className='flex items-center justify-center gap-5 pt-12 text-3xl'>
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent className='pt-12'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input autoComplete='off' placeholder="Teacher ID" {...field} />
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
                        <div className='pt-2 pb-10'>
                        <Button className='text-center w-full h-12 text-lg' type="submit" >Login</Button>
                        </div>
                    </form>
                    </Form>
                </CardContent>
                <CardFooter></CardFooter>
        </Card>
    </div>
    </div>
  )
}

export default page