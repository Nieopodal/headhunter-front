import {useContext, useEffect} from "react";
import {useFetch} from "../hooks/useFetch";
import {UserContext} from "../contexts/user.context";
import {StudentCvInfo} from "../components/StudentCv/StudentCvInfo";
import {StudentCv} from "../types/StudentCv";

export const StudentDashboardView = () => {
    const {user} = useContext(UserContext);
    const {fetchApi, apiError, data} = useFetch();
    useEffect(() => {
        (async () => {
            await fetchApi(user, `http://localhost:3000/student/cv/${user?.id}`, "GET", "Wystąpił błąd");
        })();
    },[]);

    if (apiError) return <p>Wystąpił błąd: {apiError}</p>

    if (data) return <StudentCvInfo studentData={data as StudentCv}  />

     return <p>Ładowanie...</p>
};