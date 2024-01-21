"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import getSubmissionDetail from '@/actions/getSubmissionDetail'
import DeleteSubmission from "./DeleteSubmission";


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
                <div className="flex flex-row justify-between mb-4 pt-2 px-4 py-4 border rounded-md" key={i}>
                  <div>
                    <h1 className="text-xl">{submission.submission_text}</h1>
                    <h1 className="text-sm pb-2 font-mono">{formatDate(submission.submission_time)}</h1>
                  </div>
                  <div className='pt-3'>
                    <DeleteSubmission classworkID= {classworkID} uid={uid} submissionID={submission.id}/>
                  </div>
                </div>
            )
        })}
      </div>
  )
}

export default StudentSubmissionList