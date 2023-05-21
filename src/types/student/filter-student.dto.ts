import { ExpectedContractType, ExpectedTypeWork } from "../../types";

export class FilterStudentDto {
  monthsOfCommercialExp: number;

  canTakeApprenticeship: boolean;

  teamProjectDegree: number;

  projectDegree: number;

  courseEngagement: number;

  courseCompletion: number;

  minSalary: number;

  maxSalary: number;

  expectedContractType: ExpectedContractType[];

  expectedTypeWork: ExpectedTypeWork[];
}
