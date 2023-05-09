import React from "react";
import {FaSort} from "react-icons/fa";
import {useFormContext} from "react-hook-form";

export const FilteringNumberOfMonths = () => {
    const {register} = useFormContext()
    return (

            <div className="input-group  flex items-center relative w-36">
                <input type="number" {...register('monthsOfCommercialExp')} placeholder="Np. 3"
                       min="0"
                       className="w-36 placeholder:text-neutral-500 input bg-base-200 pr-3 h-9 appearance-none"/>
                <div className="absolute right-3 top-2.5 text-neutral-500 w-3 h-7 pointer-events-none">
                    <FaSort className="scale-[170%] bg-base-200"/></div>
            </div>
    )
}