import {FilteringSalaryField} from "./FilteringSalaryField";
import {useFormContext} from "react-hook-form";
import {ReactNode} from "react";

export const SalaryRange = () => {
    const {formState} = useFormContext();
    return <div className="flex flex-col items-start gap-2 mt-5">
        <span>Oczekiwane wynagrodzenie miesięczne netto </span>
        <div className="flex max-sm:flex-col flex-row gap-3 items-center">
        <span className="flex flex-row items-center">Od&nbsp;
            <FilteringSalaryField registerName={"minSalary"} placeholder="Np. 1000"/></span>
            <span className="flex flex-row items-center">do&nbsp;
                <FilteringSalaryField registerName={"maxSalary"} placeholder="Np. 7000"/></span>
            {(formState.errors.minSalary || formState.errors.maxSalary) &&
                <span className="flex flex-col text-xs text-primary ml-6">
                <span>{formState.errors.minSalary?.message as ReactNode}</span>
                <span>{formState.errors.maxSalary?.message as ReactNode}</span></span>}
        </div>
    </div>
}