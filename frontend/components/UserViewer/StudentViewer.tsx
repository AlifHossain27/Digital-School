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

type StudentDataProps = {
    profile_id: string
    full_name: string
    first_name: string
    last_name: string
    father_name: string
    father_phone: string
    mother_name: string
    mother_phone: string
    permanent_address: string
    present_address: string
    date_of_birth: string
}

const StudentViewer = ({profile_id, full_name, first_name, last_name, father_name, father_phone, mother_name, mother_phone, permanent_address, present_address, date_of_birth} : StudentDataProps) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant = "ghost">
                <TbViewportWide size="20" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="">Student Details: </DialogTitle>
            </DialogHeader>
            <div className='py-4 flex flex-col gap-5'>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Student ID:</h1>
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
                    <h1 className='w-full font-bold'>Father's Name:</h1>
                    <h1 className='w-full'>{father_name}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Father's Contact Info:</h1>
                    <h1 className='w-full'>{father_phone}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Mother's Name:</h1>
                    <h1 className='w-full'>{mother_name}</h1>
                </div>
                <div className='flex-row flex justify-between'>
                    <h1 className='w-full font-bold'>Mother's Contact Info:</h1>
                    <h1 className='w-full'>{mother_phone}</h1>
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

export default StudentViewer