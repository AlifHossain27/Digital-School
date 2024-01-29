'use client'
import React, { useCallback, useRef, useState } from 'react'
import { FormElementInstance, FormElements } from '../ExamForm/FormElements'
import { Button } from '@/components/ui/button';
import { HiCursorClick } from 'react-icons/hi';
import { useToast } from '@/components/ui/use-toast';

const FormSubmitComponent = ({examID,content}: {content: FormElementInstance[]; examID: number }) => {
  const { toast } = useToast();
  const formValues = useRef<{[key: string]: string}>({});
  const formErrors = useRef<{[key: string]: boolean}>({});
  const [ renderKey, setRenderKey ] = useState(new Date().getTime());

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
  const submitForm = () => {
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
    console.log(formValues.current)
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
            <Button className='mt-8' onClick={() => submitForm()}>
              <HiCursorClick className='mr-2'/>
              Submit
            </Button>
        </div>
    </div>
  )
}

export default FormSubmitComponent