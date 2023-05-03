import React from "react";
import {HrViewMode} from "../../types/HrViewMode";
import {SampleStudent} from "../../helpers/sampleStudents";

type Props = {
    viewMode: HrViewMode,
    studentData: SampleStudent,
}

export const SingleStudentTitleBar = (props: Props) => {

    const userFullName = `${props.studentData.firstName} ` + `${props.studentData.lastName}`;
    const userShortName = `${props.studentData.firstName} ` + (`${props.studentData.lastName}`).slice(0, 1).concat('.');

    return (<>
        <div className="flex flex-row items-center gap-10">
            {props.viewMode === HrViewMode.StudentsToInterview ?
                <div className="flex flex-col">
                    <span className="text-sm font-normal">Rezerwacja do:</span>
                    <span
                        className="text-base font-bold">{new Intl.DateTimeFormat('pl').format(new Date(props.studentData.availableTill))} r.</span>
                </div> : null}

            <div className="flex flex-row items-center gap-3">
                {props.viewMode === HrViewMode.StudentsToInterview ?
                    <label className="btn-circle cursor-pointer avatar items-center">
                        <div className="w-20 rounded-full">
                            <img src={`${props.studentData.pictureUrl}`} alt="user profile"/>
                        </div>
                    </label> : null}
                {props.viewMode === HrViewMode.AvailableStudents ? userShortName : userFullName}
            </div>

        </div>

        <div className="flex flex-row items-center gap-3 mr-14">
            {props.viewMode === HrViewMode.StudentsToInterview ? <>
                <button
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Pokaż CV
                </button>

                <button
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Brak zainteresowania
                </button>

                <button
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Zatrudniony
                </button>
            </> : null}

            {props.viewMode === HrViewMode.AvailableStudents ?
                <button
                    className="z-10 w-1/8 btn-sm h-9 btn-primary normal-case font-normal text-base rounded-none">
                    Zarezerwuj rozmowę
                </button> : null}
        </div>
    </>)
}