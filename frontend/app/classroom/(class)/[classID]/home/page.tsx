'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const page = ({params,}:{
    params: {classID: 'string'}
}) => {
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
    try {
        const resp = await fetch(`http://localhost:8000/api/classroom/${params.classID}/`, {
          method: "GET",
          credentials: 'include',
        });
        const data = await resp.json();
    } catch (error) {
        await router.push('../classroom/')
        console.error('Error fetching data:', error);
    }
    };

    fetchData();
}, []);
  return (
    <div className='flex flex-col pt-6'>
      <Image 
        src="/backtoschool.png" 
        width={500}
        height={500}
        alt="Picture of the author" className='w-full h-60 rounded-md'>
      </Image>
      <h1>{params.classID}</h1>
    </div>
  )
}

export default page