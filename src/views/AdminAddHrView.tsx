import React from 'react';
import {GoBack} from "../components/common/GoBack";
import {DashboardContainer} from "../components/common/DashboardContainer";

export const AdminAddHrView = () => {

    return <DashboardContainer>
        <div className="flex flex-col items-center justify-start w-full mt-10">
            <div className="">
                <div className="mb-7"><GoBack/></div>
                <div className="flex flex-col">
                    <div className="flex flex-col justify-start mb-10">
                        <h1 className="text-2xl font-bold">Dodawanie pojedynczej osoby HR</h1>
                        <p className="text-base font-normal">Wypełnij poniższe pola, aby dodać headhunterów lub osoby z działu HR</p>
                    </div>

                    <div>
                        <form className="flex flex-col gap-8 mb-10 justify-items-start">

                            <input type="text" placeholder="E-mail" className="input input-bordered input-md"/>

                            <input type="text" placeholder="Imię i nazwisko" className="input input-bordered input-md"/>

                            <input type="text" placeholder="Nazwa firmy" className="input input-bordered input-md"/>

                            <input type="number" placeholder="Maksymalna liczba osób do interview jednocześnie" className="input input-bordered input-md" max={999}/>

                        </form>

                        <button className="btn-md w-full btn-primary normal-case font-normal text-base">Dodaj osobę HR</button>
                    </div>
                </div>
            </div>
        </div>

    </DashboardContainer>
};