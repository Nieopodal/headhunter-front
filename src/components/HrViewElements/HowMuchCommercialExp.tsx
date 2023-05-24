import {FilteringNumericalInput} from "./FilteringNumericalInput";
import {useFormContext} from "react-hook-form";
import {ReactNode} from "react";

export const HowMuchCommercialExp = () => {
    const {formState} = useFormContext();

    return <div className="flex flex-col items-start gap-2 mt-3">
        <span>Ilość miesięcy doświadczenia komercyjnego kandydata w programowaniu</span>
        <div className="flex flex-row gap-3 items-center">
            <FilteringNumericalInput registerName={`monthsOfCommercialExp`} placeholder={`Np. 3`} min={0}/>
            <span className="text-xs text-primary ml-6">
                {formState.errors.monthsOfCommercialExp?.message as ReactNode}
            </span>
        </div>
    </div>
}