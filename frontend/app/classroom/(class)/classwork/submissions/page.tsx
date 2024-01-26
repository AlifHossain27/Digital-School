'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import getSubmissions from '@/actions/getSubmissions'
import Link from 'next/link'
import path from 'path'
import { File } from 'lucide-react'
import { ImSpinner2 } from "react-icons/im";

interface Student {
  student_profile_id: string;
  full_name: string;
}

interface Submission {
  id: number,
  assignment: number,
  submission_time: string,
  attachment: string,
  submission_text: string,
  attachment_name: string,
  attachment_size: number
}

interface SubmissionDetail {
  student: Student;
  submission: [Submission]
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

const page = () => {
  const classworkID = useAppSelector((state) => state.classworkReducer.value.classworkID)
  const {data: submissionDetails, isLoading} = useQuery<SubmissionDetail[]>({
    queryFn: () => getSubmissions(classworkID),
    queryKey: ['submissionDetails']
  })
  return (
    <div className="pt-6">
       <div className='flex flex-row justify-between text-2xl border-b h-10'>
            <h1>Submissions</h1>
        </div>
        {isLoading && (<div className='pt-20 flex justify-center'>
                <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>)}
      {submissionDetails &&
        submissionDetails.map((submissionDetail) => {
          return (
              <Accordion type="multiple" className="text-xl" key={submissionDetail.student.student_profile_id}>
                  <AccordionItem value={`item-${submissionDetail.student.student_profile_id}`}>
                  <AccordionTrigger>{submissionDetail.student.full_name}</AccordionTrigger>
                  <AccordionContent className="text-lg">
                    {submissionDetail.submission.map((submission, i: number) => (
                      <div>
                      <Accordion type="single" collapsible key={i} className="px-6">
                      <AccordionItem value={`item-${i}`}>
                        <AccordionTrigger>
                          <div className="flex flex-col justify-start">
                            <h1>{submission.submission_text}</h1>
                            <h1 className="text-xs font-mono">{formatDate(submission.submission_time)}</h1>
                          </div>
                          </AccordionTrigger>
                          <AccordionContent>
                                {submission.attachment !== null ? (
                                  <Link href={submission.attachment}>
                                    <div className="flex flex-row gap-2">
                                      <File size={80} />
                                      <div className="flex flex-col">
                                        <h1 className="text-xl">{submission.attachment_name ? path.basename(submission.attachment_name) : "NoFileName"}</h1>
                                        <h1>{formatFileSize(submission.attachment_size)}</h1>
                                      </div>
                                    </div>
                                  </Link>
                                ) : (
                                  <p>No Attachment</p>
                                )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      </div>
                    ))}
                  </AccordionContent>
                  </AccordionItem>
              </Accordion>
          )
        }
        
        )}
    </div>
  )
}

export default page