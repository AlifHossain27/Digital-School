'use client'
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle
} from '@/components/ui/card';
import { useAppSelector } from '@/redux/store';
import { useQuery } from '@tanstack/react-query'
import { getExam, unpublishExam } from '@/actions/exam';
import { createPost } from '@/actions/classroom_post'
import {  useQueryClient } from '@tanstack/react-query';
import { ImSpinner2 } from 'react-icons/im'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import SubmissionsTable from './SubmissionsTable';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { User } from 'lucide-react';

interface Teacher {
    teacher_profile_id: string;
    full_name: string;
    email: string;
    contact_info: string;
  }
  
interface Student {
    student_profile_id: string;
    full_name: string;
    father_name: string;
    mother_name: string;
}

interface Classroom {
    class_id: string;
    name: string;
    teachers: Teacher[];
    students: Student[];
}

interface Exam {
    id: number,
    teacher: string,
    classroom: Classroom,
    created_at: string,
    published: boolean,
    name: string,
    description: string,
    content: string,
    visits: number,
    submissions: number
}


const Submissions = () => {
    const { toast } = useToast()
    const router = useRouter()
    const queryClient = useQueryClient()
    const examID = useAppSelector((state) => state.examReducer.value.examID)
    const classroomID = useAppSelector((state) => state.classroomReducer.value.classroomID)
    const {data: exam, isLoading} = useQuery<Exam>({
        queryFn: () => getExam(examID),
        queryKey: ['exam']
      })
    if (isLoading) {
        return (
            <div className='pt-20 flex justify-center'>
                <ImSpinner2 className="animate-spin" size="50" />
            </div>
        )
    }
    const students = exam?.classroom.students;
    const submissionRate = (exam?.submissions! / students?.length!) * 100

    async function unpublishForm() {
        try {
          await unpublishExam(examID)
          toast({
            title: "Success",
            description: "Your Exam is now Published",
          });
          await createPost(classroomID, `The result of ${exam?.name} has been published`, "exam")
          await queryClient.invalidateQueries({queryKey: ['posts']})
          router.push("/classroom/exam/")
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong"
          });
        }
      }

  return (
    <div>
        <div className='py-4 border-b border-muted'>
            <div className='flex justify-between container'>
                <h1 className='text-4xl font-bold truncate'>{exam?.name}</h1>
                <Button className='w-[200px]' onClick={unpublishForm}>
                    Publish Result
                </Button>
            </div>
        </div>
        <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container'>
            <Card className='shadow-md shadow-blue-600'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium text-muted-foreground'>Total Submissions</CardTitle>
                    <FaWpforms className='text-blue-600'size={20}/>
                </CardHeader>
                <CardContent>
                <div className='text-2xl font-bold'>{exam?.submissions}</div>
                    <p className='text-xs text-muted-foreground pt-1'>All time exam submissions</p>
                </CardContent>
            </Card>
            <Card className='shadow-md shadow-yellow-600'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium text-muted-foreground'>Total Students</CardTitle>
                    <User className='text-yellow-600'/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{students?.length}</div>
                    <p className='text-xs text-muted-foreground pt-1'>Total students in the classroom</p>
                </CardContent>
            </Card>
            <Card className='shadow-md shadow-green-600'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium text-muted-foreground'>Submission Rate</CardTitle>
                    <HiCursorClick className='text-green-600' size={20}/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{submissionRate.toFixed(2)} %</div>
                    <p className='text-xs text-muted-foreground pt-1'>Rate of exam submission</p>
                </CardContent>
            </Card>
        </div>
        <div className='container pt-10'>
            <SubmissionsTable examID={examID}/>
        </div>
    </div>
  )
}

export default Submissions