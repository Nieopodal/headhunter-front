import React from "react";
import { StudentCv } from "../../types/StudentCv";
import { BasicFormSection } from "./FormSections/BasicFormSection";
import { PasswordFormSection } from "./FormSections/PasswordFormSection";
import { ExpectationsFormSection } from "./FormSections/ExpectationsFormSection";
import { DescriptiveFormSection } from "./FormSections/DescriptiveFormSection";
import { UrlsFormSection } from "./FormSections/UrlsFormSection";

interface Props {
  studentData: StudentCv;
  newUser?: boolean;
}

export const StudentCvFormSections = ({ studentData, newUser }: Props) => (
  <>
    <BasicFormSection newUser={newUser} />
    {newUser && <PasswordFormSection />}
    <ExpectationsFormSection studentData={studentData} />
    <DescriptiveFormSection studentData={studentData} />
    <UrlsFormSection newUser={newUser} />
  </>
);
