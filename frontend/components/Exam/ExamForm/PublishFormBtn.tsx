import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
 } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store';
import { FaSpinner } from 'react-icons/fa'
import { MdOutlinePublish } from 'react-icons/md'
import { publishExam } from '@/actions/exam'
import { createPost } from '@/actions/classroom_post'

const PublishFormBtn = ({examID}: {examID:number}) => {
  const classID = useAppSelector((state) => state.classroomReducer.value.classroomID)
  const [loading, startTransition] = useTransition();
  const { toast } = useToast()
  const router = useRouter()
  async function publishForm() {
    try {
      await publishExam(examID)
      toast({
        title: "Success",
        description: "Your Exam is now Published",
      });
      await createPost(classID, "A new exam has been uploaded", "exam")
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
            <MdOutlinePublish className='h-4 w-4'/>
            Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. After Publishing you will not be able to update this Exam. <br>
          </br>
          <span className='font-medium'>By Publishing this Exam you will make it available to all the Students and you will be able to collect submissions.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={e => {
            e.preventDefault()
            startTransition(publishForm)
          }}>
            Proceed {loading && <FaSpinner className='animate-spin'/>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn