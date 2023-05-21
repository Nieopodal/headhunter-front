import React from "react";
import { monthDeclension, numberWithSpaces } from "../../helpers/formatting";
import { SingleStudentGrade } from "./SingleStudentGrade";
import { SingleStudentPreferenceItem } from "./SingleStudentPrefernceItem";
import { HrViewMode } from "../../types/HrViewMode";
import { SingleStudentTitleBar } from "./SingleStudentTitleBar";
import { AvailableStudent, StudentToInterview } from "../../types";

type Props = {
  studentData: AvailableStudent | StudentToInterview;
  viewMode: HrViewMode;
  handleViewMode: (viewMode: HrViewMode) => void;
};

export const SingleStudent = ({
  studentData,
  viewMode,
  handleViewMode,
}: Props) => {
  const {
    courseCompletion,
    courseEngagement,
    expectedContractType,
    expectedTypeWork,
    monthsOfCommercialExp,
    expectedSalary,
    canTakeApprenticeship,
    targetWorkCity,
    teamProjectDegree,
    projectDegree,
  } = studentData;

  return (
    <>
      <div tabIndex={0} className="collapse collapse-arrow rounded-box ">
        <input type="checkbox" />

        <div className="max-sm:flex-col max-sm:items-start max-sm:gap-3 flex flex-row place-content-between items-center collapse-title text-lg font-normal pl-5 pr-0 bg-base-300 after:text-neutral-500 after:scale-150">
          <SingleStudentTitleBar
            handleViewMode={handleViewMode}
            viewMode={viewMode}
            studentData={studentData}
          />
        </div>

        <div className="flex flex-row gap-0.5 bg-base-300 collapse-content p-0 max-lg:overflow-x-scroll max-lg:scroll-mx-96">
          <SingleStudentGrade
            title={`Ocena przejścia kursu`}
            grade={courseCompletion}
          />

          <SingleStudentGrade
            title={`Ocena aktywności i zaangażowania na kursie`}
            grade={courseEngagement}
          />

          <SingleStudentGrade
            title={`Ocena kodu w projekcie własnym`}
            grade={projectDegree}
          />

          <SingleStudentGrade
            title={`Ocena pracy w zespole w Scrum`}
            grade={teamProjectDegree}
          />

          <SingleStudentPreferenceItem
            title={`Preferowane miejsce pracy`}
            description={expectedTypeWork}
          />

          <SingleStudentPreferenceItem
            title={`Docelowe miasto, gdzie chce pracować kandydat`}
            description={targetWorkCity}
          />

          <SingleStudentPreferenceItem
            title={`Oczekiwany typ kontraktu`}
            description={expectedContractType}
          />

          <SingleStudentPreferenceItem
            title={`Oczekiwane wynagrodzenie miesięczne netto`}
            description={numberWithSpaces(
              Intl.NumberFormat(undefined, {
                currency: "PLN",
                style: "currency",
              }).format(Number(expectedSalary))
            )}
          />

          <SingleStudentPreferenceItem
            title={`Zgoda na odbycie bezpłatnych praktyk/stażu na początek`}
            description={canTakeApprenticeship === true ? "TAK" : "NIE"}
          />

          <SingleStudentPreferenceItem
            title={`Komercyjne doświadczenie w programowaniu`}
            description={
              monthsOfCommercialExp +
              " " +
              monthDeclension(monthsOfCommercialExp)
            }
          />
        </div>
      </div>
    </>
  );
};
