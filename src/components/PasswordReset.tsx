import React from "react";
import {GoBack} from "./common/GoBack";

export const PasswordReset = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-11/12 sm:w-8/12 md:w-1/3 lg:w-1/4">
                <div className="mb-14"><GoBack/></div>
                <div className="flex flex-col">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-2xl font-bold">Zmiana hasła</h1></div>
                    <div className="form-control gap-4 my-4">
                        <input type="password" placeholder="Stare hasło"
                               className="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"/>
                        <input type="password" placeholder="Nowe hasło"
                               className="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"/>
                        <input type="password" placeholder="Potwierdź nowe hasło"
                               className="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"/>
                    </div>
                    <div className="items-center flex flex-row place-content-between align-middle mt-6">
                        <button
                            className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                            Zmień hasło
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}