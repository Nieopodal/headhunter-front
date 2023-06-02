import React from "react";
import { useFormContext } from "react-hook-form";
import { TitleOfSection } from "../../CvSections/TitleOfSection";
import { BodyOfSection } from "../../CvSections/BodyOfSection";
import { StudentCv } from "../../../types/StudentCv";

interface Props {
  studentData: StudentCv;
}

export const DescriptiveFormSection = ({ studentData }: Props) => {
  const { register } = useFormContext();

  return <>
      <TitleOfSection title="Biografia" />
      <BodyOfSection additionalClasses="my-4">
        <textarea
          rows={6}
          maxLength={400}
          className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black whitespace-pre-line"
          {...register("bio")}
          defaultValue={studentData.student_bio}
        />
      </BodyOfSection>

      <TitleOfSection title="Edukacja" />
      <BodyOfSection additionalClasses="my-4">
        <textarea
          rows={6}
          maxLength={1000}
          className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black whitespace-pre-line"
          {...register("education")}
          defaultValue={studentData.student_education}
        />
      </BodyOfSection>

      <TitleOfSection title="Kursy" />
      <BodyOfSection additionalClasses="my-4">
        <textarea
          rows={6}
          maxLength={1000}
          className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black whitespace-pre-line"
          {...register("courses")}
          defaultValue={studentData.student_courses}
        />
      </BodyOfSection>

      <TitleOfSection title="Doświadczenie zawodowe" />
      <BodyOfSection additionalClasses="my-4">
        <textarea
          rows={6}
          maxLength={1000}
          className=" h-24 bg-neutral p-2 mx-0 w-full placeholder:text-neutral-content text-base border-2 border-black whitespace-pre-line"
          {...register("workExperience")}
          defaultValue={studentData.student_courses}
        />
      </BodyOfSection>
    </>
};
