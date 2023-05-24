import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SmallFormContainer } from "../../../components/common/SmallFormContainer";
import { Input } from "../../../components/common/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "../../../contexts/user.context";
import { useFetch } from "../../../hooks/useFetch";
import { apiUrl } from "../../../config/api";
import { Loader } from "../../../components/common/Loader";
import { validationSchema } from "./validation-schema";

interface FormData {
  file: File[];
}

interface ApiData {
  numberAddedStudents: number;
}

export const AdminFileUploadView = () => {
  const { user } = useContext(UserContext);
  const { fetchApi, apiError, data: apiData, apiLoading } = useFetch();

  const schema = validationSchema();

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (data: FormData) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    await fetchApi(
      user,
      `${apiUrl}/admin/upload/file`,
      "POST",
      "Wystąpił błąd",
      formData
    );
  };

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  if (apiLoading)
    return (
      <div className="mx-auto w-fit">
        <Loader />
      </div>
    );

  return (
    <SmallFormContainer
      title="Dodawanie kursantów do bazy danych"
      description="Skorzystaj z poniższego pola, aby wysłać plik .csv"
    >
      <form onSubmit={handleSubmit((data) => formSubmitHandler(data))}>
        <FormProvider {...methods}>
          <Input
            type="file"
            name="file"
            customClasses="file-input file-input-bordered w-full max-w-xs"
          />

          <button className="btn-md mx-10 btn-primary normal-case font-normal text-base rounded-none">
            Prześlij plik
          </button>
          {errors?.file && (
            <p className="text-red-500 my-1">{errors.file.message}</p>
          )}
          {(apiData as ApiData) && (
            <p className="my-2 text-green-500">
              Pomyślnie załadowano plik. Dodanych studentów:{" "}
              {(apiData as ApiData).numberAddedStudents}.
            </p>
          )}
          {apiError && (
            <p className="my-2 text-red-500">
              Akcja zakończona niepowodzeniem: {apiError}.
            </p>
          )}
        </FormProvider>
      </form>
    </SmallFormContainer>
  );
};
