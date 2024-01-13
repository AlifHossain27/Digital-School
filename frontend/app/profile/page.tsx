"use client"
import React from 'react'
import { useAppSelector } from '@/redux/store';


const Profile = () => {
  const user_type = useAppSelector((state) => state.authReducer.value.userType)
  const uid = useAppSelector((state) => state.uidReducer.value.userID)
    
  return (
    <div className='h-full flex justify-center pt-20'>
        <h1>{user_type}</h1>
        <h1>{uid}</h1>
    </div>
  )
}

export default Profile