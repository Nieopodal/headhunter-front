import * as yup from "yup";

export const validationSchema = () =>
  yup.object({
    fullName: yup
      .string()
      .min(3, "Pole powinno zawierać od 3 do 70 znaków.")
      .max(70, "Pole powinno zawierać od 3 do 70 znaków.")
      .required(),
    email: yup
      .string()
      .min(5, "Pole powinno zawierać od 5 do 255 znaków.")
      .max(255, "Pole powinno zawierać od 5 do 255 znaków.")
      .matches(/^\S+@\S+\.\S+$/, "Podano niewłaściwy adres email.")
      .required(),
    company: yup
      .string()
      .min(2, "Pole powinno zawierać od 2 do 150 znaków.")
      .max(150, "Pole powinno zawierać od 2 do 150 znaków.")
      .required(),
    maxReservedStudents: yup
      .number()
      .min(1, "Wybierz wartość z przedziału 1 - 999.")
      .max(999, "Wybierz wartość z przedziału 1 - 999.")
      .required(),
  });
