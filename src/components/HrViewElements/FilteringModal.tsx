import React from "react";
import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {useModal} from "../../hooks/useModal";
import {DegreeField} from "./DegreeField";
import {FilteringOptionButton} from "./FilteringOptionButton";
import {FilteringSalaryField} from "./FilteringSalaryField";
import {hrFilterSchema} from "../../helpers/hrFilterSchema";
import {FilteringNumericalInput} from "./FilteringNumericalInput";
import {HrFilteringCriteria} from "../../types/HrFilteringCriteria";
import {FilteringButtonsSection} from "./FilteringButtonsSection";

type Props = {
    handleFiltering: (data: HrFilteringCriteria) => void;
}

export const FilteringModal = (props: Props) => {

    const {...methods} = useForm<HrFilteringCriteria>({
        resolver: yupResolver(hrFilterSchema)
    });

    const onFilterSearchSubmit = (data: HrFilteringCriteria) => props.handleFiltering(data);

    const {unSetModal} = useModal();

    return (

        <div className="flex flex-col items-start justify-between gap-10">
            <div className="flex flex-row justify-between align-middle w-full">
                <h1
                    className="text-3xl font-bold text-base-content">
                    Filtrowanie
                </h1>
                <button
                    onClick={() => {
                        methods.reset()
                    }}
                    className="z-10 w-1/8 btn-sm h-7 bg-[#172A35] normal-case font-normal text-base rounded-none">
                    Wyczyść wszystkie
                </button>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onFilterSearchSubmit)}
                      className="flex flex-col w-full gap-3 leading-tight">

                    {/* NUMERICAL INPUTS */}
                    <DegreeField
                        errorMsg={methods.formState.errors.courseCompletion?.message}
                        registerName={"courseCompletion"}
                        title="Min. ocena przejścia kursu"/>
                    <DegreeField
                        errorMsg={methods.formState.errors.courseEngagment?.message}
                        registerName={"courseEngagment"}
                        title="Min. ocena aktywności i zaangażowania na kursie"/>
                    <DegreeField
                        errorMsg={methods.formState.errors.projectDegree?.message}
                        registerName={"projectDegree"}
                        title="Min. ocena kodu w projekcie własnym"/>
                    <DegreeField
                        errorMsg={methods.formState.errors.teamProjectDegree?.message}
                        registerName={"teamProjectDegree"}
                        title="Min. ocena pracy w zespole w Scrum"/>

                    {/* SECTION WITH BUTTONS #1 */}
                    <div className="flex flex-col items-start gap-2 mt-5">
                        <FilteringButtonsSection
                            title="Preferowane miejsce pracy"
                            errorMsg={methods.formState.errors.expectedTypeWork?.message}>
                            <>
                                <FilteringOptionButton
                                    registerName={"expectedTypeWork"}
                                    title={"Praca zdalna"}
                                    value={"remote"}/>
                                <FilteringOptionButton
                                    registerName={"expectedTypeWork"}
                                    title={"Praca w biurze"}
                                    value={"office"}/></>
                        </FilteringButtonsSection>
                    </div>

                    {/* SECTION WITH BUTTONS #2 */}
                    <div className="flex flex-col items-start gap-2 mt-5">
                        <FilteringButtonsSection
                            title="Oczekiwany typ kontraktu"
                            errorMsg={methods.formState.errors.expectedContractType?.message}>
                            <>
                                <FilteringOptionButton
                                    registerName={"expectedContractType"}
                                    title={"Umowa o pracę"}
                                    value={"employ"}/>
                                <FilteringOptionButton
                                    registerName={"expectedContractType"}
                                    title={"B2B"}
                                    value={"b2b"}/>
                                <FilteringOptionButton
                                    registerName={"expectedContractType"}
                                    title={"Umowa o dzieło / zlecenie"}
                                    value={"contract"}/></>
                        </FilteringButtonsSection>
                    </div>

                    {/* NUMERIC INPUT SECTION #1 */}
                    <div className="flex flex-col items-start gap-2 mt-5">
                        <span>Oczekiwane wynagrodzenie miesięczne netto </span>
                        <div className="flex flex-row gap-3 items-center">
                            Od <FilteringSalaryField registerName={"minSalary"} placeholder="Np. 1000"/>
                            do <FilteringSalaryField registerName={"maxSalary"} placeholder="Np. 7000"/>
                            {(methods.formState.errors.minSalary || methods.formState.errors.maxSalary) &&
                                <span className="flex flex-col text-xs text-primary ml-6">
                                    <span>{methods.formState.errors.minSalary?.message}</span>
                                    <span>{methods.formState.errors.maxSalary?.message}</span>
                                </span>}
                        </div>
                    </div>

                    {/* SECTION WITH A TOGGLE SWITCH */}
                    <div className="mt-3">
                        <label className="label cursor-pointer justify-start gap-5">
                            <span className="">Zgoda na odbycie bezpłatnych praktyk/stażu na początek</span>
                            <input
                                type="checkbox" {...methods.register('canTakeApprenticeship')}
                                style={{borderRadius: "20px"}}
                                className="toggle toggle-primary"
                                defaultChecked={false}/>
                        </label>
                    </div>

                    {/* NUMERIC INPUT SECTION #2 */}
                    <div className="flex flex-col items-start gap-2 mt-3">
                        <span>Ilość miesięcy doświadczenia komercyjnego kandydata w programowaniu</span>
                        <div className="flex flex-row gap-3 items-center">
                            <FilteringNumericalInput registerName={`monthsOfCommercialExp`} placeholder={`Np. 3`}
                                                     min={"0"}/>
                            <span
                                className="text-xs text-primary ml-6">
                                {methods.formState.errors.monthsOfCommercialExp?.message}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row w-full items-center justify-end gap-3">
                    <span onClick={unSetModal}
                          className="flex items-center align-middle px-5 z-10 w-1/8 h-9 normal-case font-normal text-base rounded-none cursor-pointer hover:bg-base-100">
                        Anuluj
                    </span>

                        <button
                            className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                            Pokaż wyniki
                        </button>
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}