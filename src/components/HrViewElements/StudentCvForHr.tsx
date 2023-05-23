import {useParams} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/user.context";
import {useFetch} from "../../hooks/useFetch";
import {apiUrl} from "../../config/api";
import {Loader} from "../common/Loader";
import {ResponseParagraph} from "../common/ResponseParagraph";
import {StudentCvInfo} from "../StudentCv/StudentCvInfo";
import {StudentCv} from "../../types/StudentCv";
import {SideMenu} from "../common/SideMenu";
import {StudentSummary} from "../StudentSummary/StudentSummary";
import {GoBack} from "../common/GoBack";

export const StudentCvForHr = () => {
    const {studentId} = useParams();
    const {user} = useContext(UserContext);
    const {fetchApi, data: apiData, apiLoading, apiError} = useFetch();

    useEffect(() => {
        (async () => {
            await fetchApi(user, `${apiUrl}/hr/interview/cv/${studentId}`, "GET", "Wystąpił nieznany błąd");
        })();
    }, []);

    if (apiError) return <div className="mx-auto w-fit my-10">
        <ResponseParagraph text={apiError}/>
    </div>

    if (apiData) return <div className="flex flex-row justify-center items-center w-full mt-2">
        <div className="xl:flex block xl:flex-row w-full xl:w-full 2xl:w-[1500px]">
            <SideMenu>
                <StudentSummary
                    firstName={(apiData as StudentCv).student_first_name}
                    lastName={(apiData as StudentCv).student_last_name}
                    avatarUrl={(apiData as StudentCv).student_github_username ? `https://github.com/${(apiData as StudentCv).student_github_username}.png` : ""}
                    githubName={(apiData as StudentCv).student_github_username}
                    phone={(apiData as StudentCv).student_contact_number}
                    email={(apiData as StudentCv).student_email}
                    about={(apiData as StudentCv).student_bio}
                />
                <div className="mx-auto w-fit mt-4 sm:hidden xl:block"><GoBack/></div>
            </SideMenu>

            <div className="w-full mx-2">
                <div className=" w-fit my-4 hidden sm:block xl:hidden"><GoBack/></div>
                <StudentCvInfo studentData={apiData as StudentCv}/>
            </div>
        </div>
    </div>

    return <>
        {apiLoading && <Loader/>}
    </>
};