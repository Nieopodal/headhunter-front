import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    type: string;
    name: string;
    placeholder?: string;
    additionalClasses?: string;
    disabled?: boolean;
}

export const Input = ({type, name, additionalClasses, placeholder, disabled}: Props) => {
    const {register} = useFormContext()

    return <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
        className={`${additionalClasses} h-10 bg-neutral input placeholder:text-neutral-content`}
    />
};