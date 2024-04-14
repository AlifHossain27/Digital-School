'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../Hooks/useDesigner"
import { LuHeading2 } from "react-icons/lu"

const type:ElementsType = "SubTitleField"

const extraAttributes = {
    title: "Sub Title Field",
}

const propertiesSchema = z.object({
    title: z.string(),
})

export const SubTitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: LuHeading2,
       label: "Sub Title Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesConponent,

    validate: () => true
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({
    elementInstance
}: { elementInstance: FormElementInstance }){
    const element = elementInstance as CustomInstance
    const { title } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Sub Title Field
            </Label>
            <p className="text-lg">{title}</p>
        </div>
    )
}

function FormComponent({
    elementInstance,
}: { elementInstance: FormElementInstance,

    }){
    const element = elementInstance as CustomInstance

    const { title } = element.extraAttributes
    return (
        <p className="text-lg">{title}</p>
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
            title: element.extraAttributes.title,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const { title } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title
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
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sub Title</FormLabel>
                        <FormControl>
                            <Input {...field}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur()
                            }}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}