"use client"
import React, { useEffect, useState} from 'react'
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { SetClassroom } from '@/redux/features/classroom-slice';


interface Teacher {
    teacher_profile_id: string;
    full_name: string;
    email: string;
    contact_info: string;
  }
  
  interface Student {
    student_profile_id: string;
    full_name: string;
    father_name: string;
    mother_name: string;
  }
  
  interface Classroom {
    staff_profile_id: string;
    class_id: string;
    name: string;
    teachers: Teacher[];
    students: Student[];
  }


const ClassroomList = () => {
    const dispatcher = useDispatch<AppDispatch>()
    const user_type = useAppSelector((state) => state.authReducer.value.userType)
    const uid = useAppSelector((state) => state.uidReducer.value.userID)
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const resp = await fetch(`http://localhost:8000/api/classroom/${user_type}/${uid}/`, {
              method: "GET",
              credentials: 'include',
            });
            const data = await resp.json();
            setClassrooms(data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
  return (
    <div>
        <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-6 pb-8'>
            {classrooms.map((classroom, i) => (
              <Link href={`classroom/${classroom.class_id}/home`}>
                <Card className='h-32' key={i} onClick={() => dispatcher(SetClassroom(classroom.class_id))}>
                  <CardHeader>
                  <CardTitle>{classroom.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
        </div>
    </div>
  )
}

export default ClassroomList