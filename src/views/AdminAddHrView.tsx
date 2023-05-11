import React, {useContext} from 'react';
import {SmallFormContainer} from "../components/common/SmallFormContainer";
import {UserContext} from "../contexts/user.context";
import {useFetch} from "../hooks/useFetch";
import * as yup from "yup";
import {Input} from "../components/common/Form/Input";

export const AdminAddHrView = () => {
    const {user} = useContext(UserContext);
    const {fetchApi, apiError, data: apiData, apiLoading} = useFetch();

    const validationSchema = yup.object({
        fullName: yup.string().min(3).max(70).required(),
        email: yup.string().min(3).max(255).required(),
        company: yup.string().min(2).max(150).required(),
        maxReservedStudents: yup.number().min(1).max(999).required(),
    });

    return <SmallFormContainer title="Dodawanie pojedynczej osoby HR"
                               description="Wypełnij poniższe pola, aby dodać headhunterów lub osoby z działu HR">
        <form className="flex flex-col gap-8 mb-10 justify-items-start">
            <Input type="text" name="fullName" placeholder="Imię i nazwisko"/>
            <Input type="email" name="email" placeholder="E-mail"/>
            <Input type="text" name="company" placeholder="Nazwa firmy"/>
            <Input type="number" name="maxReservedStudents" placeholder="Maksymalna liczba osób do interview jednocześnie"/>
            <button className="btn-md w-full btn-primary normal-case font-normal text-base">Dodaj osobę HR</button>
        </form>
    </SmallFormContainer>
};