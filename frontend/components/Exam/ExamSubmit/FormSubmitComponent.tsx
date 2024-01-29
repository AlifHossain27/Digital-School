'use client'
import React from 'react'
import { FormElementInstance, FormElements } from '../ExamForm/FormElements'
import { Button } from '@/components/ui/button';
import { HiCursorClick } from 'react-icons/hi';

const FormSubmitComponent = ({examID,content}: {content: FormElementInstance[]; examID: number }) => {
  
  
  
  const submitForm = () => {}
  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
        <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-xl shadow-blue-700 rounded'>
            {
                content.map((element) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return <FormElement key={element.id} elementInstance={element} />
                })   
            }
            <Button className='mt-8' onClick={() => submitForm()}>
              <HiCursorClick className='mr-2'/>
              Submit
            </Button>
        </div>
    </div>
  )
}

export default FormSubmitComponent