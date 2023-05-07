import {StudentCv} from "../../types/StudentCv";
import {Input} from "../common/Form/Input";
import React, {useContext} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {TitleOfSection} from "../CvSections/TitleOfSection";
import {BodyOfSection} from "../CvSections/BodyOfSection";
import {CategoryContainer} from "../CvSections/CategoryContainer";
import {arrayFromStringHandler} from "../../handlers/array-from-string-handler";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";

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
    portfolioUrl1: string | null;
    portfolioUrl2: string | null;
    projectUrl1: string | null;
    projectUrl2: string | null;
    bonusProjectUrl1: string | null;
    bonusProjectUrl2: string | null;
    bonusProjectUrl3: string | null;
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
    password?: string;
    confirmPassword?: string;
}

interface Props {
    studentData: StudentCv;
    newUser?: boolean;
}

export const StudentCvForm = ({studentData, newUser}: Props) => {
    const {user, setRerender} = useContext(UserContext);
    const {fetchApi, data: dataFromApi, apiError} = useFetch();

    const methods = useForm<StudentFormData>({
        defaultValues: {
            email: studentData.student_email,
            contactNumber: studentData.student_contact_number,
            firstName: studentData.student_first_name,
            lastName: studentData.student_last_name,
            githubUsername: studentData.student_github_username,
            portfolioUrl1: arrayFromStringHandler(studentData.student_portfolio_urls)[0],
            portfolioUrl2: arrayFromStringHandler(studentData.student_portfolio_urls)[1],
            projectUrl1: arrayFromStringHandler(studentData.student_project_urls)[0],
            projectUrl2: arrayFromStringHandler(studentData.student_project_urls)[1],
            bonusProjectUrl1: arrayFromStringHandler(studentData.student_bonus_project_urls)[0],
            bonusProjectUrl2: arrayFromStringHandler(studentData.student_bonus_project_urls)[1],
            bonusProjectUrl3: arrayFromStringHandler(studentData.student_bonus_project_urls)[2],
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
            password: "",
            confirmPassword: "",
        },
    });

    const {handleSubmit, register} = methods;

    const formSubmitHandler = async (data: StudentFormData) => {
        const initFormData = {
            contactNumber: data.contactNumber,
            githubUsername: data.githubUsername,
            bio: data.bio,
            expectedTypeWork: data.expectedTypeWork,
            targetWorkCity: data.targetWorkCity,
            expectedContractType: data.expectedContractType,
            expectedSalary: data.expectedSalary,
            canTakeApprenticeship: data.canTakeApprenticeship,
            monthsOfCommercialExp: data.monthsOfCommercialExp,
            education: data.education,
            workExperience: data.workExperience,
            courses: data.courses,
            portfolioUrls: [data.portfolioUrl1, data.portfolioUrl2].filter(Boolean),
            projectUrls: [data.projectUrl1, data.projectUrl2].filter(Boolean),
            bonusProjectUrls: [data.bonusProjectUrl1, data.bonusProjectUrl2, data.bonusProjectUrl3].filter(Boolean),
        };
        let finalFormData;
        if (newUser) {
            finalFormData = {
                ...initFormData,
                password: data.password,
            };
        } else {
            finalFormData = {
                ...initFormData,
            };
        }

        await fetchApi(user, `http://localhost:3000/student/update/${user?.id}`, "PATCH", "Wystąpił błąd", finalFormData, true, "application/json");

        setRerender();
    };

    return <form onSubmit={handleSubmit(data => formSubmitHandler(data))}>
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
                    <Input type="text" name="githubUsername" additionalClasses="border-2 border-black"/>
                </CategoryContainer>

                <CategoryContainer title="Telefon">
                    <Input type="tel" name="contactNumber" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
            </BodyOfSection>

            {newUser && <>
                <TitleOfSection title="Ustaw hasło"/>
                <BodyOfSection additionalClasses="my-4">
                    <CategoryContainer title="Hasło">
                        <Input type="password" name="password" additionalClasses="border-2 border-black"/>
                    </CategoryContainer>
                    <CategoryContainer title="Powtórz hasło">
                        <Input type="password" name="confirmPassword" additionalClasses="border-2 border-black"/>
                    </CategoryContainer>
                </BodyOfSection>
            </>
            }

            <TitleOfSection title="Oczekiwanie w stosunku do zatrudnienia"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Preferowane miejsce pracy">
                    <select {...register("expectedTypeWork")} value={studentData.student_expected_type_work}
                            className="h-10 bg-neutral input border-2 border-black">
                        <option value={ExpectedTypeWork.DM}>{ExpectedTypeWork.DM}</option>
                        <option value={ExpectedTypeWork.office}>{ExpectedTypeWork.office}</option>
                        <option value={ExpectedTypeWork.hybrid}>{ExpectedTypeWork.hybrid}</option>
                        <option value={ExpectedTypeWork.remote}>{ExpectedTypeWork.remote}</option>
                        <option value={ExpectedTypeWork.move}>{ExpectedTypeWork.move}</option>
                    </select>
                </CategoryContainer>

                <CategoryContainer title="Docelowe miasto, gdzie chce pracować kandydat">
                    <Input type="text" name="targetWorkCity" additionalClasses="border-2 border-black"/>
                </CategoryContainer>

                <CategoryContainer title="Oczekiwany typ kontraktu">
                    <select {...register("expectedContractType")} value={studentData.student_expected_contract_type}
                            className="h-10 bg-neutral input max-w-fit px-0 border-2 border-black">
                        <option value={ExpectedContractType.none}>{ExpectedContractType.none}</option>
                        <option value={ExpectedContractType.employ}>{ExpectedContractType.employ}</option>
                        <option value={ExpectedContractType.contract}>{ExpectedContractType.contract}</option>
                        <option value={ExpectedContractType.B2B}>{ExpectedContractType.B2B}</option>
                    </select>
                </CategoryContainer>

                <CategoryContainer title="Oczekiwane wynagrodzenie miesięczne netto [PLN]">
                    <Input type="text" name="expectedSalary" additionalClasses="border-2 border-black"/>
                </CategoryContainer>

                <CategoryContainer title="Zgoda na odbycie miesięcznych praktyk/stażu na początek" justifyCenter>
                    <input type="checkbox" {...register("canTakeApprenticeship")} className="checkbox"/>
                </CategoryContainer>

                <CategoryContainer title="Komercyjne doświadczenie w programowaniu [miesiące]">
                    <Input type="number" name="monthsOfCommercialExp" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Biografia"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("bio")}
                                  defaultValue={studentData.student_bio}/>
            </BodyOfSection>

            <TitleOfSection title="Edukacja"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("education")}
                                  defaultValue={studentData.student_education}/>
            </BodyOfSection>

            <TitleOfSection title="Kursy"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("courses")}
                                  defaultValue={studentData.student_courses}/>
            </BodyOfSection>

            <TitleOfSection title="Doświadczenie zawodowe"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("workExperience")}
                                  defaultValue={studentData.student_courses}/>
            </BodyOfSection>

            <TitleOfSection title="Portfolio"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Link główny:">
                    <Input type="url" name="portfolioUrl1" additionalClasses="border-2 border-black"/>
                </CategoryContainer>

                <CategoryContainer title="Link dodatkowy:">
                    <Input type="url" name="portfolioUrl2" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Projekt w zespole Scrumowym"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Link do repozytorium:">
                    <Input type="url" name="bonusProjectUrl1" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
                <CategoryContainer title="Link do kodu własnego (commity):">
                    <Input type="url" name="bonusProjectUrl2" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
                <CategoryContainer title="Link do code review:">
                    <Input type="url" name="bonusProjectUrl3" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Projekt na zaliczenie"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Link 1:">
                    <Input type="url" name="projectUrl1" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
                <CategoryContainer title="Link dodatkowy:">
                    <Input type="url" name="projectUrl2" additionalClasses="border-2 border-black"/>
                </CategoryContainer>
            </BodyOfSection>
            <button
                className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none mb-10">Zapisz
            </button>
        </FormProvider>
    </form>
};