import React, {useContext} from "react";
import {AvailableStudent, StudentToInterview} from "@Types";
import {HrViewMode} from "../../types/HrViewMode";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";
import {apiUrl} from "../../config/api";
import {useModal} from "../../hooks/useModal";
import {Message} from "../common/Message";
import {useNavigate} from "react-router-dom";
import {ModalPosition} from "../../types/ModalPosition";


type Props = {
    viewMode: HrViewMode,
    studentData: AvailableStudent | StudentToInterview,
    handleViewMode: (viewMode: HrViewMode) => void;
}

export const SingleStudentTitleBar = ({studentData, viewMode, handleViewMode}: Props) => {

    const navigate = useNavigate();
    const {fetchApi, apiError} = useFetch();
    const {user} = useContext(UserContext);
    const {setModal} = useModal();

    const {firstName, lastName, id: studentId} = studentData;
    const pictureUrl = (("githubUsername" in studentData) && studentData.githubUsername !== "") ? `https://github.com/${studentData.githubUsername}.png` : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

    const reservationTime = ("reservationTime" in studentData) ? studentData.reservationTime : new Date();

    const userFullName = `${firstName} ${lastName}`;
    const userShortName = `${firstName} ${lastName.slice(0, 1).concat('.')}`;

    const handleStudent = async (viewMode: HrViewMode, firstName: string, lastName: string, path: string, message: string) => {
        await fetchApi(user, `${apiUrl}/hr/${path}/${studentId}`, "PATCH", "Błąd przy ładowaniu wybranego kursanta");

        if (apiError) {
            setModal({modal: <Message type={"error"} body={apiError}/>});
            return
        }

        setModal({
            modal:
                <Message
                    type={"success"}
                    body={`Kandydat ${firstName} ${lastName} ${message}`}/>,
            position: ModalPosition.top,
            timer: 5,
        })
        handleViewMode(viewMode);
    }

    return <>
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
                    className="z-10 w-1/8 btn-sm max-lg:leading-none max-lg:text-sm h-9 btn-primary normal-case font-normal text-base rounded-none"
                    onClick={() => navigate(`/student-cv/${studentId}`, {replace: true})}
                >
                    Pokaż CV
                </button>

                <button
                    onClick={async () => handleStudent(HrViewMode.AvailableStudents, `${firstName}`, `${lastName}`, `withdraw`, `został przeniesiony do listy dostępnych`)}
                    className="z-10 w-1/8 btn-sm max-lg:leading-none max-lg:text-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Brak zainteresowania
                </button>

                <button
                    onClick={async () => handleStudent(HrViewMode.AvailableStudents, `${firstName}`, `${lastName}`, `employed`, `został oznaczony jako zatrudniony`)}
                    className="z-10 w-1/8 btn-sm max-lg:leading-none max-lg:text-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Zatrudniony
                </button>
            </> : null}

            {viewMode === HrViewMode.AvailableStudents ?
                <button
                    onClick={async () => handleStudent(HrViewMode.StudentsToInterview, `${firstName}`, `${lastName}`, `interview`, `został dodany do Twojej listy "Do rozmowy"`)}
                    className="z-10 w-1/8 btn-sm max-lg:leading-none max-lg:text-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Zarezerwuj rozmowę
                </button> : null}
        </div>
    </>
};