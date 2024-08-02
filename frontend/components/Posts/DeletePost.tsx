import React from 'react'
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
import { delPost } from '@/actions/classroom_post';

type PostData = {
    postID: number
}

const DeletePost = ( {postID}: PostData ) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => delPost(postID),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['posts']})
          toast({
            title: "Post deleted",
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

    async function deletePost(){
        try {
          await mutate();
        } catch (error) {
          console.error("Error in onSubmit:", error);
        }
      }
  return (
    <Dialog>
        <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="w-[10rem] text-center rounded-none">Delete</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to Delete this Post?</DialogTitle>
            </DialogHeader>
            <DialogClose asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="destructive" className='w-full' type="submit" onClick={deletePost}>Delete</Button>
            </DialogClose>
        </DialogContent>
    </Dialog>
  )
}

export default DeletePost