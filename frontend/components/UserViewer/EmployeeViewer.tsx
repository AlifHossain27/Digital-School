import React from 'react'
import { Button } from "@/components/ui/button"
import { TbViewportWide } from "react-icons/tb";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


type EmployeeDataProps = {
    profile_id: string
    full_name: string
    first_name: string
    last_name: string
    email: string
    contact_info: string
    permanent_address: string
    present_address: string
    date_of_birth: string
}

const EmployeeViewer = ({profile_id, full_name, first_name, last_name, email, contact_info, permanent_address, present_address, date_of_birth} : EmployeeDataProps) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant = "ghost">
                <TbViewportWide size="20" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="">Employee Details: </DialogTitle>
            </DialogHeader>
            <div className='py-4 flex flex-col gap-5'>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Employee ID:</h1>
                    <h1 className='w-full'>{profile_id}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Full Name:</h1>
                    <h1 className='w-full'>{full_name}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>First Name:</h1>
                    <h1 className='w-full'>{first_name}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Last Name:</h1>
                    <h1 className='w-full'>{last_name}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Email:</h1>
                    <h1 className='w-full'>{email}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Contact Info:</h1>
                    <h1 className='w-full'>{contact_info}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Permanent Address:</h1>
                    <h1 className='w-full'>{permanent_address}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Present Address</h1>
                    <h1 className='w-full'>{present_address}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Date of Birth:</h1>
                    <h1 className='w-full'>{date_of_birth}</h1>
                </div>
            </div>
        
        </DialogContent>
    </Dialog>
  )
}

export default EmployeeViewer