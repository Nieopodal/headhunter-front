import React from "react";
import {FilteringRatingSteps} from "./FilteringRatingSteps";
import {useFormContext} from "react-hook-form";

type Props = {
title: string
    registerName: string
}

export const FilteringSlider = ({title, registerName}: Props) => {
    const { register } = useFormContext()


    return (<>

        <label className="flex flex-row items-center gap-10">
            <span className="w-1/2">{title}</span>
            <div className="flex flex-col items-center w-full">
                <input {...register(`${registerName}`, {required: true})}
                       style={{"--rounded-box": "20px"} as React.CSSProperties} type="range" min="1" max="5"
                       className="range range-primary" step="1"/><FilteringRatingSteps/></div>
        </label>

    </>)
}