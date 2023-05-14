import React, {useContext, useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {UserContext} from "../contexts/user.context";
import {Loader} from "../components/common/Loader";
import {HrMainDisplay} from "../components/HrViewElements/HrMainDisplay";
import {HrViewMode} from "../types/HrViewMode";
import {AvailableStudentsResponse} from "../types/AvailableStudentsResponse";
import {StudentToInterview} from "../../../headhunter-back/src/types/student";
import {Message} from "../components/common/Message";
import {useModal} from "../hooks/useModal";

export const HrDashboardView = () => {
    const [viewMode, setViewMode] = useState<HrViewMode>(HrViewMode.AvailableStudents);
    const {user} = useContext(UserContext);
    const {fetchApi, apiLoading, apiError, data} = useFetch();
    const {setModal} = useModal()

    const handleViewMode = (viewMode: HrViewMode) => {
        setViewMode(viewMode)
    }

    useEffect(() => {
        (async () => {
            if (apiError) return;
            viewMode === HrViewMode.StudentsToInterview
                ? await fetchApi(user, `http://localhost:3000/hr/interview`, "GET", "Wystąpił błąd ładowania danych")
                : await fetchApi(user, `http://localhost:3000/hr/available`, "GET", "Wystąpił błąd ładowania danych")
        })();
    }, [viewMode]);

    if (apiError) {
        setModal({modal: <Message type={"error"} body={apiError}/>});
        return null
    }

    if (apiLoading) return <Loader/>

    if (data && viewMode === HrViewMode.AvailableStudents)
        return <HrMainDisplay handleViewMode={handleViewMode}
                              studentList={data as AvailableStudentsResponse[]}
                              viewMode={viewMode}/>

    if (data && viewMode === HrViewMode.StudentsToInterview)
        return <HrMainDisplay handleViewMode={handleViewMode}
                              studentList={data as StudentToInterview[]}
                              viewMode={viewMode}/>
    return null
};