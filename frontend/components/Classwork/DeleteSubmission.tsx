import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react'

type SubmissionData = {
    classworkID: number,
    uid: string,
    submissionID: number,
}

const DeleteSubmission = ({classworkID, uid, submissionID}:SubmissionData) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async () => fetch(`http://localhost:8000/api/assignment/submission/student/${uid}/${classworkID}/${submissionID}/`,{
          method: "DELETE",
          credentials: "include"
        }),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['submissions']})
          toast({
            title: "Submission deleted",
          })
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: `${error.message || "Unknown error"} oops`,
            description: "Something went wrong. Please Try again",
          })
        }
      })

    async function deleteSubmission(){
        try {
          await mutate();
        } catch (error) {
          console.error("Error in onSubmit:", error);
        }
      }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="destructive" className="rounded-full">
                <Trash/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to Delete your Submission?</DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
            <Button variant="destructive" className='w-full' type="submit" onClick={deleteSubmission}>Delete</Button>
        </DialogClose>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteSubmission