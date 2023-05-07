import {StudentCv} from "../../types/StudentCv";
import * as yup from 'yup';
import React, {useContext} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../common/Form/Input";
import {TitleOfSection} from "../CvSections/TitleOfSection";
import {BodyOfSection} from "../CvSections/BodyOfSection";
import {CategoryContainer} from "../CvSections/CategoryContainer";
import {arrayFromStringHandler} from "../../handlers/array-from-string-handler";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";
import {useNavigate} from "react-router-dom";
import {ExpectedContractType, ExpectedTypeWork } from "types";

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
    scrumProjectUrl1: string | null;
    scrumProjectUrl2: string | null;
    scrumProjectUrl3: string | null;
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
    const {fetchApi, apiError} = useFetch();
    const navigate = useNavigate();

    const validationSchema = yup.object({

        contactNumber: yup.number().integer().min(111111).max(9999999999999999999).required(),
        githubUsername: yup.string().min(3).max(255).required(),
        portfolioUrl1: yup.string().min(10).max(255).required(),
        portfolioUrl2: yup.string().max(255).notRequired(),
        projectUrl1: yup.string().min(10).max(255).required(),
        projectUrl2: yup.string().max(255).notRequired(),
        scrumProjectUrl1: yup.string().min(10).max(255).required(),
        scrumProjectUrl2: yup.string().min(10).max(255).required(),
        scrumProjectUrl3: yup.string().min(10).max(255).required(),
        expectedTypeWork: yup.string().required(),
        targetWorkCity: yup.string().min(2).max(60).required(),
        expectedContractType: yup.string().required(),
        monthsOfCommercialExp: yup.number().min(0).max(9999).required(),
        education: yup.string().max(1000),
        workExperience: yup.string().max(1000),
        courses: yup.string().max(1000),
        expectedSalary: yup.number().integer().min(0).max(9999999.99, 'Dostępne kwoty: 0 - 9999.99'),
        password: yup.string(),
        confirmPassword: yup.string().test('passwords-match', 'Hasła muszą się zgadzać.', function (value) {
            return this.parent.password === value
        }),
    });

    const methods = useForm<StudentFormData>({
        resolver: yupResolver(validationSchema),
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
            scrumProjectUrl1: arrayFromStringHandler(studentData.student_scrum_project_urls)[0],
            scrumProjectUrl2: arrayFromStringHandler(studentData.student_scrum_project_urls)[1],
            scrumProjectUrl3: arrayFromStringHandler(studentData.student_scrum_project_urls)[2],
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

    const {handleSubmit, register, formState: {errors}} = methods;

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
            scrumProjectUrls: [data.scrumProjectUrl1, data.scrumProjectUrl2, data.scrumProjectUrl3].filter(Boolean),
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
        await fetchApi(user, `http://localhost:3000/student/update`, "PATCH", "Wystąpił błąd", finalFormData, true, "application/json");
        if (!apiError) navigate('/dashboard', {replace: true});
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

                <CategoryContainer title="Nick w Github"  error={!!errors?.githubUsername}>
                    <Input type="text" name="githubUsername" additionalClasses="border-2 border-black" required
                           maxLength={50}/>
                </CategoryContainer>

                <CategoryContainer title="Telefon"  error={!!errors?.contactNumber}>
                    <Input type="number" name="contactNumber" additionalClasses="border-2 border-black" required
                           maxLength={20} minLength={6}/>
                </CategoryContainer>
            </BodyOfSection>

            {newUser && <>
                <TitleOfSection title="Ustaw hasło"/>
                <BodyOfSection additionalClasses="my-4">
                    <CategoryContainer title="Hasło"  error={!!errors?.password}>
                        <Input type="password" name="password" additionalClasses="border-2 border-black" required
                               minLength={7} maxLength={255}/>
                    </CategoryContainer>
                    <CategoryContainer title="Powtórz hasło"  error={!!errors?.confirmPassword}>
                        <Input type="password" name="confirmPassword" additionalClasses="border-2 border-black" required
                               minLength={7} maxLength={255}/>
                    </CategoryContainer>
                    {errors.confirmPassword && <CategoryContainer title="Błąd:">
                        <p className="flex flex-row text-red-500">{errors.confirmPassword?.message}</p>
                    </CategoryContainer>}
                </BodyOfSection>
            </>
            }

            <TitleOfSection title="Oczekiwanie w stosunku do zatrudnienia"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Preferowane miejsce pracy"  error={!!errors?.expectedTypeWork}>
                    <select {...register("expectedTypeWork")} defaultValue={studentData.student_expected_type_work}
                            className="h-10 bg-neutral input border-2 border-black" required>
                        <option value={ExpectedTypeWork.DM}>{ExpectedTypeWork.DM}</option>
                        <option value={ExpectedTypeWork.office}>{ExpectedTypeWork.office}</option>
                        <option value={ExpectedTypeWork.hybrid}>{ExpectedTypeWork.hybrid}</option>
                        <option value={ExpectedTypeWork.remote}>{ExpectedTypeWork.remote}</option>
                        <option value={ExpectedTypeWork.move}>{ExpectedTypeWork.move}</option>
                    </select>
                </CategoryContainer>

                <CategoryContainer title="Docelowe miasto, gdzie chce pracować kandydat"  error={!!errors?.targetWorkCity}>
                    <Input type="text" name="targetWorkCity" additionalClasses="border-2 border-black" required minLength={3} maxLength={60}/>
                </CategoryContainer>

                <CategoryContainer title="Oczekiwany typ kontraktu"  error={!!errors?.expectedContractType}>
                    <select {...register("expectedContractType")}
                            defaultValue={studentData.student_expected_contract_type}
                            className="h-10 bg-neutral input max-w-fit px-0 border-2 border-black">
                        <option value={ExpectedContractType.none}>{ExpectedContractType.none}</option>
                        <option value={ExpectedContractType.employ}>{ExpectedContractType.employ}</option>
                        <option value={ExpectedContractType.contract}>{ExpectedContractType.contract}</option>
                        <option value={ExpectedContractType.B2B}>{ExpectedContractType.B2B}</option>
                    </select>
                </CategoryContainer>

                <CategoryContainer title="Oczekiwane wynagrodzenie miesięczne netto [PLN]" error={!!errors?.expectedSalary}>
                    <Input type="number" name="expectedSalary" additionalClasses="border-2 border-black" min={0}
                           max={9999999.99}/>
                </CategoryContainer>

                <CategoryContainer title="Zgoda na odbycie miesięcznych praktyk/stażu na początek" justifyCenter>
                    <input type="checkbox" {...register("canTakeApprenticeship")} className="checkbox"/>
                </CategoryContainer>

                <CategoryContainer title="Komercyjne doświadczenie w programowaniu [miesiące]"  error={!!errors?.monthsOfCommercialExp}>
                    <Input type="number" name="monthsOfCommercialExp" additionalClasses="border-2 border-black" min={0}
                           max={9999} required/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Biografia"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  maxLength={400}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("bio")}
                                  defaultValue={studentData.student_bio}/>
            </BodyOfSection>

            <TitleOfSection title="Edukacja"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  maxLength={1000}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("education")}
                                  defaultValue={studentData.student_education}/>
            </BodyOfSection>

            <TitleOfSection title="Kursy"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  maxLength={1000}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("courses")}
                                  defaultValue={studentData.student_courses}/>
            </BodyOfSection>

            <TitleOfSection title="Doświadczenie zawodowe"/>
            <BodyOfSection additionalClasses="my-4">
                        <textarea rows={6}
                                  maxLength={1000}
                                  className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black" {...register("workExperience")}
                                  defaultValue={studentData.student_courses}/>
            </BodyOfSection>

            <TitleOfSection title="Portfolio"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Link główny:"  error={!!errors?.portfolioUrl1}>
                    <Input type="url" name="portfolioUrl1" additionalClasses="border-2 border-black" required
                           maxLength={255}/>
                </CategoryContainer>

                <CategoryContainer title="Link dodatkowy:"  error={!!errors?.portfolioUrl2}>
                    <Input type="url" name="portfolioUrl2" additionalClasses="border-2 border-black" maxLength={255}/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Projekt w zespole Scrumowym"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Link do repozytorium:"  error={!!errors?.scrumProjectUrl1}>
                    <Input type="url" name="scrumProjectUrl1" additionalClasses="border-2 border-black" required
                           maxLength={255}/>
                </CategoryContainer>
                <CategoryContainer title="Link do kodu własnego (commity):" error={!!errors?.scrumProjectUrl2}>
                    <Input type="url" name="scrumProjectUrl2" additionalClasses="border-2 border-black" required
                           maxLength={255}/>
                </CategoryContainer>
                <CategoryContainer title="Link do code review:" error={!!errors?.scrumProjectUrl3}>
                    <Input type="url" name="scrumProjectUrl3" additionalClasses="border-2 border-black" required
                           maxLength={255}/>
                </CategoryContainer>
            </BodyOfSection>

            <TitleOfSection title="Projekt na zaliczenie"/>
            <BodyOfSection additionalClasses="my-4">
                <CategoryContainer title="Link 1:" error={!!errors?.projectUrl1}>
                    <Input type="url" name="projectUrl1" additionalClasses="border-2 border-black" required
                           maxLength={255}/>
                </CategoryContainer>
                <CategoryContainer title="Link dodatkowy:" error={!!errors?.projectUrl2}>
                    <Input type="url" name="projectUrl2" additionalClasses="border-2 border-black" maxLength={255}/>
                </CategoryContainer>
            </BodyOfSection>
            {apiError && <p className="font-bold text-red-500">{apiError}</p>}
            <button
                className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none mb-10">Zapisz
            </button>
        </FormProvider>
    </form>
};