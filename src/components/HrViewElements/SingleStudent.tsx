import React from "react";
import {monthDeclension, numberWithSpaces} from "../../helpers/formatting";
import {SingleStudentGrade} from "./SingleStudentGrade";
import {SingleStudentPreferenceItem} from "./SingleStudentPrefernceItem";
import {HrViewMode} from "../../types/HrViewMode";
import {SingleStudentTitleBar} from "./SingleStudentTitleBar";
import {AvailableStudentsResponse} from "../../types/AvailableStudentsResponse";
import { StudentToInterview } from "../../../../headhunter-back/src/types/student";


type Props = {
    studentData: AvailableStudentsResponse | StudentToInterview;
    viewMode: HrViewMode
}

export const SingleStudent = ({studentData, viewMode}: Props) => {


    const courseCompletion = ("student_course_completion" in studentData) ? studentData.student_course_completion : studentData.courseCompletion;
    const courseEngagement = ("student_course_engagement" in studentData) ? studentData.student_course_engagement : studentData.courseEngagement;
    const projectDegree = ("student_project_degree" in studentData) ? studentData.student_project_degree : studentData.projectDegree;
    const scrumDegree = ("student_team_project_degree" in studentData) ? studentData.student_team_project_degree : studentData.teamProjectDegree;
    const typeWork = ("student_expected_type_work" in studentData) ? studentData.student_expected_type_work : studentData.expectedTypeWork;
    const workCity = ("student_target_work_city" in studentData) ? studentData.student_target_work_city : studentData.targetWorkCity;
    const salary = ("student_expected_salary" in studentData) ? studentData.student_expected_salary : studentData.expectedSalary;
    const takeAppr = ("student_can_take_apprenticeship" in studentData) ? studentData.student_can_take_apprenticeship : studentData.canTakeApprenticeship;
    const commExp = ("student_months_of_commercial_exp" in studentData) ? studentData.student_months_of_commercial_exp : studentData.monthsOfCommercialExp;

    return (<>
        <div tabIndex={0} className="collapse collapse-arrow rounded-box ">
            <input type="checkbox"/>

            <div
                className="flex flex-row place-content-between items-center collapse-title text-lg font-normal pl-5 pr-0 bg-base-300 after:text-neutral-500 after:scale-150">
                <SingleStudentTitleBar viewMode={viewMode} studentData={studentData}/>
            </div>

            <div
                className="flex flex-row gap-0.5 bg-base-300 collapse-content p-0 max-lg:overflow-x-scroll max-lg:scroll-mx-96">
                <SingleStudentGrade
                    title={`Ocena przejścia kursu`}
                    grade={courseCompletion}
                />

                <SingleStudentGrade
                    title={`Ocena aktywności i zaangażowania na kursie`}
                    grade={courseEngagement}/>

                <SingleStudentGrade
                    title={`Ocena kodu w projekcie własnym`}
                    grade={projectDegree}
                />

                <SingleStudentGrade
                    title={`Ocena pracy w zespole w Scrum`}
                    grade={scrumDegree}
                />

                <SingleStudentPreferenceItem
                    title={`Preferowane miejsce pracy`}
                    description={typeWork}
                />

                <SingleStudentPreferenceItem
                    title={`Docelowe miasto, gdzie chce pracować kandydat`}
                    description={workCity}
                />

                <SingleStudentPreferenceItem
                    title={`Oczekiwany typ kontraktu`}
                    description={workCity} //@TODO: change this to the proper one
                />

                <SingleStudentPreferenceItem
                    title={`Oczekiwane wynagrodzenie miesięczne netto`}
                    description={numberWithSpaces(Intl.NumberFormat(undefined, {
                        currency: "PLN",
                        style: "currency"
                    }).format(Number(salary)))}
                />

                <SingleStudentPreferenceItem
                    title={`Zgoda na odbycie bezpłatnych praktyk/stażu na początek`}
                    description={takeAppr === 1 ? "TAK" : "NIE"}
                />

                <SingleStudentPreferenceItem
                    title={`Komercyjne doświadczenie w programowaniu`}
                    description={commExp + ' ' + monthDeclension(commExp)}
                />
            </div>
        </div>
    </>)
}