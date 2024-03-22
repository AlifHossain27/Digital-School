import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import {  useMutation, useQueryClient } from '@tanstack/react-query';

type SubmissionData = {
    submissionID: string,
}

const DeleteClassworkSubmission = ({submissionID}:SubmissionData) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async () => fetch(`http://localhost:8000/api/classwork/submission/${submissionID}/`,{
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
            <Button variant="destructive" className="w-full">
                Unsubmit
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

export default DeleteClassworkSubmission