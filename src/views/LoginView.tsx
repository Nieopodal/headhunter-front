import React, {useContext, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from 'yup';
import {useAuth} from "../hooks/useAuth";
import {AppLogo} from "../components/Header/AppLogo";
import {Input} from "../components/common/Form/Input";
import {UserContext} from "../contexts/user.context";
import {NavLink, useNavigate} from "react-router-dom";
import {Loader} from "../components/common/Loader";
import {yupResolver} from "@hookform/resolvers/yup";
import {ResponseParagraph} from "../components/common/ResponseParagraph";

export const LoginView = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {loginUser, findUser, apiLoading, error} = useAuth();

    const validationSchema = yup.object({
        email: yup.string().email("Podaj poprawny adres email.").required("Pole jest wymagane."),
        password: yup.string().required("Pole jest wymagane."),
    });

    const methods = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const {formState: {errors}} = methods;

    useEffect(() => {
        if (user) {
            navigate('/dashboard', {replace: true});
        } else {
            (async () => {
                await findUser();
            })();
        }
    }, []);

    if (!user && !apiLoading) return <form onSubmit={methods.handleSubmit(data => loginUser(data))}>
        <FormProvider {...methods}>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-[350px] flex flex-col">
                    <div className="flex justify-center">
                        <AppLogo classes="w-32"/>

                    </div>
                    <div className="form-control gap-4 my-4">
                        {error && <div className="w-fit mx-auto"><ResponseParagraph text="Login i/lub hasło są nieprawidłowe."/></div>}
                        <div>
                            <Input type="email" name="email" placeholder="E-mail" additionalClasses="block w-full"/>
                            {errors?.email && <ResponseParagraph text={errors.email.message!}/>}
                        </div>

                        <div>
                        <Input type="password" name="password" placeholder="Hasło" additionalClasses="block w-full"/>
                            {errors?.password && <ResponseParagraph text={errors.password.message!}/>}
                        </div>
                    </div>
                    <div className="items-center flex flex-row place-content-between align-middle mt-2">

                        <NavLink to="/reset-password" className="link link-hover font-medium text-sm tracking-wider">
                            Zapomniałeś hasła?
                        </NavLink>

                        <button
                            className="w-1/3 btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                            Zaloguj się
                        </button>
                    </div>
                </div>
            </div>
        </FormProvider>
    </form>

    else return <Loader/>
};