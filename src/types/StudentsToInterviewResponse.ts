import {ExpectedContractType, ExpectedTypeWork } from "../../../headhunter-back/src/types/student";
import {AvailableStudentsResponse} from "./AvailableStudentsResponse";

export interface StudentsToInterviewResponse extends AvailableStudentsResponse {
    student_id: number,
    student_first_name: string,
    student_last_name: string,
    student_course_completion: number,
    student_course_engagement: number,
    student_project_degree: number,
    student_team_project_degree: number,
    student_expected_type_work: ExpectedTypeWork,
    student_target_work_city: ExpectedContractType,
    student_expected_salary: number,
    student_can_take_apprenticeship: number,
    student_months_of_commercial_exp: number
}