import React from "react";
import { TextFieldFormElement } from "./Fields/TextField";
import { TitleFieldFormElement } from "./Fields/TitleField";
import { SubTitleFieldFormElement } from "./Fields/SubTitleField";
import { ParagraphFieldFormElement } from "./Fields/ParagraphField";
import { SeparatorFieldFormElement } from "./Fields/SeparatorField";
import { SpacerFieldFormElement } from "./Fields/SpacerField";
import { NumberFieldFormElement } from "./Fields/NumberField";
import { TextAreaFieldFormElement } from "./Fields/TextAreaField";
import { DateFieldFormElement } from "./Fields/DateField";
import { SelectFieldFormElement } from "./Fields/SelectField";
import { CheckboxFieldFormElement } from "./Fields/CheckboxField";
import { RadioGroupFieldFormElement } from "./Fields/RadioGroupField";

export type ElementsType = "TextField" | "TitleField" | "SubTitleField" | "ParagraphField" | "SeparatorField" | "SpacerField" | "NumberField" | "TextAreaField" | "DateField" | "SelectField" | "CheckboxField" | "RadioGroupField"

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id:string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    }

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    validate: (formElement: FormElementInstance, currentValue: string) => boolean;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
}
export const FormElements:FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement,
    RadioGroupField: RadioGroupFieldFormElement,
};