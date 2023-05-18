import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../common/Form/Input";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useFetch} from "../../hooks/useFetch";
import {useParams} from 'react-router-dom';
import {AppLogo} from "../Header/AppLogo";
import {apiUrl} from "../../config/api";


type PollParams = {
    id: string,
    token: string
};

type PasswordSetNewRequest = {
    newPass: string,
    confirmNewPass: string,
}

export const PasswordSendNew = () => {

    const {fetchApi, data: fetchData, apiError} = useFetch();

    const {id, token} = useParams<PollParams>();

    const schema = yup.object().shape({
        newPass: yup.string().min(6, 'Hasło musi zawierać co najmniej 6 znaków').required('Pole wymagane').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Hasło musi zawierać minimum 6 znaków, jedną wielką literę, jedną małą, jedną liczbę oraz znak specjalny"
        ),
        confirmNewPass: yup.string().oneOf([yup.ref("newPass")], `Hasła muszą być jednakowe!`).required('Pole wymagane')
    });

    const {handleSubmit, formState, ...methods} = useForm<PasswordSetNewRequest>({
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const onSendNewPass = async ({newPass}: PasswordSetNewRequest) => {
        const dataToSend = {
            newPass,
            id,
            token
        };
        // await fetchApi(null, `${apiUrl}/auth/newpass/`, "POST", "Błąd podczas próby zmiany hasła", dataToSend, true)
        // setModal(<SuccessMessage
        //             message={`Hasło zmienione!`}/>)
        // if (apiError) {
        //             setModal(<ErrorMessage error={apiError}/>)
        //         }
        // @TODO: handle this when BE is ready

        console.log(dataToSend)
    }

    return <div className="flex flex-col items-center justify-start w-full mt-10">
        <div className="">
            <div className="flex justify-center">
                <AppLogo classes="w-32 mb-12"/>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-bold">Wprowadź nowe hasło</h1>
                </div>
                <FormProvider handleSubmit={handleSubmit} formState={formState} {...methods}>
                    <form onSubmit={handleSubmit(onSendNewPass)}>

                        <div className="form-control gap-2 my-4">

                            <Input
                                type="password"
                                placeholder="Nowe hasło"
                                name="newPass"
                                additionalClasses="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"
                            />
                            <span
                                className="text-xs text-primary mb-2 text-left">{formState.errors.newPass?.message}</span>

                            <Input
                                type="password"
                                placeholder="Powtórz nowe hasło"
                                name="confirmNewPass"
                                additionalClasses="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"
                            />
                            <span
                                className="text-xs text-primary text-left">{formState.errors.confirmNewPass?.message}</span>
                        </div>
                        <div className="items-center flex flex-row place-content-between align-middle mt-6">
                            <button
                                className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                                Zmień hasło
                            </button>
                        </div>
                    </form>
                </FormProvider>

            </div>
        </div>
    </div>
};