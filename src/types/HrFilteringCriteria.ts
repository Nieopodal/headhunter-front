export type HrFilteringCriteria = {
    courseCompletion: string,
    courseEngagment: string,
    projectDegree: string,
    teamProjectDegree: string,
    expectedTypeWork: string[],
    expectedContractType: string[],
    minSalary: number,
    maxSalary: number,
    canTakeApprenticeship: boolean,
    monthsOfCommercialExp: number
}