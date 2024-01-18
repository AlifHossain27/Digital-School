'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/store';

interface Student {
    student_profile_id: string;
    full_name: string;
    father_name: string;
    mother_name: string;
}

const StudentList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const resp = await fetch(`http://localhost:8000/api/classroom/${classroomID}/students`, {
              method: "GET",
              credentials: 'include',
            });
            const data = await resp.json();
            setStudents(data)
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
    }, []);
  return (
    <div>
        {students.map(student => (
            <div className='py-4 text-xl pl-4'>
                <h1 key={student.student_profile_id}>{student.full_name}</h1>
            </div>
    ))}
    </div>
  )
}

export default StudentList