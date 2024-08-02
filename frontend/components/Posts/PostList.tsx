import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import { getPost } from '@/actions/classroom_post';
import { ImSpinner2 } from "react-icons/im";
import { FaEllipsisV } from "react-icons/fa"
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';

interface Author {
    profile_uid: string;
    full_name: string;
    profile_picture: string;
  }

interface Post {
    id: number;
    classroom: string;
    author: Author;
    post: string;
    created_at: string;
    post_type: string;
}

const PostList = () => {
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const user_type = useAppSelector((state) => state.authReducer.value.userType)
    const {data: posts, isLoading} = useQuery({
        queryFn: () => getPost(classroomID),
        queryKey: ['posts']
      })
  return (
    <div className='flex flex-col gap-2 container py-4 pb-10'>

        {isLoading && (<div className='py-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>)}

        {posts?.length === 0 && (
            <div className="flex w-full items-center justify-center">
                <h1 className="py-4 px-4">No Posts</h1>
            </div>
        )}

        {posts?.map((post:Post) => {
            return (
                <div>
                {post?.post_type === "general" && (
                    <div key={post?.id} className='w-full border rounded-md shadow-sm py-4 px-4'>
                        <div className='flex gap-8'>
                            <Avatar className='h-12 w-12'>
                                <AvatarImage src={post?.author?.profile_picture} alt="@profile" />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                            <div className='w-full flex justify-between'>
                                <div className='flex flex-col'>
                                    <h1 className='text-xl'>{post?.author?.full_name}</h1>
                                    <h1 className='text-sm text-[#5F6368]'>{new Date(post?.created_at).toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
                                </div>
                                {user_type === "teacher" && (
                                    <div className="relative rounded-full hover:bg-accent h-12 w-12">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="pt-4 px-4" onClick={(e) => e.stopPropagation()}>
                                                <FaEllipsisV />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="border-none rounded-none min-w-[10rem]">
                                                <div className="flex flex-col">
                                                    <UpdatePost postID={post?.id} classroom={classroomID} post={post?.post} post_type={post?.post_type}/>
                                                    <DeletePost postID={post?.id}/>
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                        <h1 className='py-6 px-6 pl-10'>{post?.post}</h1>
                    </div>
                )}
                {post?.post_type === "exam" && (
                    <div key={post?.id} className='w-full border rounded-md shadow-sm py-4 px-4'>
                        <div className='flex gap-8'>
                            <Avatar className='h-12 w-12'>
                                <AvatarImage src={post?.author?.profile_picture} alt="@profile" />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <h1 className='text-xl'>{post?.author?.full_name}</h1>
                                <h1 className='text-sm text-[#5F6368]'>{new Date(post?.created_at).toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
                            </div>
                        </div>
                        <h1 className='py-6 px-6 pl-10'>{post?.post}</h1>
                        <Link href="/classroom/exam" className="py-4 w-full">
                            <div className='flex gap-4 w-full h-14 border rounded-md shadow-md text-center justify-center items-center px-4 py-4'>
                                <h1>Go to Exams</h1>
                                <ArrowRight />
                            </div>
                        </Link>
                    </div>
                )}
                {post?.post_type === "classwork" && (
                    <div key={post?.id} className='w-full border rounded-md shadow-sm py-4 px-4'>
                        <div className='flex gap-8'>
                            <Avatar className='h-12 w-12'>
                                <AvatarImage src={post?.author?.profile_picture} alt="@profile" />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <h1 className='text-xl'>{post?.author?.full_name}</h1>
                                <h1 className='text-sm text-[#5F6368]'>{new Date(post?.created_at).toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
                            </div>
                        </div>
                        <h1 className='py-6 px-6 pl-10'>{post?.post}</h1>
                        <Link href="/classroom/classwork" className="py-4 w-full">
                            <div className='flex gap-4 w-full h-14 border rounded-md shadow-md text-center justify-center items-center px-4 py-4'>
                                <h1>Go to Classworks</h1>
                                <ArrowRight />
                            </div>
                        </Link>
                    </div>
                )}
                </div>
            )
            })}
    </div>
  )
}

export default PostList