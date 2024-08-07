'use client'
import React, { startTransition, useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from '../ExamForm/FormElements'
import { Button } from '@/components/ui/button';
import { HiCursorClick } from 'react-icons/hi';
import { useToast } from '@/components/ui/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { submitExam, addExamSubmissionMarks } from '@/actions/exam';

const FormSubmitComponent = ({examID,content}: {content: FormElementInstance[]; examID: number }) => {
  const { toast } = useToast();
  const formValues = useRef<{[key: string]: string}>({});
  const formErrors = useRef<{[key: string]: boolean}>({});
  const [ renderKey, setRenderKey ] = useState(new Date().getTime());

  const [ submitted, setSubmitted ] = useState(false);
  const [ pending, startTransition ] = useTransition();
  

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [ content ])

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, [])
  const submitForm = async() => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please enter all the required fields",
        variant: "destructive"
      })
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current)
      const resp = await submitExam(examID, jsonContent)
      const data = await resp.json()
      if (!resp.ok){
        toast({
          title: data,
          variant: "destructive"
        })
        
      }
      else{
        setSubmitted(true)
        console.log(data.id)
        console.log(data["id"])
        await addExamSubmissionMarks(data.id)
      }
    } catch(error) {
      console.log(error)
    }
  }

  if (submitted) {
    return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-xl shadow-blue-700 rounded'>
        <h1 className='text-2xl font-bold'>Form Submitted</h1>
        <p className='text-muted-foreground'>
          Thank you for submitting the form, you can close this page now.
        </p>
      </div>
    </div>
    )
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
        <div key={renderKey} className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-xl shadow-blue-700 rounded'>
            {
                content.map((element) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return <FormElement 
                            key={element.id} 
                            elementInstance={element} 
                            submitValue={submitValue} 
                            isInvalid={formErrors.current[element.id]}
                            defaultValue={formValues.current[element.id]}
                            />
                })   
            }
            <Button 
              className='mt-8' 
              onClick={() => {
                startTransition(submitForm);
              }}
              disabled={pending}
            >
              { !pending && 
                <div className='flex'>
                  <HiCursorClick className='mr-2'/>
                  Submit
                </div> }
              
              { pending && <ImSpinner2 className='animate-spin'/>}
              
            </Button>
        </div>
    </div>
  )
}

export default FormSubmitComponent