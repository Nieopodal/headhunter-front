import { useFormContext } from "react-hook-form";
import { TitleOfSection } from "../../CvSections/TitleOfSection";
import { BodyOfSection } from "../../CvSections/BodyOfSection";
import { CategoryContainer } from "../../CvSections/CategoryContainer";
import { Input } from "../../common/Form/Input";
import React from "react";
import { ExpectedContractType, ExpectedTypeWork } from "@Types";
import { StudentCv } from "../../../types/StudentCv";

interface Props {
  studentData: StudentCv;
}

export const ExpectationsFormSection = ({ studentData }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return <>
      <TitleOfSection title="Oczekiwanie w stosunku do zatrudnienia" />
      <BodyOfSection additionalClasses="my-4 my-4 grid grid-cols-2 md:grid-cols-3 lg:flex">
        <CategoryContainer
          title="Preferowane miejsce pracy"
          error={!!errors?.expectedTypeWork}
        >
          <select
            {...register("expectedTypeWork")}
            defaultValue={studentData.student_expected_type_work}
            className="h-10 bg-neutral input border-2 border-black"
            required
          >
            <option value={ExpectedTypeWork.DM}>{ExpectedTypeWork.DM}</option>
            <option value={ExpectedTypeWork.OFFICE}>
              {ExpectedTypeWork.OFFICE}
            </option>
            <option value={ExpectedTypeWork.HYBRID}>
              {ExpectedTypeWork.HYBRID}
            </option>
            <option value={ExpectedTypeWork.REMOTE as string}>
              {ExpectedTypeWork.REMOTE}
            </option>
            <option value={ExpectedTypeWork.MOVE}>
              {ExpectedTypeWork.MOVE}
            </option>
          </select>
        </CategoryContainer>

        <CategoryContainer
          title="Docelowe miasto, gdzie chce pracować kandydat"
          error={!!errors?.targetWorkCity}
        >
          <Input
            type="text"
            name="targetWorkCity"
            additionalClasses="border-2 border-black"
            maxLength={60}
          />
        </CategoryContainer>

        <CategoryContainer
          title="Oczekiwany typ kontraktu"
          error={!!errors?.expectedContractType}
        >
          <select
            {...register("expectedContractType")}
            defaultValue={studentData.student_expected_contract_type}
            className="h-10 bg-neutral input max-w-fit px-0 border-2 border-black"
          >
            <option value={ExpectedContractType.NONE}>
              {ExpectedContractType.NONE}
            </option>
            <option value={ExpectedContractType.EMPLOY}>
              {ExpectedContractType.EMPLOY}
            </option>
            <option value={ExpectedContractType.CONTRACT}>
              {ExpectedContractType.CONTRACT}
            </option>
            <option value={ExpectedContractType.B2B}>
              {ExpectedContractType.B2B}
            </option>
          </select>
        </CategoryContainer>

        <CategoryContainer
          title="Oczekiwane wynagrodzenie miesięczne netto [PLN] (0 - brak)"
          error={!!errors?.expectedSalary}
        >
          <Input
            type="number"
            name="expectedSalary"
            additionalClasses="border-2 border-black"
            min={0}
            max={9999999.99}
          />
        </CategoryContainer>

        <CategoryContainer
          title="Zgoda na odbycie miesięcznych praktyk/stażu na początek"
          justifyCenter
        >
          <input
            type="checkbox"
            {...register("canTakeApprenticeship")}
            className="checkbox"
          />
        </CategoryContainer>

        <CategoryContainer
          title="Komercyjne doświadczenie w programowaniu [miesiące]"
          error={!!errors?.monthsOfCommercialExp}
        >
          <Input
            type="number"
            name="monthsOfCommercialExp"
            additionalClasses="border-2 border-black"
            min={0}
            max={9999}
            required
          />
        </CategoryContainer>
      </BodyOfSection>
    </>
};
