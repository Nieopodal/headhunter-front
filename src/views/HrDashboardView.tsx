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

type PaginatedResponse = {
    studentData: AvailableStudentsResponse[] | StudentToInterview[],
    totalPages: number
}

export const HrDashboardView = () => {
    const [viewMode, setViewMode] = useState<HrViewMode>(HrViewMode.AvailableStudents);
    const [currentPageNr, setCurrentPageNr] = useState(1);
    const [totalPagesNr, setTotalPagesNr] = useState(0);
    const [maxStudentsPerPage, setMaxStudentsPerPage] = useState(10);
    const {user} = useContext(UserContext);
    const {fetchApi, apiLoading, apiError, data} = useFetch();
    const {setModal} = useModal()

    const handleViewMode = (viewMode: HrViewMode) => {
        setViewMode(viewMode)
        setCurrentPageNr(1)
    }

    const setMaxPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setMaxStudentsPerPage(Number(e.target.value));
    }

    const prevPage = () => {
        if (currentPageNr === 1) {
            return
        } else setCurrentPageNr(prev => prev - 1)
    }

    const nextPage = () => {
        if (currentPageNr === totalPagesNr) {
            return
        } else setCurrentPageNr(prev => prev + 1)
    }

    useEffect(() => {
        (async () => {

            const list = viewMode === HrViewMode.StudentsToInterview ? 'interview' : 'available'
            const res = await fetchApi(user, `http://localhost:3000/hr/${list}/${currentPageNr}/${maxStudentsPerPage}`, "GET", "Wystąpił błąd ładowania danych");
            setTotalPagesNr((res as PaginatedResponse).totalPages)

        })();

    }, [viewMode, currentPageNr, maxStudentsPerPage]);

    if (apiError) {
        setModal({modal: <Message type={"error"} body={apiError}/>});
        return null
    }

    if (apiLoading) return <Loader/>

    if (data) {
        return <HrMainDisplay handleViewMode={handleViewMode}
                              studentList={(data as PaginatedResponse).studentData}
                              currentPageNr={currentPageNr}
                              totalPagesNr={(data as PaginatedResponse).totalPages}
                              setMaxPerPage={setMaxPerPage}
                              prevPage={prevPage}
                              nextPage={nextPage}
                              maxStudentsPerPage={maxStudentsPerPage}
                              viewMode={viewMode}/>
    }
    return null
};