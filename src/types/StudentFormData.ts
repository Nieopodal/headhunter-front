import { ExpectedContractType, ExpectedTypeWork } from "./student";

export interface StudentFormData {
  email: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrl1: string | null;
  portfolioUrl2: string | null;
  projectUrl1: string | null;
  projectUrl2: string | null;
  scrumProjectUrl1: string | null;
  scrumProjectUrl2: string | null;
  scrumProjectUrl3: string | null;
  bio: string;
  expectedTypeWork: ExpectedTypeWork;
  targetWorkCity: string;
  expectedContractType: ExpectedContractType;
  expectedSalary: number;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  password?: string;
  confirmPassword?: string;
}
