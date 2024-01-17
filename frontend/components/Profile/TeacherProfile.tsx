"use client"
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { Button } from '@/components/ui/button';
import {  Pencil } from "lucide-react"
import Image from 'next/image';


const TeacherProfile = () => {
    const user_type = useAppSelector((state) => state.authReducer.value.userType);
    const uid = useAppSelector((state) => state.uidReducer.value.userID);
    const [ data, setData] = useState(
      {
        id: 0,
        teacher_profile_id: '',
        full_name: '',
        first_name: '',
        last_name: '',
        email: '',
        contact_info: '',
        permanent_address: '',
        present_address: '',
        date_of_birth: '',
        profile_picture: '',
      }
    );

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
    <div>
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
          <h1 className='text-lg pb-2'>Email:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.email}</h1>
        </div>
        <div className="flex flex-col">
          <h1 className='text-lg pb-2'>Phone:</h1>
          <h1 className='px-2 py-2 border h-12'>{data.contact_info}</h1>
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
      </div>
  )
}

export default TeacherProfile