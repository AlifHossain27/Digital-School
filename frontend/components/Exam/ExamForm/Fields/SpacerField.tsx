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
import { Slider } from "@/components/ui/slider"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../Hooks/useDesigner"
import { LuSeparatorHorizontal } from "react-icons/lu"


const type:ElementsType = "SpacerField"

const extraAttributes = {
    height: 20,
}

const propertiesSchema = z.object({
    height: z.number().min(5).max(200),
})

export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
       icon: LuSeparatorHorizontal,
       label: "Spacer Field",
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
    const { height } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Spacer Field {height}px
            </Label>
            <LuSeparatorHorizontal className="h-8 w-8" />
        </div>
    )
}

function FormComponent({
    elementInstance,
}: { elementInstance: FormElementInstance,

    }){
    const element = elementInstance as CustomInstance

    const { height } = element.extraAttributes
    return (
        <div style={{height, width:"100%"}}></div>
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
            height: element.extraAttributes.height,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const { height } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height
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
                name="height"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Height (px): {form.watch('height')}</FormLabel>
                        <FormControl className="pt-2">
                            <Slider 
                                defaultValue={[field.value]}
                                min={5}
                                max={200}
                                step={1}
                                onValueChange={(value) => field.onChange(value[0])}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}