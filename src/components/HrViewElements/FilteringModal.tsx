import React, {useContext} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider, useForm} from 'react-hook-form';
import {useModal} from "../../hooks/useModal";
import {DegreeField} from "./DegreeField";
import {FilteringOptionButton} from "./FilteringOptionButton";
import {validationSchema} from "./validation-schema";
import {HrFilteringCriteria} from "../../types/HrFilteringCriteria";
import {FilteringButtonsSection} from "./FilteringButtonsSection";
import {apiUrl} from "../../config/api";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";
import {Message} from "../common/Message";
import {HrFilteringContext} from "../../contexts/hr.filtering.context";
import {FilteringOff} from "./FilteringOff";
import {SalaryRange} from "./SalaryRange";
import {ApprenticeshipToggle} from "./ApprenticeshipToggle";
import {HowMuchCommercialExp} from "./HowMuchCommercialExp";
import {FilteringModalControls} from "./FilteringModalControls";

export const FilteringModal = () => {

    const {setIsFiltering, currentFilters, setCurrentFilters} = useContext(HrFilteringContext)

    const {...methods} = useForm<HrFilteringCriteria>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            courseCompletion: currentFilters?.courseCompletion,
            courseEngagement: currentFilters?.courseEngagement,
            canTakeApprenticeship: currentFilters?.canTakeApprenticeship,
            expectedContractType: currentFilters?.expectedContractType,
            maxSalary: currentFilters?.maxSalary,
            minSalary: currentFilters?.minSalary,
            monthsOfCommercialExp: currentFilters?.monthsOfCommercialExp,
            expectedTypeWork: currentFilters?.expectedTypeWork,
            projectDegree: currentFilters?.projectDegree,
            teamProjectDegree: currentFilters?.teamProjectDegree,
        }
    });

    const {fetchApi, apiError} = useFetch();
    const {user} = useContext(UserContext);
    const {unSetModal, setModal} = useModal();

    const onFilterSearchSubmit = async (filters: HrFilteringCriteria) => {
        const res = await fetchApi(user, `${apiUrl}/hr/set-filter/`, "POST", "Wystąpił błąd przy próbie zastosowania filtrów", filters, true, "application/json");

        if (res) {
            setCurrentFilters(filters);
            setIsFiltering(true);
            unSetModal();
        }

        if (apiError) {
            setModal({modal: <Message type={"error"} body={apiError}/>});
            return;
        }
    };

    const handleFilterOff = async () => {
        methods.reset();
        await fetchApi(user, `${apiUrl}/hr/remove-filter/`, "GET", "Wystąpił błąd przy anulowaniu filtrów");
        setCurrentFilters(null);
        setIsFiltering(false);
        unSetModal();
    };

    return <div className="flex flex-col items-start justify-between gap-10 max-w-[550px] h-fit h-fit">
        <FilteringOff handleFilterOff={handleFilterOff}/>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onFilterSearchSubmit)}
                  className="flex flex-col w-full gap-3 leading-tight">

                <DegreeField
                    errorMsg={methods.formState.errors.courseCompletion?.message}
                    registerName={"courseCompletion"}
                    title="Min. ocena przejścia kursu"/>
                <DegreeField
                    errorMsg={methods.formState.errors.courseEngagement?.message}
                    registerName={"courseEngagement"}
                    title="Min. ocena aktywności i zaangażowania na kursie"/>
                <DegreeField
                    errorMsg={methods.formState.errors.projectDegree?.message}
                    registerName={"projectDegree"}
                    title="Min. ocena kodu w projekcie własnym"/>
                <DegreeField
                    errorMsg={methods.formState.errors.teamProjectDegree?.message}
                    registerName={"teamProjectDegree"}
                    title="Min. ocena pracy w zespole w Scrum"/>

                <FilteringButtonsSection
                    title="Preferowane miejsce pracy"
                    errorMsg={methods.formState.errors.expectedTypeWork?.message}>
                    <>
                        <FilteringOptionButton
                            registerName={"expectedTypeWork"}
                            title={"Praca zdalna"}
                            value={"Praca zdalna"}/>
                        <FilteringOptionButton
                            registerName={"expectedTypeWork"}
                            title={"Praca w biurze"}
                            value={"Na miejscu"}/>
                        <FilteringOptionButton
                            registerName={"expectedTypeWork"}
                            title={"Praca hybrydowa"}
                            value={"Praca hybrydowa"}/>
                        <FilteringOptionButton
                            registerName={"expectedTypeWork"}
                            title={"Przeprowadzka"}
                            value={"Przeprowadzka"}/>
                        <FilteringOptionButton
                            registerName={"expectedTypeWork"}
                            title={"Nie ma znaczenia"}
                            value={"Nie ma znaczenia"}/>
                    </>
                </FilteringButtonsSection>

                <FilteringButtonsSection
                    title="Oczekiwany typ kontraktu"
                    errorMsg={methods.formState.errors.expectedContractType?.message}>
                    <>
                        <FilteringOptionButton
                            registerName={"expectedContractType"}
                            title={"Umowa o pracę"}
                            value={"Tylko umowa o pracę"}/>
                        <FilteringOptionButton
                            registerName={"expectedContractType"}
                            title={"B2B"}
                            value={"Możliwe B2B"}/>
                        <FilteringOptionButton
                            registerName={"expectedContractType"}
                            title={"Umowa zlecenie / o dzieło"}
                            value={"Umowa zlecenie / dzieło"}/>
                        <FilteringOptionButton
                            registerName={"expectedContractType"}
                            title={"Brak preferencji"}
                            value={"Brak preferencji"}/></>
                </FilteringButtonsSection>

                <SalaryRange/>

                <ApprenticeshipToggle/>

                <HowMuchCommercialExp/>

                <FilteringModalControls/>

            </form>
        </FormProvider>
    </div>
};