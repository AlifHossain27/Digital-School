import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { HiSaveAs } from 'react-icons/hi'
import useDesigner from './Hooks/useDesigner'
import { updateExam } from '@/actions/exam'
import { useToast } from "@/components/ui/use-toast"
import { FaSpinner } from 'react-icons/fa'

const SaveFormBtn = ({examID}: {examID: number}) => {
  const { elements } = useDesigner()
  const [ loading, startTransition ] = useTransition()
  const { toast } = useToast()
  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements)
      await updateExam(examID, JsonElements)
      toast({
        title: "Success",
        description: "Your Exam has been saved",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong"
      });
    }
  }
  return (
    <Button variant="secondary" className='gap-2' disabled={loading} onClick={() => {
      startTransition(updateFormContent)
    }}>
        <HiSaveAs className='h-4 w-4'/>
        Save
        {loading && <FaSpinner className='animate-spin'/>}
    </Button>
  )
}

export default SaveFormBtn