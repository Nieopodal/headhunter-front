import React, {useContext, useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch";
import {UserContext} from "../contexts/user.context";
import {Loader} from "../components/common/Loader";
import {HrMainDisplay} from "../components/HrViewElements/HrMainDisplay";
import {HrViewMode} from "../types/HrViewMode";
import {AvailableStudent, StudentToInterview} from "../../../headhunter-back/src/types/student";
import {Message} from "../components/common/Message";
import {useModal} from "../hooks/useModal";
import {apiUrl} from "../config/api";
import {HrFilteringContext} from "../contexts/hr.filtering.context";

type PaginatedResponse = {
    studentData: AvailableStudent[] | StudentToInterview[],
    totalPages: number
}

export const HrDashboardView = () => {
    const [viewMode, setViewMode] = useState<HrViewMode>(HrViewMode.AvailableStudents);
    const {isFiltering} = useContext(HrFilteringContext);
    const {user} = useContext(UserContext);
    const [currentPageNr, setCurrentPageNr] = useState(1);
    const [totalPagesNr, setTotalPagesNr] = useState(0);
    const [maxStudentsPerPage, setMaxStudentsPerPage] = useState(10);
    const [nameToSearch, setNameToSearch] = useState('')
    const {fetchApi, apiLoading, apiError, data} = useFetch();
    const {setModal} = useModal()

    const handleNameSearch = (name: string) => {
        setNameToSearch(name);
    }

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
            const res = await fetchApi(user, `${apiUrl}/hr/show-${list}/${currentPageNr}/${maxStudentsPerPage}/${nameToSearch}`, "GET", "Wystąpił błąd ładowania danych");
            setTotalPagesNr((res as PaginatedResponse).totalPages)

        })();

    }, [viewMode, currentPageNr, maxStudentsPerPage, nameToSearch, isFiltering]);

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
                           viewMode={viewMode}
                           handleNameSearch={handleNameSearch}
                           searchedName={nameToSearch}/>

    }
    return null
};