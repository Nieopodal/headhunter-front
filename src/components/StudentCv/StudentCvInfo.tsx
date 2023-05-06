import {TitleOfSection} from "../CvSections/TitleOfSection";
import {BodyOfSection} from "../CvSections/BodyOfSection";
import {StarsSection} from "../CvSections/StarsSection";
import {ExpectationCategory} from "../CvSections/ExpectationCategory";
import {OneLink} from "../CvSections/OneLink";
import {StudentCv} from "../../types/StudentCv";
import {monthDeclension, numberWithSpaces} from "../../helpers/formatting";
import {arrayFromStringHandler} from "../../handlers/array-from-string-handler";

interface Props {
    studentData: StudentCv;
}

export const StudentCvInfo = ({studentData}: Props) => {

    console.log(studentData)
    return <>
        <TitleOfSection title="Oceny"/>
        <BodyOfSection>
            <StarsSection title="Ocena przejścia kursu" amount={studentData.student_course_completion}/>
            <StarsSection title="Ocena aktywności i zaangażowania na kursie" amount={studentData.student_course_engagement}/>
            <StarsSection title="Ocena kodu w projekcie własnym" amount={studentData.student_project_degree}/>
            <StarsSection title="Ocena pracy w zespole Scrum" amount={studentData.student_team_project_degree}/>
        </BodyOfSection>

        <TitleOfSection title="Oczekiwanie w stosunku do zatrudnienia"/>
        <BodyOfSection>
            <ExpectationCategory title="Preferowane miejsce pracy" body={studentData.student_expected_type_work}/>
            <ExpectationCategory title="Docelowe miasto, gdzie chce pracować kandydat" body={studentData.student_target_work_city}/>
            <ExpectationCategory title="Oczekiwany typ kontraktu" body={studentData.student_expected_contract_type}/>
            <ExpectationCategory title="Oczekiwane wynagrodzenie miesięczne netto" body={`${numberWithSpaces(studentData.student_expected_salary)} zł`}/>
            <ExpectationCategory title="Zgoda na odbycie miesięcznych praktyk/stażu na początek" body={studentData.student_can_take_apprenticeship === 1 ? "TAK" : "NIE"}/>
            <ExpectationCategory title="Komercyjne doświadczenie w programowaniu" body={`${studentData.student_months_of_commercial_exp} ${monthDeclension(studentData.student_months_of_commercial_exp)}`}/>
        </BodyOfSection>

        <TitleOfSection title="Edukacja"/>
        <BodyOfSection>
            <div className="text-base">
                {studentData.student_education}
            </div>

        </BodyOfSection>

        <TitleOfSection title="Kursy"/>
        <BodyOfSection>
            <div className="text-base">
                {studentData.student_courses}
            </div>
        </BodyOfSection>

        <TitleOfSection title="Doświadczenie zawodowe"/>
        <BodyOfSection>
            <div className="text-base">
                {studentData.student_work_experience}
            </div>
        </BodyOfSection>

        <TitleOfSection title="Portfolio"/>
        <BodyOfSection color="#0B8BD4">
            <div className="block">
                {/*@TODO: skończyć to!*/}
                {studentData.student_portfolio_urls && arrayFromStringHandler(studentData.student_portfolio_urls).map((el, i) => <OneLink url={el} key={i}/>)}
            </div>
        </BodyOfSection>

        <TitleOfSection title="Projekt w zespole Scrumowym"/>
        <BodyOfSection color="#0B8BD4">
            <div className="block">
                {studentData.student_project_urls && arrayFromStringHandler(studentData.student_project_urls).map((el, i) => <OneLink url={el} key={i}/>)}
            </div>
        </BodyOfSection>

        <TitleOfSection title="Projekt na zaliczenie"/>
        <BodyOfSection color="#0B8BD4">
            <div className="block">
                {studentData.student_bonus_project_urls && arrayFromStringHandler(studentData.student_bonus_project_urls).map((el, i) => <OneLink url={el} key={i}/>)}
            </div>
        </BodyOfSection>
    </>
};