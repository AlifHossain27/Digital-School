import { Button } from '@/components/ui/button'
import React from 'react'
import { HiSaveAs } from 'react-icons/hi'

const SaveFormBtn = () => {
  return (
    <Button variant="secondary" className='gap-2'>
        <HiSaveAs className='h-4 w-4'/>
        Save
    </Button>
  )
}

export default SaveFormBtn