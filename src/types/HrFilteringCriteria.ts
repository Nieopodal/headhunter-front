export type HrFilteringCriteria = {
    courseCompletion?: string,
    courseEngagement?: string,
    projectDegree?: string,
    teamProjectDegree?: string,
    expectedTypeWork?: string[],
    expectedContractType?: string[],
    minSalary?: number,
    maxSalary?: number,
    canTakeApprenticeship?: boolean,
    monthsOfCommercialExp?: number,
};