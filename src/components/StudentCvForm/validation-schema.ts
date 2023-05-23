import * as yup from "yup";

export const validationSchema = (newUser: boolean) => {
    return yup.object({
        githubUsername: yup.string().max(255).required()
            .test('userExists', 'Użytkownik nie istnieje w bazie Github', (value) => {
                return new Promise((resolve) => {
                    fetch(`https://api.github.com/users/${value}`)
                        .then(res => {
                            resolve(res.status === 200)
                        })
                        .catch(() => {
                            resolve(false);
                        })
                });
            }),
        firstName: yup.string().required('Imię jest wymagane').max(50),
        lastName: yup.string().required('Nazwisko jest wymagane').max(70),
        contactNumber: yup.number().integer().max(9999999999999999999)
            .test('contactNumber', 'Podano nieprawidłowy format', value => (
                !(value && (value.toString.length === 0 || value < 111111))
            )),
        portfolioUrl1: yup.string().max(255),
        portfolioUrl2: yup.string().max(255).notRequired(),
        projectUrl1: yup.string().min(10).max(255).required(),
        projectUrl2: yup.string().max(255).notRequired(),
        scrumProjectUrl1: yup.string().max(255)
            .test('url-test', 'Link jest wymagany.', (value) => {
                if (!newUser) return Boolean(value);
                else return true;
            }),
        scrumProjectUrl2: yup.string().max(255)
            .test('url-test', 'Link jest wymagany.', (value) => {
                if (!newUser) return Boolean(value);
                else return true;
            }),
        scrumProjectUrl3: yup.string().max(255).test('url-test', 'Link jest wymagany.', (value) => {
            if (!newUser) return Boolean(value);
            else return true;
        }),
        expectedTypeWork: yup.string().required(),
        targetWorkCity: yup.string().max(60),
        expectedContractType: yup.string().required(),
        monthsOfCommercialExp: yup.number().min(0).max(9999).required(),
        education: yup.string().max(1000),
        workExperience: yup.string().max(1000),
        courses: yup.string().max(1000),
        expectedSalary: yup.number().max(9999999.99, 'Dostępne kwoty: 0 - 9999999').notRequired(),
        password: yup.string().test('password-test', 'Hasło jest wymagane.', (value) => {
            if (newUser) return Boolean(value);
            else return true;
        }),
        confirmPassword: yup.string()
            .test('passwords-match', 'Hasła muszą się zgadzać.', function (value) {
                return this.parent.password === value
            })
            .test("password-quality", "Hasło musi zawierać minimum 6 znaków, jedną wielką literę, jedną małą, jedną liczbę oraz znak specjalny", (value) => {
                if (newUser) {
                    if (!value) return false;
                    if (value) {
                        return Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/))
                    }
                } else return true;
            }),
    });
};