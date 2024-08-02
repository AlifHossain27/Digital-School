"use client"
import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/store';
import AddPosts from '@/components/Posts/AddPosts';
import PostList from '@/components/Posts/PostList';

const HomePage = () => {
  const user_type = useAppSelector((state) => state.authReducer.value.userType)
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
      {user_type === "teacher" && (
        <AddPosts/>
      )}
      <PostList/>   
    </div>
  )
}

export default HomePage