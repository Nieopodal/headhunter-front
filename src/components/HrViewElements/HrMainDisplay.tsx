import React, {useState} from "react";
import {BiSearch} from "react-icons/bi";
import {FaFilter} from "react-icons/fa";
import {HrViewMode} from "../../types/HrViewMode"
import {HrTab} from "./HrTab";
import {HrPagination} from "./HrPagination";
import {useModal} from '../../hooks/useModal'
import {FilteringModal} from "./FilteringModal";
import {HrFilteringCriteria} from "../../types/HrFilteringCriteria";
import {AvailableStudentsResponse} from "../../types/AvailableStudentsResponse";
import {StudentToInterview} from "../../../../headhunter-back/src/types/student";
import {SingleStudent} from "./SingleStudent";

type Props = {
    handleViewMode: (viewMode: HrViewMode) => void;
    studentList: AvailableStudentsResponse[] | StudentToInterview[];
    viewMode: HrViewMode;
    currentPageNr: number;
    totalPagesNr: number
    setMaxPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    prevPage: () => void,
    nextPage: () => void,
    maxStudentsPerPage: number
}

export const HrMainDisplay = ({
                                  handleViewMode,
                                  studentList,
                                  viewMode,
                                  currentPageNr,
                                  totalPagesNr,
                                  setMaxPerPage,
                                  prevPage,
                                  nextPage,
                                  maxStudentsPerPage
                              }: Props) => {

    const {setModal} = useModal();
    const [filteringCriteria, setFilteringCriteria] = useState<HrFilteringCriteria | null>(null);

    const handleFiltering = (data: HrFilteringCriteria) => {
        setFilteringCriteria(data);
        console.log(data)
    }


    return (<div className="flex justify-center items-center w-full mt-4">
            <div className="flex flex-col place-content-between bg-base-300 items-center max-w-[1430px]">

                <div className="flex flex-row w-full items-start pt-2 border-b-[3px] border-base-200">

                    <HrTab onClick={() => {
                        handleViewMode(HrViewMode.AvailableStudents);
                    }}
                           highlighted={viewMode === HrViewMode.AvailableStudents ?? true}
                           text={`Dostępni kursanci`}/>
                    <HrTab onClick={() => {
                        handleViewMode(HrViewMode.StudentsToInterview);
                    }}
                           highlighted={viewMode === HrViewMode.StudentsToInterview ?? true}
                           text={`Do rozmowy`}/>

                </div>
                <div className="w-full px-5 pb-5">
                    <div className="py-4 border-b-[3px] place-content-between border-base-200 flex">

                        <div className="input-group max-sm:gap-5 flex items-center relative">
                            <input type="text" placeholder="Szukaj"
                                   className="placeholder:text-neutral-500 max-sm:pr-0 max-sm:mr-3 max-sm:w-full input w-min-1/4 pl-10 bg-base-200 h-9"/>
                            <BiSearch className="fill-neutral-500 absolute left-[15px] scale-[110%]"/>
                        </div>

                        <button
                            onClick={() => {
                                setModal({
                                    modal:
                                        <FilteringModal handleFiltering={handleFiltering}/>,
                                })
                            }}
                            className="cursor-pointer w-min-fit px-4 flex items-center justify-center text-neutral-500 bg-base-200 gap-1.5">
                            <FaFilter className="fill-neutral-500 min-w-[15%] min-h-[15%]"/>Filtrowanie
                        </button>

                    </div>
                    <div className="flex flex-col bg-base-200 gap-3">

                        {studentList?.map((student: AvailableStudentsResponse | StudentToInterview, index) =>
                            <SingleStudent
                                key={index}
                                viewMode={viewMode}
                                handleViewMode={handleViewMode}
                                studentData={student}/>)}
                    </div>
                </div>
                <div className="flex bg-base-100 w-full h-full justify-end py-7">
                    <HrPagination currentPageNr={currentPageNr}
                                  totalPagesNr={totalPagesNr}
                                  nextPage={nextPage}
                                  prevPage={prevPage}
                                  maxStudentsPerPage={maxStudentsPerPage}
                                  setMaxPerPage={setMaxPerPage}/>
                </div>
            </div>
        </div>
    )
};