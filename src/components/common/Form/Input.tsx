import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    type: string;
    name: string;
    placeholder?: string;
    additionalClasses?: string;
    disabled?: boolean;
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    customClasses?: string;
}

export const Input = ({type, name, additionalClasses, placeholder, disabled, required, min, max, minLength, maxLength, customClasses}: Props) => {
    const {register} = useFormContext();

    return <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
        required={required}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        className={`${additionalClasses} ${customClasses ?? 'h-10 bg-neutral input placeholder:text-neutral-content'}`}
    />
};