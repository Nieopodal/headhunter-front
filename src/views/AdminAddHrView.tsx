import React from 'react';
import {SmallFormContainer} from "../components/common/SmallFormContainer";

export const AdminAddHrView = () => {

    return <SmallFormContainer title="Dodawanie pojedynczej osoby HR"
                               description="Wypełnij poniższe pola, aby dodać headhunterów lub osoby z działu HR">
        <form className="flex flex-col gap-8 mb-10 justify-items-start">
            <input type="text" placeholder="E-mail" className="input input-bordered input-md"/>
            <input type="text" placeholder="Imię i nazwisko" className="input input-bordered input-md"/>
            <input type="text" placeholder="Nazwa firmy" className="input input-bordered input-md"/>
            <input type="number" placeholder="Maksymalna liczba osób do interview jednocześnie"
                   className="input input-bordered input-md" max={999}/>
            <button className="btn-md w-full btn-primary normal-case font-normal text-base">Dodaj osobę HR</button>
        </form>
    </SmallFormContainer>
};