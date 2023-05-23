import * as yup from "yup";

export const validationSchema = () => (
    yup.object().shape({
        password: yup.string().min(6, 'Hasło musi zawierać co najmniej 6 znaków').required('Pole wymagane').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Hasło musi zawierać minimum 6 znaków, jedną wielką literę, jedną małą, jedną liczbę oraz znak specjalny"
        ),
        confirmNewPass: yup.string().oneOf([yup.ref("password")], `Hasła muszą być jednakowe!`).required('Pole wymagane')
    })
);