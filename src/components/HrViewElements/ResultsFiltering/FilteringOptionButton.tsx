import React from "react";
import {useFormContext} from "react-hook-form";

type Props = {
    title: string;
    registerName: string;
    value: string;
}

export const FilteringOptionButton = ({value, title, registerName}: Props) => {
    const {register} = useFormContext();

    return <label className="swap"><input {...register(`${registerName}`)} value={value} type="checkbox"/>
        <div className="swap-on bg-red-700 flex items-center px-6 py-2">{title}</div>
        <div className="swap-off bg-neutral-700 flex items-center px-6 py-2">{title}</div>
    </label>
};