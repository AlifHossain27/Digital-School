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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { CiCircleList } from "react-icons/ci";
import { Circle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { toast } from "@/components/ui/use-toast"

const type:ElementsType = "RadioGroupField"

const extraAttributes = {
    label: "Radio Group Field",
    helperText: "0",
    required: false,
    placeHolder: "Value Here...",
    options: []
}

const propertiesSchema = z.object({
    label: z.string(),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    options: z.array(z.string()).default([])
})

export const RadioGroupFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: CiCircleList,
       label: "Radio Group Field",
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
    const { label, required, placeHolder, helperText } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                { label }
                { required && "*" }
            </Label>
            <RadioGroup>
                <div className="flex gap-2 py-1">
                    <Circle size={12} />
                    <Label>{placeHolder}</Label>
                </div>
            </RadioGroup>
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

    const { label, required, placeHolder, helperText, options } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && 'text-red-500')}>
                { label }
                { required && "*" }
            </Label>
            <RadioGroup
            defaultValue={value}
            onValueChange={(value) => {
                setValue(value);
                if (!submitValue) return;
                const valid = RadioGroupFieldFormElement.validate(element, value);
                setError(!valid);
                submitValue(element.id, value);
            }}>
                
                {options.map((option) => (
                    <div className="flex gap-2 px-2 py-2">
                        <RadioGroupItem className="" key={option} value={option} />
                        <Label className="">{option}</Label>
                    </div>
                ))}
                
            </RadioGroup>
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
    const { updateElement, setSelectedElement } = useDesigner()
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: 'onSubmit',
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
            options: element.extraAttributes.options
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const { label, helperText, required, placeHolder, options } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
                placeHolder,
                options
            }
        });
        toast({
            title: "Success",
            description: "Properties saved successfully"
        });
        setSelectedElement(null);
    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(applyChanges)}
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
                            The Points for this Field 
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <Separator />
                <FormField
                control={form.control}
                name="options"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Options</FormLabel>
                            <Button 
                            variant="outline" 
                            className="gap-2"
                            onClick={e =>{
                                e.preventDefault()
                                form.setValue("options", field.value.concat("New Option"))
                            }}>
                                <AiOutlinePlus />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {form.watch("options").map((option, index) => (
                                <div key={index} className="flex items-center justify-between gap-1">
                                    <Input 
                                        placeholder=""
                                        value={option}
                                        onChange={(e) => {
                                            field.value[index] = e.target.value;
                                            field.onChange(field.value);
                                        }}
                                        autoComplete='off'
                                    />
                                    <Button 
                                        variant="ghost"
                                        size={"icon"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const newOptions = [...field.value]
                                            newOptions.splice(index,1)
                                            field.onChange(newOptions)
                                        }} 
                                    >
                                        <AiOutlineClose />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <FormDescription>
                            The Options of the Field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <Separator />
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
                <Separator />
                <Button className="w-full" type="submit">
                    Save
                </Button>
            </form>
        </Form>
    )
}