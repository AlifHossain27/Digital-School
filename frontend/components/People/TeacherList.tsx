'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/store';

interface Teacher {
    teacher_profile_id: string;
    full_name: string;
    email: string;
    contact_info: string;
}

const TeacherList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/teachers`, {
              method: "GET",
              credentials: 'include',
            });
            const data = await resp.json();
            setTeachers(data)
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
    }, []);
  return (
    <div>
        {teachers.map(teacher => (
            <div className='py-4 text-xl pl-4'>
                <h1 key={teacher.teacher_profile_id}>{teacher.full_name}</h1>
            </div>
    ))}
    </div>
  )
}

export default TeacherList