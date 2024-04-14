'use client'
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { RiSeparator } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"

const type:ElementsType = "SeparatorField"


export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
       icon: RiSeparator,
       label: "Separator Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesConponent,

    validate: () => true
}


function DesignerComponent({
    elementInstance
}: { elementInstance: FormElementInstance }){
    return (
        <div className="flex flex-col gap-2 w-full">
            <Separator/>
        </div>
    )
}

function FormComponent({
    elementInstance,
}: { elementInstance: FormElementInstance,

    }){
    return (
        <Separator/>
    )
}

function PropertiesConponent({
    elementInstance
}: { elementInstance: FormElementInstance }){
   return <p>No Properties for this Element</p>
}