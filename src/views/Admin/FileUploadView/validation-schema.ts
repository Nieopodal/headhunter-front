import * as yup from "yup";

export const validationSchema = () =>
  yup.object().shape({
    file: yup
      .mixed<File[]>()
      .required("Nie wybrano pliku.")
      .test("oneFile", "Nie wybrano pliku.", (value) => value.length === 1)
      .test(
        "fileType",
        "Wybierz plik .csv",
        (value) => value[0] && "text/csv".includes(value[0].type)
      )
      .test(
        "fileSize",
        "Maksymalny rozmiar pliku to 1MB",
        (value) => value[0] && value[0].size <= 1024 * 1024
      ),
  });
