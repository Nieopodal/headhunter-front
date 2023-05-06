import {StudentCv} from "../../types/StudentCv";
import {Input} from "../common/Form/Input";
import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {TitleOfSection} from "../CvSections/TitleOfSection";
import {BodyOfSection} from "../CvSections/BodyOfSection";
import {CategoryContainer} from "../CvSections/CategoryContainer";

export enum ExpectedTypeWork {
    office = 'Na miejscu',
    move = 'Przeprowadzka',
    remote = 'Praca zdalna',
    hybrid = 'Praca hybrydowa',
    DM = 'Nie ma znaczenia',
} //@TODO: remove and import from types, when BE is ready

export enum ExpectedContractType {
    B2B = 'Możliwe B2B',
    employ = 'Tylko umowa o pracę',
    contract = 'Umowa zlecenie / dzieło',
    none = 'Brak preferencji',
}//@TODO: remove and import from types, when BE is ready

interface StudentFormData {
    email: string;
    contactNumber: string;
    firstName: string;
    lastName: string;
    githubUsername: string;
    portfolioUrls: string[] | null;
    projectUrls: string[]  | null;
    bonusProjectUrls: string[]  | null;
    bio: string;
    expectedTypeWork: ExpectedTypeWork;
    targetWorkCity: string;
    expectedContractType: ExpectedContractType;
    expectedSalary: number;
    canTakeApprenticeship: boolean;
    monthsOfCommercialExp: number;
    education: string;
    workExperience: string;
    courses: string;
}

interface Props {
    studentData: StudentCv;
}

export const StudentCvForm = ({studentData}: Props) => {

    const methods = useForm<StudentFormData>({
        defaultValues: {
            email: studentData.student_email,
            contactNumber: studentData.student_contact_number,
            firstName: studentData.student_first_name,
            lastName: studentData.student_last_name,
            githubUsername: studentData.student_github_username,
            portfolioUrls: studentData.student_portfolio_urls,
            projectUrls: studentData.student_project_urls,
            bio: studentData.student_bio,
            expectedTypeWork: studentData.student_expected_type_work,
            targetWorkCity: studentData.student_target_work_city,
            expectedContractType: studentData.student_expected_contract_type,
            expectedSalary: Number(studentData.student_expected_salary),
            canTakeApprenticeship: Boolean(studentData.student_can_take_apprenticeship),
            monthsOfCommercialExp: studentData.student_months_of_commercial_exp,
            education: studentData.student_education,
            workExperience: studentData.student_work_experience,
            courses: studentData.student_courses,
        },
    });

    const {handleSubmit, register} = methods;

    return <form onSubmit={handleSubmit(data => console.log(data))}>
        <h2 className="mx-auto w-fit text-2xl font-bold my-6">Edycja danych</h2>
        <FormProvider {...methods}>

            <TitleOfSection title="Podstawowe dane"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="E-mail">
                    <Input type="email" name="email" disabled/>
                </CategoryContainer>

                <CategoryContainer title="Imię">
                    <Input type="text" name="firstName" disabled/>
                </CategoryContainer>

                <CategoryContainer title="Nazwisko">
                    <Input type="text" name="lastName" disabled/>
                </CategoryContainer>

                <CategoryContainer title="Nick w Github">
                    <Input type="text" name="githubUsername"/>
                </CategoryContainer>

                <CategoryContainer title="Telefon">
                    <Input type="tel" name="contactNumber"/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Oczekiwanie w stosunku do zatrudnienia"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Preferowane miejsce pracy">
                    <select {...register("expectedTypeWork")} value={studentData.student_expected_type_work}
                            className="h-10 bg-neutral input">
                        <option value={ExpectedTypeWork.DM}>{ExpectedTypeWork.DM}</option>
                        <option value={ExpectedTypeWork.office}>{ExpectedTypeWork.office}</option>
                        <option value={ExpectedTypeWork.hybrid}>{ExpectedTypeWork.hybrid}</option>
                        <option value={ExpectedTypeWork.remote}>{ExpectedTypeWork.remote}</option>
                        <option value={ExpectedTypeWork.move}>{ExpectedTypeWork.move}</option>
                    </select>
                </CategoryContainer>

                <CategoryContainer title="Docelowe miasto, gdzie chce pracować kandydat">
                    <Input type="text" name="targetWorkCity"/>
                </CategoryContainer>

                <CategoryContainer title="Oczekiwany typ kontraktu">
                    <select {...register("expectedContractType")} value={studentData.student_expected_contract_type}
                            className="h-10 bg-neutral input max-w-fit px-0">
                        <option value={ExpectedContractType.none}>{ExpectedContractType.none}</option>
                        <option value={ExpectedContractType.employ}>{ExpectedContractType.employ}</option>
                        <option value={ExpectedContractType.contract}>{ExpectedContractType.contract}</option>
                        <option value={ExpectedContractType.B2B}>{ExpectedContractType.B2B}</option>
                    </select>
                </CategoryContainer>

                <CategoryContainer title="Oczekiwane wynagrodzenie miesięczne netto [PLN]">
                    <Input type="text" name="expectedSalary"/>
                </CategoryContainer>

                <CategoryContainer title="Zgoda na odbycie miesięcznych praktyk/stażu na początek" justifyCenter>
                    <input type="checkbox" {...register("canTakeApprenticeship")} className="checkbox"/>
                </CategoryContainer>

                <CategoryContainer title="Komercyjne doświadczenie w programowaniu [miesiące]">
                    <Input type="number" name="monthsOfCommercialExp"/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Biografia"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base" {...register("bio")}
                                  defaultValue={studentData.student_bio}/>
            </BodyOfSection>

            <TitleOfSection title="Edukacja"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base" {...register("education")}
                                  defaultValue={studentData.student_education}/>
            </BodyOfSection>

            <TitleOfSection title="Kursy"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base" {...register("courses")}
                                  defaultValue={studentData.student_courses}/>
            </BodyOfSection>



                    {/*<label> portfolioUrls:*/}
                    {/*    <Input type="text" name="githubUsername" placeholder="Github nickname" disabled/>*/}
                    {/*</label>*/}
                    {/*<label> portfolioUrls:*/}
                    {/*    <Input type="text" name="githubUsername" placeholder="Github nickname" disabled/>*/}
                    {/*</label>*/}
                    {/*<label> portfolioUrls:*/}
                    {/*    <Input type="text" name="githubUsername" placeholder="Github nickname" disabled/>*/}
                    {/*</label>*/}


                    <button>Zapisz</button>

        </FormProvider>
    </form>
};