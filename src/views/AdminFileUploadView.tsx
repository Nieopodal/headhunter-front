import React from 'react';
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {SmallFormContainer} from "../components/common/SmallFormContainer";
import {Input} from "../components/common/Form/Input";
import {yupResolver} from "@hookform/resolvers/yup";

interface FormData {
    file: File[];
}

export const AdminFileUploadView = () => {

    const validationSchema = yup.object().shape({
        file: yup
            .mixed<File[]>()
            .required("Nie wybrano pliku.")
            .test("oneFile", "Nie wybrano pliku.", (value) => (
                value.length === 1
            ))
            .test("fileType", "Wybierz plik .csv", value => (
                value[0] && "text/csv".includes(value[0].type)
            ))
            .test('fileSize', "Maksymalny rozmiar pliku to 1MB", value => (
                value[0] && value[0].size <= 1024 * 1024
            ))
    });

    const methods = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const {handleSubmit, formState: {errors}} = methods;

    return <SmallFormContainer title="Dodawanie kursantów do bazy danych"
                               description="Skorzystaj z poniższego pola, aby wysłać plik .csv">
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <FormProvider {...methods}>
                <Input type="file" name="file" customClasses="file-input file-input-bordered w-full max-w-xs"/>

                <button className="btn-md mx-10 btn-primary normal-case font-normal text-base rounded-none">
                    Prześlij plik
                </button>
                {errors?.file && <p className="text-red-500 my-1">{errors.file.message}</p>}
            </FormProvider>
        </form>
    </SmallFormContainer>
};
