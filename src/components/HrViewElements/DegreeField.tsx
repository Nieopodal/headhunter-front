import React from "react";
import {FilteringNumericalInput} from "./FilteringNumericalInput";

type Props = {
    title: string,
    registerName: string,
    errorMsg?: string,
}

export const DegreeField = ({title, registerName, errorMsg}: Props) => {

    return (

        <label className="flex flex-row items-center gap-10">
            <div className="flex flex-col w-2/3 items-start">
                <span className="">{title}</span>
                <span className="text-xs text-primary mt-1 text-left">
                    {errorMsg}</span>
            </div>
            <div className="flex flex-col items-center">
                <FilteringNumericalInput registerName={registerName} placeholder={`1-5`} min={`1`} max={`5`}/></div>
        </label>

    )
}