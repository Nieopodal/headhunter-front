import {StudentCv} from "../../types/StudentCv";
import React, {useContext} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider, useForm} from "react-hook-form";
import {arrayFromStringHandler} from "../../handlers/array-from-string-handler";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";
import {useNavigate} from "react-router-dom";
import {StudentCvFormSections} from "./StudentCvFormSections";
import {apiUrl} from "../../config/api";
import {Message} from "../common/Message";
import {useModal} from "../../hooks/useModal";
import {StudentFormData} from "../../types/StudentFormData";
import {validationSchema} from "./validation-schema";

interface Props {
    studentData: StudentCv;
    newUser?: boolean;
    innerToken?: string;
}

export const StudentCvForm = ({studentData, newUser, innerToken}: Props) => {
    const {setModal} = useModal();
    const {user, setRerender} = useContext(UserContext);
    const {fetchApi, apiError} = useFetch();
    const navigate = useNavigate();

    const validationRules = validationSchema(Boolean(newUser));

    const methods = useForm<StudentFormData>({
        resolver: yupResolver(validationRules),
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

    const {handleSubmit} = methods;

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
                firstName: data.firstName,
                lastName: data.lastName,
            };
        } else {
            finalFormData = {
                ...initFormData,
            };
        }
        const responseData = await fetchApi(newUser ? null : user, `${newUser ? `${apiUrl}/student/register` : `${apiUrl}/student/update`}`, "PATCH", "Wystąpił błąd", finalFormData, true, "application/json", innerToken ?? undefined);
        if (responseData) {
            setModal({modal: <Message type={"success"} body={"Zmiany zostały zapisane"}/>});
            navigate(newUser ? '/' : '/dashboard', {replace: true})
        }
        setRerender();
    };

    return <form onSubmit={handleSubmit(formSubmitHandler)}>
        <h2 className="mx-auto w-fit text-2xl font-bold my-6">{newUser ? "Dane kursanta" : "Edycja danych"}</h2>
        <FormProvider {...methods}>

            <StudentCvFormSections studentData={studentData} newUser={newUser}/>

            {apiError && <p className="font-bold text-red-500">Nieudana próba zapisania danych: {apiError}</p>}
            <button
                className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none mb-10">Zapisz
            </button>
        </FormProvider>
    </form>
};