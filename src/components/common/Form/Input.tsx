import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    type: string;
    name: string;
    placeholder: string;
    customClasses?: string;
}

export const Input = ({type, name, customClasses, placeholder}: Props) => {
    const {register} = useFormContext()

    return <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={customClasses ?? "h-10 bg-neutral input input placeholder:text-neutral-content"}
    />
};