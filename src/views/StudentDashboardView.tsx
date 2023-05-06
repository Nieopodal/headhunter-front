import {useContext, useEffect} from "react";
import {useFetch} from "../hooks/useFetch";
import {UserContext} from "../contexts/user.context";
import {StudentCvInfo} from "../components/StudentCv/StudentCvInfo";
import {StudentCv} from "../types/StudentCv";
import {StudentCvForm} from "../components/StudentCvForm/StudentCvForm";

interface Props {
    showAsForm?: boolean;
}

export const StudentDashboardView = ({showAsForm}: Props) => {
    const {user} = useContext(UserContext);
    const {fetchApi, apiError, data} = useFetch();
    useEffect(() => {
        (async () => {
            await fetchApi(user, `http://localhost:3000/student/cv/${user?.id}`, "GET", "Wystąpił błąd");
        })();
    },[]);

    if (apiError) return <p>Wystąpił błąd: {apiError}</p>

    if (data && !showAsForm) return <StudentCvInfo studentData={data as StudentCv}  />
    if (data && showAsForm) return <StudentCvForm studentData={data as StudentCv}  />

     return <p>Ładowanie...</p>
};