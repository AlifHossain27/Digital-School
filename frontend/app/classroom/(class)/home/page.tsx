'use client'
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import AddPosts from '@/components/Posts/AddPosts';
import PostList from '@/components/Posts/PostList';

const page = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const router = useRouter()
  return (
    <div className='flex flex-col'>
      <div className='px-5 py-5 container'>
        <Image 
          src="/backtoschool.png" 
          width={500}
          height={500}
          alt="Picture of the author" className='w-full h-60 rounded-md'>
        </Image>
      </div>
      <AddPosts/>
      <PostList/>
    </div>
  )
}

export default page