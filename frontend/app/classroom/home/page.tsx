'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

const page = () => {
  const router = useRouter()
  const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
  const [name,setname] = useState('')
  useEffect(() => {
    const fetchData = async () => {
    try {
        const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/`, {
          method: "GET",
          credentials: 'include',
        });
        const data = await resp.json();
        setname(data.name)
    } catch (error) {
        await router.push('../classroom/')
        console.error('Error fetching data:', error);
    }
    };

    fetchData();
}, []);
  return (
    <div>
      <h1>home</h1>
      <h1>{name}</h1>
    </div>
  )
}

export default page