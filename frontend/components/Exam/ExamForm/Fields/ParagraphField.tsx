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
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../Hooks/useDesigner"
import { BsTextParagraph } from "react-icons/bs"

const type:ElementsType = "ParagraphField"

const extraAttributes = {
    text: "Paragraph Field",
}

const propertiesSchema = z.object({
    text: z.string(),
})

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: BsTextParagraph,
       label: "Paragraph Field",
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
    const { text } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Paragraph Field
            </Label>
            <p>{text}</p>
        </div>
    )
}

function FormComponent({
    elementInstance,
}: { elementInstance: FormElementInstance,

    }){
    const element = elementInstance as CustomInstance

    const { text } = element.extraAttributes
    return (
        <p>{text}</p>
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
            text: element.extraAttributes.text,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const { text } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text
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
                name="text"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Text</FormLabel>
                        <FormControl>
                            <Textarea {...field}
                            rows={5}
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