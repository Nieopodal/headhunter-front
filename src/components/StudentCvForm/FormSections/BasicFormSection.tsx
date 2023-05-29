import { TitleOfSection } from "../../CvSections/TitleOfSection";
import { BodyOfSection } from "../../CvSections/BodyOfSection";
import { CategoryContainer } from "../../CvSections/CategoryContainer";
import { Input } from "../../common/Form/Input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  newUser?: boolean;
}

export const BasicFormSection = ({ newUser }: Props) => {
  const {
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
    </>
  );
};
