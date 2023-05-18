import {Input} from "./Form/Input";
import React from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    newHrMail?: string;
}

export const NewPassword = ({newHrMail}: Props) => {
    const {formState: {errors}} = useFormContext();
    return <div className="flex flex-col">
        <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-bold">Wprowadź nowe hasło {newHrMail ? ` dla ${newHrMail}` : ""}</h1>
        </div>
            <div className="form-control gap-2 my-4">

                <Input
                    type="password"
                    placeholder="Nowe hasło"
                    name="password"
                    additionalClasses="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"
                />
                <span
                    className="text-xs text-primary mb-2 text-left">{errors.password?.message as string}</span>

                <Input
                    type="password"
                    placeholder="Powtórz nowe hasło"
                    name="confirmNewPass"
                    additionalClasses="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"
                />
                <span
                    className="text-xs text-primary text-left">{errors.confirmNewPass?.message as string}</span>
            </div>
            <div className="items-center flex flex-row place-content-between align-middle mt-6">
                <button
                    className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                    Zmień hasło
                </button>
            </div>
    </div>
};