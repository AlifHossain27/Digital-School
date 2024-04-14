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
import { MdTextFields } from "react-icons/md"
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
import { LuHeading1 } from "react-icons/lu"

const type:ElementsType = "TitleField"

const extraAttributes = {
    title: "Title Field",
}

const propertiesSchema = z.object({
    title: z.string(),
})

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: LuHeading1,
       label: "Title Field",
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
                Title Field
            </Label>
            <p className="text-xl">{title}</p>
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
        <p className="text-xl">{title}</p>
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
                        <FormLabel>Title</FormLabel>
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