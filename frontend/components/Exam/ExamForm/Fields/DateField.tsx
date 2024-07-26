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
import { BsFillCalendarDateFill } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

const type:ElementsType = "DateField"

const extraAttributes = {
    label: "Date Field",
    required: false,
}

const propertiesSchema = z.object({
    label: z.string(),
    required: z.boolean().default(false),
})

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: BsFillCalendarDateFill,
       label: "Date Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesConponent,

    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element= formElement as CustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.length > 0;
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
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                { label }
                { required && "*" }
            </Label>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Pick a Date</span>
            </Button>
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

    const [ date, setDate ] = useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : undefined
    )
    const [ error, setError ] = useState(false)

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { label, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && 'text-red-500')}>
                { label }
                { required && "*" }
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button 
                    variant="outline" 
                    className={cn("w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    error && "border-red-500")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a Date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                        mode="single" 
                        selected={date}
                        onSelect={ date => {
                            setDate(date)
                            if (!submitValue) return;
                            const value = date?.toUTCString() || "";
                            const valid = DateFieldFormElement.validate(element, value);
                            setError(!valid);
                            submitValue(element.id, value)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
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