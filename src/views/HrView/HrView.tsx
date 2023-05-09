import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {BiSearch} from "react-icons/bi";
import {FaFilter} from "react-icons/fa";
// import {SampleStudent, sampleStudents} from "../../helpers/sampleStudents";
import {HrViewMode} from "../../types/HrViewMode"
import {HrTab} from "./HrTab";
import {HrPagination} from "./HrPagination";
import {useModal} from '../../hooks/useModal'
import {FilteringModal} from "./FilteringModal";
import {HrFilteringCriteria} from "../../types/HrFilteringCriteria";
import {useFetch} from "../../hooks/useFetch";
import {UserContext} from "../../contexts/user.context";
import {AvailableStudentsResponse} from "../../types/AvailableStudentsResponse";
import {Loader} from "../../components/common/Loader";
import {StudentToInterview} from "../../../../headhunter-back/src/types/student";
import {SingleStudent} from "./SingleStudent";


export const HrView = () => {

    const {setModal} = useModal();
    const {user} = useContext(UserContext);
    const {apiLoading} = useFetch();
    const [students, setStudents] = useState<AvailableStudentsResponse[] | StudentToInterview[]>([]);
    const [viewMode, setViewMode] = useState<HrViewMode>(HrViewMode.AvailableStudents);
    const [currentPageNr, setCurrentPageNr] = useState(1);
    const [totalPagesNr, setTotalPagesNr] = useState(0);
    const [maxStudentsPerPage, setMaxStudentsPerPage] = useState(5);
    const [filteringCriteria, setFilteringCriteria] = useState<HrFilteringCriteria | null>(null);

    const handleFiltering = (data: HrFilteringCriteria) => {
        setFilteringCriteria(data);
        console.log(data)
    }

    const setMaxPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /* @TODO: useFetch to set max records per page @ backend */
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
        const fetchData = async (viewMode: HrViewMode) => {

            function paginate(data: Array<any>) {
                const totalStudents = data
                const splitNr = maxStudentsPerPage
                const result = totalStudents.reduce((resultArray: any, item: any, index: number) => {
                    const chunkIndex = Math.floor(index / splitNr)
                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = []
                    }
                    resultArray[chunkIndex].push(item)
                    return resultArray
                }, []);
                setTotalPagesNr(result.length);
                return result[currentPageNr - 1];
            }

            if (viewMode === HrViewMode.AvailableStudents) {
                const res = await fetch(`http://localhost:3000/hr/available`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${user?.access_token}`,
                    }
                });
                const data = await res.json();
                const paginated = paginate(data.payload as AvailableStudentsResponse[]);
                setStudents(paginated);
            }

            if (viewMode === HrViewMode.StudentsToInterview) {
                const res = await fetch(`http://localhost:3000/hr/interview`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${user?.access_token}`,
                    }
                });
                const data = await res.json();
                const paginated = paginate(data.payload as StudentToInterview[]);
                setStudents(paginated);
            }
        };

        void fetchData(viewMode);


    }, [viewMode, currentPageNr, maxStudentsPerPage]);

    if (apiLoading) return <Loader/>

    return (
        <>
            <div className="flex justify-center items-center w-full mt-4">
                <div className="flex flex-col place-content-between bg-base-300 items-center max-w-[1430px]">

                    <div className="flex flex-row w-full items-start pt-2 border-b-[3px] border-base-200">

                        <HrTab onClick={() => setViewMode(HrViewMode.AvailableStudents)}
                               highlighted={viewMode === HrViewMode.AvailableStudents ?? true}
                               text={`Dostępni kursanci`}/>
                        <HrTab onClick={() => setViewMode(HrViewMode.StudentsToInterview)}
                               highlighted={viewMode === HrViewMode.StudentsToInterview ?? true}
                               text={`Do rozmowy`}/>

                    </div>
                    <div className="w-full px-5 pb-5">
                        <div className="py-4 border-b-[3px] place-content-between border-base-200 flex">

                            <div className="input-group flex items-center relative">
                                <input type="text" placeholder="Szukaj"
                                       className="placeholder:text-neutral-500 input w-min-1/4 pl-10 bg-base-200 h-9"/>
                                <BiSearch className="fill-neutral-500 absolute left-[15px] scale-[110%]"/>
                            </div>

                            <button
                                onClick={() => {
                                    setModal(<FilteringModal handleFiltering={handleFiltering}/>)
                                }}
                                className="cursor-pointer w-min-fit px-4 flex items-center justify-center text-neutral-500 bg-base-200 gap-1.5">
                                <FaFilter className="fill-neutral-500 min-w-[15%] min-h-[15%]"/>Filtrowanie
                            </button>

                        </div>
                        <div className="flex flex-col bg-base-200 gap-3">

                            {students?.map((student: AvailableStudentsResponse | StudentToInterview, index) =>
                                <SingleStudent
                                    key={index}
                                    viewMode={viewMode}
                                    studentData={student}/>)}
                        </div>
                    </div>
                    <div className="flex bg-base-100 w-full h-full justify-end py-7">
                        <HrPagination
                            currentPageNr={currentPageNr}
                            totalPagesNr={totalPagesNr}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            setMaxPerPage={setMaxPerPage}/>
                    </div>
                </div>
            </div>
        </>)
}