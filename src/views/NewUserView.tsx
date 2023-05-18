import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {apiUrl} from "../config/api";
import {ConfirmResponse, ExpectedContractType, ExpectedTypeWork} from "types";
import {SmallFormContainer} from "../components/common/SmallFormContainer";
import {UserRole} from "../types/UserRole";
import {StudentCvForm} from "../components/StudentCvForm/StudentCvForm";

export const NewUserView = () => {
    const {role, id, token} = useParams();
    const {fetchApi, apiError} = useFetch();
    const [email, setEmail] = useState<string | null>(null);
    const [emailToken, setEmailToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await fetchApi(null, `${apiUrl}/auth/${role}/confirm/${id}/${token}`, "POST", "Wystąpił nieznany błąd");
            if (data) {
                setEmail((data as ConfirmResponse).email);
                setEmailToken((data as ConfirmResponse).emailToken);
            }
            setLoading(false);
        })();
    }, []);

    return <SmallFormContainer title='Aktywacja nowego użytkownika'
                               description={(loading || apiError) ? '' : "Aby aktywować konto uzupełnij poniższe pola."}
                               hideGoBack>
        {/*{loading && <Loader/>}*/}
        {/*{apiError && <ResponseParagraph text={apiError}/>}*/}

        {!loading && <>
            {role === UserRole.Student &&
                   <div className="lg:w-[100vw] xl:w-full"> <StudentCvForm innerToken={emailToken!} newUser studentData={{
                        student_courses: "",
                        student_bio: "",
                        student_can_take_apprenticeship: 1,
                        student_course_completion: 0,
                        student_course_engagement: 0,
                        student_education: "",
                        student_expected_salary: "",
                        student_expected_type_work: ExpectedTypeWork.DM,
                        student_expected_contract_type: ExpectedContractType.NONE,
                        student_first_name: "",
                        student_github_username: "",
                        student_id: "",
                        student_last_name: "",
                        student_months_of_commercial_exp: 0,
                        student_portfolio_urls: "",
                        student_project_urls: "",
                        student_scrum_project_urls: "",
                        student_project_degree: 0,
                        student_target_work_city: "",
                        student_team_project_degree: 0,
                        student_work_experience: "",
                        student_contact_number: "",
                        student_email: email!,
                    }}/>
                   </div>}

            {role === UserRole.Hr && <>

            </>}
        </>}
    </SmallFormContainer>
};