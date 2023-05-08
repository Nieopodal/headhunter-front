import React from "react";
import {SampleStudent} from "../../helpers/sampleStudents";
import {monthDeclension, numberWithSpaces} from "../../helpers/formatting";
import {SingleStudentGrade} from "./SingleStudentGrade";
import {SingleStudentPreferenceItem} from "./SingleStudentPrefernceItem";
import {HrViewMode} from "../../types/HrViewMode";
import {SingleStudentTitleBar} from "./SingleStudentTitleBar";
import {AvailableStudentsResponse} from "../../types/AvailableStudentsResponse";


type Props = {
    studentData: AvailableStudentsResponse;
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
                    grade={props.studentData.student_course_completion}
                />

                <SingleStudentGrade
                    title={`Ocena aktywności i zaangażowania na kursie`}
                    grade={props.studentData.student_course_engagement}/>

                <SingleStudentGrade
                    title={`Ocena kodu w projekcie własnym`}
                    grade={props.studentData.student_project_degree}
                />

                <SingleStudentGrade
                    title={`Ocena pracy w zespole w Scrum`}
                    grade={props.studentData.student_team_project_degree}
                />

                <SingleStudentPreferenceItem
                    title={`Preferowane miejsce pracy`}
                    description={props.studentData.student_expected_type_work}
                />

                <SingleStudentPreferenceItem
                    title={`Docelowe miasto, gdzie chce pracować kandydat`}
                    description={props.studentData.student_target_work_city}
                />

                <SingleStudentPreferenceItem
                    title={`Oczekiwany typ kontraktu`}
                    description={props.studentData.student_target_work_city} //@TODO: change this to the proper one
                />

                <SingleStudentPreferenceItem
                    title={`Oczekiwane wynagrodzenie miesięczne netto`}
                    description={numberWithSpaces(Intl.NumberFormat(undefined, {
                        currency: "PLN",
                        style: "currency"
                    }).format(props.studentData.student_expected_salary))}
                />

                <SingleStudentPreferenceItem
                    title={`Zgoda na odbycie bezpłatnych praktyk/stażu na początek`}
                    description={props.studentData.student_can_take_apprenticeship}
                />

                <SingleStudentPreferenceItem
                    title={`Komercyjne doświadczenie w programowaniu`}
                    description={props.studentData.student_months_of_commercial_exp + ' ' + monthDeclension(props.studentData.student_months_of_commercial_exp)}
                />
            </div>
        </div>
    </>)
}