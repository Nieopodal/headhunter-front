import React, {useContext} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {SmallFormContainer} from "../../../components/common/SmallFormContainer";
import {UserContext} from "../../../contexts/user.context";
import {useFetch} from "../../../hooks/useFetch";
import {Input} from "../../../components/common/Form/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {apiUrl} from "../../../config/api";
import {Loader} from "../../../components/common/Loader";
import {ResponseParagraph} from "../../../components/common/ResponseParagraph";
import {validationSchema} from "./validation-schema";

interface FormData {
    fullName: string;
    email: string;
    company: string;
    maxReservedStudents: number;
}

interface ApiData {
    id: string;
}

export const AdminAddHrView = () => {
    const {user} = useContext(UserContext);
    const {fetchApi, apiError, data: apiData, apiLoading} = useFetch();
    const schema = validationSchema();

    const methods = useForm<FormData>({
        defaultValues: {},
        resolver: yupResolver(schema),
    });

    const {handleSubmit, formState: {errors}} = methods;

    const formSubmitHandler = async (data: FormData) => {
        await fetchApi(user, `${apiUrl}/admin/hr/create`, "POST", "Wystąpił nieznany błąd.", data, true, "application/json");
    };

    if (apiLoading) return <Loader/>

    return <SmallFormContainer
        title="Dodawanie pojedynczej osoby HR"
        description="Wypełnij poniższe pola, aby dodać headhunterów lub osoby z działu HR"
    >
        <form className="flex flex-col gap-8 mb-10 justify-items-start"
              onSubmit={handleSubmit(data => formSubmitHandler(data))}>
            <FormProvider {...methods}>
                <div className="flex flex-col">
                    <Input type="text" name="fullName" placeholder="Imię i nazwisko"/>
                    {errors?.fullName && <ResponseParagraph text={errors.fullName.message as string}/>}
                </div>
                <div className="flex flex-col">
                    <Input type="email" name="email" placeholder="E-mail"/>
                    {errors?.email && <ResponseParagraph text={errors.email.message as string}/>}
                </div>
                <div className="flex flex-col">
                    <Input type="text" name="company" placeholder="Nazwa firmy"/>
                    {errors?.company && <ResponseParagraph text={errors.company.message as string}/>}
                </div>
                <div className="flex flex-col">
                    <Input type="number"
                           name="maxReservedStudents"
                           placeholder="Maksymalna liczba osób do interview jednocześnie"
                           min={0}
                           max={999}
                    />
                    {errors?.maxReservedStudents &&
                        <ResponseParagraph text={errors.maxReservedStudents.message as string}/>}
                </div>

                {apiError && <p className="text-red-500">{apiError}</p>}
                {((apiData as ApiData) && !apiError) &&
                    <ResponseParagraph isSuccess
                                       text={`Pomyślnie dodano nową osobę HR o ID: ${(apiData as ApiData).id}`}/>
                }
                <button className="btn-md w-full btn-primary normal-case font-normal text-base">Dodaj osobę HR</button>
            </FormProvider>
        </form>
    </SmallFormContainer>
};