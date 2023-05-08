import React from "react";
import {GoBack} from "../common/GoBack";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../common/Form/Input";

export const PasswordReset = () => {

    const methods = useForm({
        defaultValues: {
            email: '',
        },
    });

    return <div className="flex flex-col items-center justify-start w-full mt-10">
        <div className="">
            <div className="mb-7"><GoBack/></div>
            <div className="flex flex-col">
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-bold">Przypomnij hasło</h1>
                </div>

                <form>
                    <FormProvider {...methods}>
                        <div className="form-control gap-4 my-4">

                            <Input
                                type="email"
                                placeholder="E-mail"
                                name="email"
                                additionalClasses="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"
                            />
                        </div>
                        <div className="items-center flex flex-row place-content-between align-middle mt-6">
                            <button
                                className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                                Zmień hasło
                            </button>
                        </div>
                    </FormProvider>
                </form>
            </div>
        </div>
    </div>
};