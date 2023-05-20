import React from "react";
import {useFormContext} from "react-hook-form";

type Props = {
    placeholder: string,
    registerName: string,
}

export const FilteringSalaryField = ({placeholder, registerName}: Props) => {
    const {register} = useFormContext()


    return <div className="input-group  flex items-center relative w-32">
            <input type="number" {...register(registerName)} placeholder={placeholder}
                   className="w-32 placeholder:text-neutral-500 input bg-base-200 pr-3 h-9 appearance-none"/>
            <span className="absolute right-2 top-1 text-neutral-500 bg-base-200 w-2 h-7">zł</span>
        </div>
};