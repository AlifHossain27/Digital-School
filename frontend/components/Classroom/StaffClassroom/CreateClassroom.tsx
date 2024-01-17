import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BsFileEarmarkPlus } from "react-icons/bs"

const CreateClassroom = () => {
  return (
    <div>
        <Dialog>
        <DialogTrigger asChild>
            <Button variant= "outline" className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
                <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
                <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create New Classroom</p>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create A New Classroom</DialogTitle>
            <DialogDescription>
                Lets create a classroom
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateClassroom