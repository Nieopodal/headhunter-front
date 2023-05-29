import * as yup from "yup";

export const validationSchema = () =>
  yup.object({
    email: yup
      .string()
      .email("Podaj poprawny adres email.")
      .required("Pole jest wymagane."),
    password: yup.string().required("Pole jest wymagane."),
  });
