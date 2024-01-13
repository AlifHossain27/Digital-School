"use client"
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {  Pencil } from "lucide-react"



const StudentProfile = () => {
    const user_type = useAppSelector((state) => state.authReducer.value.userType);
    const uid = useAppSelector((state) => state.uidReducer.value.userID);
    const [ data, setData] = useState(
      {
        id: 0,
        student_profile_id: '',
        full_name: '',
        first_name: '',
        last_name: '',
        father_name: '',
        father_phone: '',
        mother_name: '',
        mother_phone: '',
        permanent_address: '',
        present_address: '',
        date_of_birth: '',
        profile_picture: '',
          }
    )

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


  return (
    <main className="flex h-full flex-col p-12">
      <div className="w-full sm:flex">
        <Image 
        src={data.profile_picture} 
        alt={data.full_name} 
        width={100} 
        height={100}/>
      </div>
      <div className='flex flex-row justify-between pt-6 gap-4'>
          <h1 className='pl-4 text-2xl'>{data.full_name}</h1>
          <Button variant='ghost'>
            <Pencil/>
          </Button>
      </div>

      <div className='pt-6 text-xl font-semi-bold'>
        <h1>Profile Information: </h1>
      </div>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-6'>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>First Name:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.first_name}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Last Name:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.last_name}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Father's Name:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.father_name}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Father's Phone:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.father_phone}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Mother's Name:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.mother_name}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Mother's Phone:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.mother_phone}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Permanent Address:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.permanent_address}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Present Address:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.present_address}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Date of Birth:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.date_of_birth}</h1>
        </div>
      </div>
      
    </main>
  )
}

export default StudentProfile