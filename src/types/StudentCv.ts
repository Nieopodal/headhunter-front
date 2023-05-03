export interface StudentCv {
    student_courses: string;
    student_bio: string;
    student_can_take_apprenticeship: number;
    student_course_completion: number;
    student_course_engagement: number;
    student_education: null | string;
    student_expected_salary :string;
    student_expected_type_work: string;
    student_expected_contract_type: string;
    student_first_name: string;
    student_github_username: string;
    student_id: string;
    student_last_name: string;
    student_months_of_commercial_exp: number
    student_portfolio_urls: string[];
    student_project_urls: string[];
    student_project_degree:number;
    student_target_work_city: string;
    student_team_project_degree: number;
    student_team_project_pr: any;
    student_team_project_urls: string[];
    student_work_experience: any;
    student_contact_number: string;
    student_email: string;
}