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

type ClassworkData = {
    classworkID: number,
    classworkTitle: string
}

const DeleteClasswork = ({classworkID, classworkTitle}: ClassworkData) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async () => fetch(`http://localhost:8000/api/assignment/${classworkID}/`,{
          method: "DELETE",
          credentials: "include"
        }),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['classworks']})
          toast({
            title: "Classroom deleted",
            description: `Successfully Deleted ${classworkTitle}`,
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

    async function deleteClasswork(){
        try {
          await mutate();
        } catch (error) {
          console.error("Error in onSubmit:", error);
        }
      }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="destructive" className="rounded-full">Delete Classwork</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to Delete this Classroom?</DialogTitle>
            </DialogHeader>
            <DialogDescription className='text-xl'>Classwork Title: {classworkTitle}</DialogDescription>
            <DialogClose asChild>
            <Button variant="destructive" className='w-full' type="submit" onClick={deleteClasswork}>Delete</Button>
        </DialogClose>
        </DialogContent>
        </Dialog>
  )
}

export default DeleteClasswork