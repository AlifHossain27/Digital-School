import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useQuery } from '@tanstack/react-query'
import { getExamSubmissions } from '@/actions/exam';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface Student {
  profile_uid: string,
  full_name: string,
  profile_picture: string
}

interface Exam {
  id: number,
  teacher: string,
  classroom: string,
  created_at: string,
  published: boolean,
  name: string,
  description: string,
  content: string,
  visits: number,
  submissions: number
}

interface ExamSubmission {
  id: number,
  student: Student,
  exam: Exam,
  content: string,
  created_at: string,
}


const SubmissionsTable = ({examID}: {examID: number}) => {
  const {data: submissions, isLoading} = useQuery<ExamSubmission[] | undefined>({
    queryFn: () => getExamSubmissions(examID),
    queryKey: ['submission']
  })

  if (isLoading) {
    return (<div className='pt-20 flex justify-center'>
              <ImSpinner2 className= "animate-spin" size= "50"/>
            </div>)
  }
  
  return (
    <div>
        <h1 className='text-2xl font-bold my-4'>Submissions</h1>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-muted-foreground text-right uppercase'>Exam</TableHead>
                <TableHead className='text-muted-foreground text-right uppercase'>Submitted at</TableHead>
                <TableHead className='text-muted-foreground text-right uppercase'>Submission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                  {submissions?.map((submission: ExamSubmission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={submission.student.profile_picture} alt="@profile" />
                            <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                        <h1 className="pt-2">{submission.student.full_name}</h1>
                      </TableCell>
                      <TableCell className="text-right">{new Date(submission.created_at).toLocaleString('default', { month: 'long', day: 'numeric' })}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/classroom/exam/submissions/${submission.id}`}>
                          <Button>
                            <ArrowRight/>
                            </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default SubmissionsTable