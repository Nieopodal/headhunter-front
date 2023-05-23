import React, {FormEvent, useContext, useRef} from "react";
import {BiSearch} from "react-icons/bi";
import {FaFilter} from "react-icons/fa";
import {HrViewMode} from "../../types/HrViewMode"
import {HrTab} from "./HrTab";
import {HrPagination} from "./HrPagination";
import {useModal} from '../../hooks/useModal'
import {FilteringModal} from "./FilteringModal";
import {AvailableStudent, StudentToInterview} from "@Types";
import {SingleStudent} from "./SingleStudent";
import {TbPlayerTrackNext} from "react-icons/tb";
import {HrFilteringContext} from "../../contexts/hr.filtering.context";
import {ImCancelCircle} from "react-icons/im";

type Props = {
    handleViewMode: (viewMode: HrViewMode) => void;
    studentList: AvailableStudent[] | StudentToInterview[];
    viewMode: HrViewMode;
    currentPageNr: number;
    totalPagesNr: number
    setMaxPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    prevPage: () => void;
    nextPage: () => void;
    maxStudentsPerPage: number;
    handleNameSearch: (name: string) => void;
    searchedName: string;
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
                                  maxStudentsPerPage,
                                  handleNameSearch,
                                  searchedName,
                              }: Props) => {

    const {isFiltering} = useContext(HrFilteringContext)
    const {setModal} = useModal();
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearching = (e: FormEvent) => {
        e.preventDefault();
        const name = searchRef.current?.value;
        handleNameSearch(name!);
    }

    const clearSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchRef.current?.value) {
            searchRef.current.value = ''
        }
        handleNameSearch('');
    };

    return <div className="flex justify-center items-center w-full mt-4">
        <div
            className="flex flex-col place-content-between bg-base-300 items-center sm:min-w-[600px] lg:min-w-[800px] max-w-[1430px]">

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

                <div
                    className={`pt-4 ${isFiltering ? "pb-2" : "pb-4"} border-b-[3px] place-content-between border-base-200 flex flex-col`}>

                    <div className={"flex flex-row"}>
                        <div className="input-group max-sm:gap-5 flex items-center relative">

                            <div className="flex flex-row items-center">
                                <input
                                    type="text"
                                    ref={searchRef}
                                    placeholder={"Imię lub nazwisko"}
                                    defaultValue={searchedName}
                                    className="relative placeholder:text-neutral-500 max-sm:pr-0 max-sm:w-full input w-min-1/4 pl-10 bg-base-200 h-9"
                                />
                                <BiSearch
                                    className="absolute fill-neutral-500 left-[15px] top-[10px] scale-[110%]"
                                />
                                <button
                                    onClick={(e) => clearSearch(e)}
                                    className="btn-sm h-8 ml-2 mr-1 btn-primary"
                                    type="submit">
                                    <ImCancelCircle
                                        className="scale-[150%]"
                                    />
                                </button>

                                <button className="btn-sm h-8 ml-1 mr-4 btn-primary"
                                        onClick={(e) => handleSearching(e)}
                                >
                                    <TbPlayerTrackNext
                                        className="scale-[150%]"
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setModal({
                                    modal:
                                        <FilteringModal/>,
                                    fitHeight: true,
                                });
                            }}
                            className={`cursor-pointer w-min-fit px-4 flex items-center justify-center ${isFiltering ? "btn-active text-base-content" : "bg-base-200 text-neutral-500"} gap-1.5`}>
                            <FaFilter
                                className={`${isFiltering ? "fill-white" : "fill-neutral-500"} min-w-[15%] min-h-[15%]`}/>Filtrowanie
                        </button>
                    </div>
                    {isFiltering && <span className={"text-right mt-2 text-success"}>Filtrowanie włączone</span>}
                </div>
                <div className="flex flex-col bg-base-200 gap-3">

                    {
                        studentList?.map((student: AvailableStudent | StudentToInterview, index) =>
                            <SingleStudent
                                key={index}
                                viewMode={viewMode}
                                handleViewMode={handleViewMode}
                                studentData={student}
                            />
                        )
                    }
                </div>
                {
                    studentList?.[0] === undefined &&
                    <h2 className="text-2xl mt-3 py-7 text-center font-bold">Brak wyników do wyświetlenia</h2>
                }
            </div>
            <div className="flex bg-base-100 w-full h-full justify-end py-7">
                {
                    (totalPagesNr !== 0) &&
                    <HrPagination currentPageNr={currentPageNr}
                                  totalPagesNr={totalPagesNr}
                                  nextPage={nextPage}
                                  prevPage={prevPage}
                                  maxStudentsPerPage={maxStudentsPerPage}
                                  setMaxPerPage={setMaxPerPage}
                    />
                }
            </div>
        </div>
    </div>
};