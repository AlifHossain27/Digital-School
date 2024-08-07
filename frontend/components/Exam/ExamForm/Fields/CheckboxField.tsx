'use client'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { IoMdCheckbox } from "react-icons/io"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "../Hooks/useDesigner"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

const type:ElementsType = "CheckboxField"

const extraAttributes = {
    label: "Checkbox Field",
    required: false,
}

const propertiesSchema = z.object({
    label: z.string(),
    required: z.boolean().default(false),
})

export const CheckboxFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: IoMdCheckbox,
       label: "Checkbox Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesConponent,

    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element= formElement as CustomInstance;
        if (element.extraAttributes.required) {
            return currentValue === "true";
        }
        return true;
    }
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({
    elementInstance
}: { elementInstance: FormElementInstance }){
    const element = elementInstance as CustomInstance
    const { label, required } = element.extraAttributes
    const id = `checkbox-${element.id}`
    return (
        <div className="flex items-top space-x-2">
            <Checkbox id={id}/>
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id}>
                    { label }
                    { required && "*" }
                </Label>
            </div>
        </div>
    )
}

function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue
}: { elementInstance: FormElementInstance,
     submitValue?: SubmitFunction,
     isInvalid?: boolean,
     defaultValue?: string}){
    const element = elementInstance as CustomInstance

    const [ value, setValue ] = useState<boolean>( defaultValue === "true" ? true : false )
    const [ error, setError ] = useState(false)

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { label, required } = element.extraAttributes
    const id = `checkbox-${element.id}`
    return (
        <div className="flex items-top space-x-2">
            <Checkbox 
                id={id} 
                checked={value} 
                className={cn(error && "border-red-500")} 
                onCheckedChange={(checked) => {
                    let value = false;
                    if (checked === true) value = true;

                    setValue(value);
                    if (!submitValue) return;
                    const stringValue = value ? "true" : "false";
                    const valid = CheckboxFieldFormElement.validate(
                        element,
                        stringValue
                    );
                    setError(!valid);
                    submitValue(element.id, stringValue)
                }}
            />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id} className={cn(error && "text-red-500")}>
                    { label }
                    { required && "*" }
                </Label>
            </div>
        </div>
    )
}

function PropertiesConponent({
    elementInstance
}: { elementInstance: FormElementInstance }){
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner()
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: 'onBlur',
        defaultValues: {
            label: element.extraAttributes.label,
            required: element.extraAttributes.required,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const { label, required } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                required
            }
        })
    }

    return (
        <Form {...form}>
            <form 
            onBlur={form.handleSubmit(applyChanges)}
            onSubmit={(e) => {
                e.preventDefault()
            }}
            className="space-y-3">
                <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input {...field}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur()
                            }}/>
                        </FormControl>
                        <FormDescription>
                            The label of the Field. <br/> It will be displayed above the Field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                        <FormLabel>Required</FormLabel>
                        <FormDescription>
                            Do you want this field to be required?
                        </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}