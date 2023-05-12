import React, {useContext} from "react";
import {AvailableStudentsResponse} from "src/types/AvailableStudentsResponse";
import {StudentToInterview} from "../../../../headhunter-back/src/types/student";
import {HrViewMode} from "../../types/HrViewMode";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";
import {apiUrl} from "../../config/api";
import {useModal} from "../../hooks/useModal";
import {SuccessMessage} from "../common/SuccessMessage";
import {ErrorMessage} from "../common/ErrorMessage";
import {useNavigate} from "react-router-dom";


type Props = {
    viewMode: HrViewMode,
    studentData: AvailableStudentsResponse | StudentToInterview,
    handleViewMode: (viewMode: HrViewMode) => void;
}

export const SingleStudentTitleBar = ({studentData, viewMode, handleViewMode}: Props) => {

    const navigate = useNavigate();
    const {fetchApi, apiError} = useFetch();
    const {user} = useContext(UserContext);
    const {setModal} = useModal();

    const firstName = ("student_first_name" in studentData) ? studentData.student_first_name : studentData.firstName;
    const lastName = ("student_last_name" in studentData) ? studentData.student_last_name : studentData.lastName;
    const reservationTime = ("reservationTime" in studentData) ? studentData.reservationTime : new Date();
    const pictureUrl = ("pictureUrl" in studentData) ? studentData.pictureUrl : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    const studentId = ("student_id" in studentData) ? studentData.student_id : studentData.id;
    const userFullName = `${firstName} ${lastName}`;
    const userShortName = `${firstName} ${lastName.slice(0, 1).concat('.')}`;

    const handleStudent = async (viewMode: HrViewMode, firstName: string, lastName: string, path: string, message: string) => {
        await fetchApi(user, `${apiUrl}/hr/${path}/${studentId}`, "PATCH", "Błąd przy ładowaniu wybranego kursanta");

        setModal(<SuccessMessage
            message={`Kandydat ${firstName} ${lastName} ${message}`}/>)

        if (apiError) {
            setModal(<ErrorMessage error={apiError}/>)
        }
        handleViewMode(viewMode);
    }

    return (<>
        <div className="flex flex-row items-center gap-10">
            {viewMode === HrViewMode.StudentsToInterview ?
                <div className="flex flex-col">
                    <span className="text-sm font-normal">Rezerwacja do:</span>
                    <span
                        className="text-base font-bold">{new Intl.DateTimeFormat('pl').format(new Date(reservationTime))} r.</span>
                </div> : null}

            <div className="flex flex-row items-center gap-3">
                {viewMode === HrViewMode.StudentsToInterview ?
                    <label className="btn-circle cursor-pointer avatar items-center">
                        <div className="w-20 rounded-full">
                            <img src={`${pictureUrl}`} alt="user profile"/>
                        </div>
                    </label> : null}
                {viewMode === HrViewMode.AvailableStudents ? userShortName : userFullName}
            </div>

        </div>

        <div className="flex flex-row items-center gap-3 mr-14">
            {viewMode === HrViewMode.StudentsToInterview ? <>
                <button
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none"
                    onClick={() => navigate(`/student-cv/${studentId}`, {replace: true})}
                    >
                    Pokaż CV
                </button>

                <button
                    onClick={async () => handleStudent(HrViewMode.AvailableStudents, `${firstName}`, `${lastName}`, `withdraw`, `został przeniesiony do listy dostępnych`)}
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Brak zainteresowania
                </button>

                <button
                    onClick={async () => handleStudent(HrViewMode.AvailableStudents, `${firstName}`, `${lastName}`, `employed`, `został oznaczony jako zatrudniony`)}
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Zatrudniony
                </button>
            </> : null}

            {viewMode === HrViewMode.AvailableStudents ?
                <button
                    onClick={async () => handleStudent(HrViewMode.StudentsToInterview, `${firstName}`, `${lastName}`, `interview`, `został dodany do Twojej listy "Do rozmowy"`)}
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Zarezerwuj rozmowę
                </button> : null}
        </div>
    </>)
}