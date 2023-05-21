import { useFormContext } from "react-hook-form";
import React from "react";
import { TitleOfSection } from "../CvSections/TitleOfSection";
import { BodyOfSection } from "../CvSections/BodyOfSection";
import { CategoryContainer } from "../CvSections/CategoryContainer";
import { Input } from "../common/Form/Input";
import { ExpectedContractType, ExpectedTypeWork } from "../../types";
import { StudentCv } from "../../types/StudentCv";

interface Props {
  studentData: StudentCv;
  newUser?: boolean;
}

export const StudentCvFormSections = ({ studentData, newUser }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TitleOfSection
        title="Podstawowe dane"
        errorMsg={
          errors?.githubUsername && (errors.githubUsername.message as string)
        }
      />
      <BodyOfSection additionalClasses="my-4 grid grid-cols-2 md:grid-cols-3 lg:flex">
        <CategoryContainer title="E-mail">
          <Input
            type="email"
            name="email"
            additionalClasses="border-2 border-black"
            disabled
          />
        </CategoryContainer>

        {
          <CategoryContainer title="Imię">
            <Input
              type="text"
              name="firstName"
              additionalClasses="border-2 border-black"
              disabled={!newUser}
            />
          </CategoryContainer>
        }

        {
          <CategoryContainer title="Nazwisko">
            <Input
              type="text"
              name="lastName"
              additionalClasses="border-2 border-black"
              disabled={!newUser}
            />
          </CategoryContainer>
        }

        <CategoryContainer
          title="Nick w Github"
          error={!!errors?.githubUsername}
        >
          <Input
            type="text"
            name="githubUsername"
            additionalClasses="border-2 border-black"
            maxLength={60}
          />
        </CategoryContainer>

        <CategoryContainer
          title="Telefon (0 - brak)"
          error={!!errors?.contactNumber}
        >
          <Input
            type="number"
            name="contactNumber"
            additionalClasses="border-2 border-black"
            maxLength={20}
          />
        </CategoryContainer>
      </BodyOfSection>

      {newUser && (
        <>
          <TitleOfSection title="Ustaw hasło" />
          <BodyOfSection additionalClasses="my-4">
            <CategoryContainer title="Hasło" error={!!errors?.password}>
              <Input
                type="password"
                name="password"
                additionalClasses="border-2 border-black"
                required
                minLength={7}
                maxLength={255}
              />
            </CategoryContainer>
            <CategoryContainer
              title="Powtórz hasło"
              error={!!errors?.confirmPassword}
            >
              <Input
                type="password"
                name="confirmPassword"
                additionalClasses="border-2 border-black"
                required
                minLength={7}
                maxLength={255}
              />
            </CategoryContainer>
            {errors.confirmPassword && (
              <CategoryContainer title="Błąd:">
                <p className="flex flex-row text-red-500 text-sm">
                  {errors.confirmPassword?.message as string}
                </p>
              </CategoryContainer>
            )}
          </BodyOfSection>
        </>
      )}

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

      <TitleOfSection title="Portfolio" />
      <BodyOfSection additionalClasses="my-4 grid grid-cols-2 md:grid-cols-3 lg:flex">
        <CategoryContainer title="Link główny:" error={!!errors?.portfolioUrl1}>
          <Input
            type="url"
            name="portfolioUrl1"
            additionalClasses="border-2 border-black"
            required
            maxLength={255}
          />
        </CategoryContainer>

        <CategoryContainer
          title="Link dodatkowy:"
          error={!!errors?.portfolioUrl2}
        >
          <Input
            type="url"
            name="portfolioUrl2"
            additionalClasses="border-2 border-black"
            maxLength={255}
          />
        </CategoryContainer>
      </BodyOfSection>

      {!newUser && (
        <>
          <TitleOfSection title="Projekt w zespole Scrumowym" />
          <BodyOfSection additionalClasses="my-4 grid grid-cols-2 md:grid-cols-3 lg:flex">
            <CategoryContainer
              title="Link do repozytorium:"
              error={!!errors?.scrumProjectUrl1}
            >
              <Input
                type="url"
                name="scrumProjectUrl1"
                additionalClasses="border-2 border-black"
                required={!newUser}
                maxLength={255}
              />
            </CategoryContainer>
            <CategoryContainer
              title="Link do kodu własnego (commity):"
              error={!!errors?.scrumProjectUrl2}
            >
              <Input
                type="url"
                name="scrumProjectUrl2"
                additionalClasses="border-2 border-black"
                required={!newUser}
                maxLength={255}
              />
            </CategoryContainer>
            <CategoryContainer
              title="Link do code review:"
              error={!!errors?.scrumProjectUrl3}
            >
              <Input
                type="url"
                name="scrumProjectUrl3"
                additionalClasses="border-2 border-black"
                required={!newUser}
                maxLength={255}
              />
            </CategoryContainer>
          </BodyOfSection>
        </>
      )}

      <TitleOfSection title="Projekt na zaliczenie" />
      <BodyOfSection additionalClasses="my-4 grid grid-cols-2 md:grid-cols-3 lg:flex">
        <CategoryContainer title="Link 1:" error={!!errors?.projectUrl1}>
          <Input
            type="url"
            name="projectUrl1"
            additionalClasses="border-2 border-black"
            required
            maxLength={255}
          />
        </CategoryContainer>
        <CategoryContainer
          title="Link dodatkowy:"
          error={!!errors?.projectUrl2}
        >
          <Input
            type="url"
            name="projectUrl2"
            additionalClasses="border-2 border-black"
            maxLength={255}
          />
        </CategoryContainer>
      </BodyOfSection>
    </>
  );
};
