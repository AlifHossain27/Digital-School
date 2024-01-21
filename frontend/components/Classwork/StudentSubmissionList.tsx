"use client"
import React from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/store';
import getSubmissionDetail from '@/actions/getSubmissionDetail'
import DeleteSubmission from "./DeleteSubmission";
import path from 'path'
import { File } from 'lucide-react'

interface Submission {
    id: number,
    assignment: number,
    submission_time: string,
    attachment: string,
    submission_text: string,
    attachment_name: string,
    attachment_size: number
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

const formatFileSize = (sizeInBytes: number): string => {
  const kiloBytes = sizeInBytes / 1024;
  if (kiloBytes < 1) {
      return `${sizeInBytes} B`;
  } else if (kiloBytes < 1024) {
      return `${kiloBytes.toFixed(2)} KB`;
  } else {
      const megaBytes = kiloBytes / 1024;
      return `${megaBytes.toFixed(2)} MB`;
  }
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
          const { submission_text, submission_time, attachment, attachment_name, attachment_size, id } = submission;
          const filename = path.basename(attachment_name)
            return (
                <div className="flex flex-row justify-between mb-4 pt-2 px-4 py-4 border rounded-md" key={i}>
                  <div>
                    <h1 className="text-xl">{submission_text}</h1>
                    <h1 className="text-sm pb-2 font-mono">{formatDate(submission_time)}</h1>
                    <Link href={submission.attachment}>
                    <div className='flex flex-row gap-4'>
                          <File size={100}/>
                      <div className='flex flex-col'>
                        <h1 className='text-xl'>{filename}</h1>
                        <h1>{formatFileSize(attachment_size)}</h1>
                      </div>
                    </div>
                    </Link>
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