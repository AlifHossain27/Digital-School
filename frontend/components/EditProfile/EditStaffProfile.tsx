"use client"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useAppSelector } from '@/redux/store';
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"



const formSchema = z.object({
    full_name: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    contact_info: z.string(),
    permanent_address: z.string(),
    present_address: z.string(),
    date_of_birth: z.any(),
})

const EditStaffProfile = () => {
    const { toast } = useToast()
    const user_type = useAppSelector((state) => state.authReducer.value.userType);
    const uid = useAppSelector((state) => state.uidReducer.value.userID);
    const [data, setData] = useState({
        id: 0,
        staff_profile_id: '',
        full_name: '',
        first_name: '',
        last_name: '',
        email: '',
        contact_info: '',
        permanent_address: '',
        present_address: '',
        date_of_birth: undefined,
        profile_picture: undefined
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: data.full_name,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            contact_info: data.contact_info,
            permanent_address: data.permanent_address,
            present_address: data.present_address,
            date_of_birth: data.date_of_birth,
        },
    });

    useEffect(() => {
        form.reset({
            full_name: data.full_name,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            contact_info: data.contact_info,
            permanent_address: data.permanent_address,
            present_address: data.present_address,
            date_of_birth: data.date_of_birth,
        });
    }, [data, form.reset]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/${user_type}/${uid}/`, {
                    credentials: 'include',
                });

                if (res.ok) {
                    const user_data = await res.json();
                    setData(user_data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user_type, uid]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formattedDateOfBirth = values.date_of_birth
        ? format(new Date(values.date_of_birth), "yyyy-MM-dd")
        : null;
        
        const res = await fetch(`http://localhost:8000/api/${user_type}/${uid}/`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                'full_name': values.full_name,
                'first_name': values.first_name,
                'last_name': values.last_name,
                'email': values.email,
                'contact_info': values.contact_info,
                'permanent_address': values.permanent_address,
                'present_address': values.present_address,
                'date_of_birth': formattedDateOfBirth,
            })
        })
        if (res.ok){
            toast({
                title: "Profile updated",
                description: "Successfully Updated Your Profile",
              })
        } else {
            toast({
                variant: "destructive",
                title: `${res.status} oops`,
                description: "Something went wrong. Please Try again",
              })
        }
        console.log(formattedDateOfBirth)
    }
  return (
    <div>
      <div className="w-full sm:flex">
        <Image 
        src={data.profile_picture || '/Default.png'}
        alt={data.full_name} 
        width={100} 
        height={100}/>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-6">
                <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Full Name:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='Full Name' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>First Name:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='First Name' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Last Name:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='Last Name' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Email:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='Email' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="contact_info"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Contact Info:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='Phone' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="permanent_address"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Permanent Address:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='Address' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="present_address"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Present Address:</FormLabel>
                        <FormControl>
                            <Input autoComplete='off' className='px-2 py-2 border h-12' placeholder='Address' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel className='text-lg pb-2'>Date of Birth:</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal rounded-none h-12",
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
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
                />
                </div>
                <div className='pt-6 flex flex-row justify-end'>
                    <Button type="submit" className='h-12'>Save Changes</Button>
                </div>
        </form>
      </Form>
    </div>
  )
}

export default EditStaffProfile