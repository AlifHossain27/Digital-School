
import { useQuery } from '@tanstack/react-query'
import getExamSubmissions from '@/actions/getExamSubmissions'
import { ElementsType, FormElementInstance } from '../ExamForm/FormElements'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { ImSpinner2 } from "react-icons/im";


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

interface Submission {
  id: number,
  exam: Exam,
  content: string,
  created_at: string,
}


const SubmissionsTable = ({examID}: {examID: number}) => {
  const {data: submissions, isLoading} = useQuery({
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
              </TableRow>
            </TableHeader>
            <TableBody>
                  {submissions?.map((submission: Submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>{submission.exam.name}</TableCell>
                      <TableCell className='text-right'>{submission.created_at}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default SubmissionsTable