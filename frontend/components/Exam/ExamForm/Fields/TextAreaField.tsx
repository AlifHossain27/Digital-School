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
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "../Hooks/useDesigner"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { BsTextareaResize } from "react-icons/bs"
import { Slider } from "@/components/ui/slider"


const type:ElementsType = "TextAreaField"

const extraAttributes = {
    label: "Text Area",
    helperText: "0",
    required: false,
    placeHolder: "Value Here...",
    rows: 1,
}

const propertiesSchema = z.object({
    label: z.string(),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    rows: z.number().min(1).max(10),
})

export const TextAreaFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: BsTextareaResize,
       label: "Text Area Field",
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
    const { label, required, placeHolder, helperText, rows } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                { label }
                { required && "*" }
            </Label>
            <Textarea readOnly disabled placeholder={ placeHolder } />
            { helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{ helperText } points</p>
            )}
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

    const [ value, setValue ] = useState( defaultValue || "" )
    const [ error, setError ] = useState(false)

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { label, required, placeHolder, helperText, rows } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && 'text-red-500')}>
                { label }
                { required && "*" }
            </Label>
            <Textarea
            className={cn(error && 'border-red-500')}
            rows={rows}
            placeholder={ placeHolder } 
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
                if (!submitValue) return;
                const valid = TextAreaFieldFormElement.validate(element, e.target.value);
                setError(!valid)
                if (!valid) return;
                submitValue(element.id, e.target.value);
            }}
            value={value}
            />
            { helperText && (
                <p className={cn('text-muted-foreground text-[0.8rem]', error && 'text-red-500')}>{ helperText } points</p>
            )}
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
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
            rows: element.extraAttributes.rows,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const { label, helperText, required, placeHolder, rows } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
                placeHolder,
                rows
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
                            }}
                            autoComplete='off'/>
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
                name="placeHolder"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>PlaceHolder</FormLabel>
                        <FormControl>
                            <Input {...field}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur()
                            }}
                            autoComplete='off'/>
                        </FormControl>
                        <FormDescription>
                            The PlaceHolder of the Field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="helperText"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Points</FormLabel>
                        <FormControl>
                            <Input {...field}
                            type="number"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur()
                            }}
                            autoComplete='off'/>
                        </FormControl>
                        <FormDescription>
                            The points for this Field 
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="rows"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rows {form.watch('rows')}</FormLabel>
                        <FormControl>
                            <Slider 
                                defaultValue={[field.value]}
                                min={1}
                                max={10}
                                step={1}
                                onValueChange={(value) => {
                                    field.onChange(value[0])
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            The Helper Text of the Field <br/> It will be displayed below the Field
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