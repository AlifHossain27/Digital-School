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
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice'
import { ImSpinner2 } from "react-icons/im";


const formSchema = z.object({
    username: z.string().min(4, {
      message: "Student ID must be at least 4 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  })

const page = () => {
    const router = useRouter()
    const { toast } = useToast()
    const dispatcher = useDispatch<AppDispatch>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await fetch("http://localhost:8000/api/student/login/",{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          'student_id': values.username,
          'password': values.password
      })
    })
    const user_type = 'student'
    if (res.ok){
      dispatcher(logIn(user_type))
      await router.push('/')
      toast({
        title: `Welcome ${values.username}`,
        description: "Successfully logged in",
      })
      await router.refresh()
    }else{
      dispatcher(logOut())
      toast({
        variant: "destructive",
        title: `${res.status} Login failed`,
        description: "Incorrect username or password",
      })
      await router.refresh()
    }
    }

  return (
    <div className='flex h-full flex-col items-center '>
    <div className='pt-12 flex flex-auto'>
          <Suspense fallback = {
            <div className='pt-20'>
              <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>
          }>
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
                                <Input autoComplete='off' placeholder="Student ID" {...field} />
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
        </Suspense>
    </div>
    </div>
  )
}

export default page