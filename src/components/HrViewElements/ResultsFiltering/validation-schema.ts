import * as yup from "yup";

export const validationSchema = yup.object().shape({
  courseCompletion: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(1)
    .max(5)
    .required("Pole niewypełnione"),
  courseEngagement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(1)
    .max(5)
    .required("Pole niewypełnione"),
  projectDegree: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(1)
    .max(5)
    .required("Pole niewypełnione"),
  teamProjectDegree: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(1)
    .max(5)
    .required("Pole niewypełnione"),
  expectedTypeWork: yup
    .array()
    .min(1, "Wybierz conajmniej jedną opcję z tej grupy")
    .typeError("Pole niewypełnione"),
  expectedContractType: yup
    .array()
    .min(1, "Wybierz conajmniej jedną opcję z tej grupy")
    .typeError("Pole niewypełnione"),
  minSalary: yup
    .number()
    .positive()
    .integer()
    .min(1, "Podaj minimalne wynagrodzenie")
    .max(999999, "Zbyt dużo cyfr")
    .required("Podaj minimalne wynagrodzenie")
    .typeError("Pole niewypełnione"),
  maxSalary: yup
    .number()
    .positive()
    .integer()
    .min(yup.ref("minSalary"), "Druga wartość musi być większa")
    .max(999999, "Zbyt dużo cyfr")
    .required("Podaj maksymalne wynagrodzenie")
    .typeError("Pole niewypełnione"),
  canTakeApprenticeship: yup.boolean(),
  monthsOfCommercialExp: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .integer()
    .required("Pole niewypełnione"),
});
