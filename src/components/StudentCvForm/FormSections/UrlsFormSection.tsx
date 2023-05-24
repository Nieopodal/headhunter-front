import React from "react";
import { useFormContext } from "react-hook-form";
import { TitleOfSection } from "../../CvSections/TitleOfSection";
import { BodyOfSection } from "../../CvSections/BodyOfSection";
import { CategoryContainer } from "../../CvSections/CategoryContainer";
import { Input } from "../../common/Form/Input";

interface Props {
  newUser?: boolean;
}

export const UrlsFormSection = ({ newUser }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
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
