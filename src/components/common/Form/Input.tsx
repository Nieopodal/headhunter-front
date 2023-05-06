import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    type: string;
    name: string;
    placeholder?: string;
    customClasses?: string;
    disabled?: boolean;
}

export const Input = ({type, name, customClasses, placeholder, disabled}: Props) => {
    const {register} = useFormContext()

    return <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
        className={customClasses ?? "h-10 bg-neutral input placeholder:text-neutral-content"}
    />
};