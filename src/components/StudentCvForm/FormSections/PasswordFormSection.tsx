import React from "react";
import {useFormContext} from "react-hook-form";
import {TitleOfSection} from "../../CvSections/TitleOfSection";
import {BodyOfSection} from "../../CvSections/BodyOfSection";
import {CategoryContainer} from "../../CvSections/CategoryContainer";
import {Input} from "../../common/Form/Input";

export const PasswordFormSection = () => {
    const {formState: {errors}} = useFormContext();

    return <>
        <TitleOfSection title="Ustaw hasło"/>
        <BodyOfSection additionalClasses="my-4">
            <CategoryContainer title="Hasło" error={!!errors?.password}>
                <Input type="password" name="password" additionalClasses="border-2 border-black" required
                       minLength={7} maxLength={255}/>
            </CategoryContainer>
            <CategoryContainer title="Powtórz hasło" error={!!errors?.confirmPassword}>
                <Input type="password" name="confirmPassword" additionalClasses="border-2 border-black" required
                       minLength={7} maxLength={255}/>
            </CategoryContainer>
            {errors.confirmPassword && <CategoryContainer title="Błąd:">
                <p className="flex flex-row text-red-500 text-sm">{errors.confirmPassword?.message as string}</p>
            </CategoryContainer>}
        </BodyOfSection>
    </>
};