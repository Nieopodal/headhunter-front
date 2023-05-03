import React from "react";
import {SampleStudent} from "../../helpers/sampleStudents";
import {monthDeclension, numberWithSpaces} from "../../helpers/formatting";
import {SingleStudentGrade} from "./SingleStudentGrade";
import {SingleStudentPreferenceItem} from "./SingleStudentPrefernceItem";
import {HrViewMode} from "../../types/HrViewMode";
import {SingleStudentTitleBar} from "./SingleStudentTitleBar";


type Props = {
    studentData: SampleStudent;
    viewMode: HrViewMode
}

export const SingleStudent = (props: Props) => {

    return (<>
        <div tabIndex={0} className="collapse collapse-arrow rounded-box ">
            <input type="checkbox"/>

            <div
                className="flex flex-row place-content-between items-center collapse-title text-lg font-normal pl-5 pr-0 bg-base-300 after:text-neutral-500 after:scale-150">
                <SingleStudentTitleBar viewMode={props.viewMode} studentData={props.studentData}/>
            </div>

            <div
                className="flex flex-row gap-0.5 bg-base-300 collapse-content p-0 max-lg:overflow-x-scroll max-lg:scroll-mx-96">
                <SingleStudentGrade
                    title={`Ocena przejścia kursu`}
                    grade={props.studentData.courseCompletion}
                />

                <SingleStudentGrade
                    title={`Ocena aktywności i zaangażowania na kursie`}
                    grade={props.studentData.courseEngagment}/>

                <SingleStudentGrade
                    title={`Ocena kodu w projekcie własnym`}
                    grade={props.studentData.projectDegree}
                />

                <SingleStudentGrade
                    title={`Ocena pracy w zespole w Scrum`}
                    grade={props.studentData.teamProjectDegree}
                />

                <SingleStudentPreferenceItem
                    title={`Preferowane miejsce pracy`}
                    description={props.studentData.expectedTypeWork}
                />

                <SingleStudentPreferenceItem
                    title={`Docelowe miasto, gdzie chce pracować kandydat`}
                    description={props.studentData.targetWorkCity}
                />

                <SingleStudentPreferenceItem
                    title={`Oczekiwany typ kontraktu`}
                    description={props.studentData.expectedContractType}
                />

                <SingleStudentPreferenceItem
                    title={`Oczekiwane wynagrodzenie miesięczne netto`}
                    description={numberWithSpaces(Intl.NumberFormat(undefined, {
                        currency: "PLN",
                        style: "currency"
                    }).format(props.studentData.expectedSalary))}
                />

                <SingleStudentPreferenceItem
                    title={`Zgoda na odbycie bezpłatnych praktyk/stażu na początek`}
                    description={props.studentData.canTakeApprenticeship}
                />

                <SingleStudentPreferenceItem
                    title={`Komercyjne doświadczenie w programowaniu`}
                    description={props.studentData.monthsOfCommercialExp + ' ' + monthDeclension(props.studentData.monthsOfCommercialExp)}
                />
            </div>
        </div>
    </>)
}