"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import getSubmissionDetail from '@/actions/getSubmissionDetail'


interface Submission {
    id: number,
    assignment: number,
    submission_time: string,
    attachment: string,
    submission_text: string  
}

const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
  const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

const formatDate = (submissionTime: string): string => {
    const date = new Date(submissionTime);
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const daySuffix = getDaySuffix(day);
  
    return `${day}${daySuffix} ${month} ${year} ${hours}:${minutes}`;
};

const StudentSubmissionList = () => {
    const uid = useAppSelector((state) => state.uidReducer.value.userID)
    const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)
    const {data: submissions} = useQuery({
        queryFn: () => getSubmissionDetail(uid,classworkID),
        queryKey: ['submissions']
      })

  return (
    <div className="pt-4">
        {submissions?.map((submission: Submission,i: number) => {
            return (
                <div className="pt-2" key={i}>
                    <Card>
                    <CardHeader>
                    <CardTitle>{submission.submission_text}</CardTitle>
                    <CardDescription>{formatDate(submission.submission_time)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
              </div>
            )
        })}
    </div>
  )
}

export default StudentSubmissionList