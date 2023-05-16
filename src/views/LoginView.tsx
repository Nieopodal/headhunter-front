import React, {useContext, useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from 'yup';
import {useAuth} from "../hooks/useAuth";
import {AppLogo} from "../components/Header/AppLogo";
import {Input} from "../components/common/Form/Input";
import {UserContext} from "../contexts/user.context";
import {NavLink, useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {ResponseParagraph} from "../components/common/ResponseParagraph";
import {Loader} from "../components/common/Loader";

export const LoginView = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {loginUser, findUser, apiLoading, error} = useAuth();
    const [checkingUser, setCheckingUser] = useState<boolean>(false);

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
                setCheckingUser(true);
                await findUser();
                setCheckingUser(false);
            })();
        }
    }, []);

    return <form onSubmit={methods.handleSubmit(data => loginUser(data))}>
        <FormProvider {...methods}>
            <div className="flex flex-col justify-center items-center w-screen h-screen">
                {checkingUser && <Loader/>}
                {(!checkingUser && !user) &&
                    <div className="w-screen px-3 sm:w-[350px] flex flex-col">
                        <div className="flex justify-center">
                            <AppLogo classes="w-32"/>
                        </div>
                        <div className="form-control gap-4 my-4">
                            {error && <div className="w-fit mx-auto">
                                <ResponseParagraph text="Login i/lub hasło są nieprawidłowe."/></div>}
                            <div>
                                <Input type="email" name="email" placeholder="E-mail" additionalClasses="block w-full"
                                       disabled={apiLoading}/>
                                {errors?.email && <ResponseParagraph text={errors.email.message!}/>}
                            </div>

                            <div>
                                <Input type="password" name="password" placeholder="Hasło"
                                       additionalClasses="block w-full" disabled={apiLoading}/>
                                {errors?.password && <ResponseParagraph text={errors.password.message!}/>}
                            </div>
                        </div>
                        <div className="items-center flex flex-row place-content-between align-middle mt-2">

                            <NavLink to="/reset-password"
                                     className="link link-hover font-medium text-sm tracking-wider w-1/2 sm:w-2/3 pr-2">
                                Zapomniałeś hasła?
                            </NavLink>

                            <button
                                className={`${apiLoading ? ' btn btn-square loading' : ''} w-1/2 sm:w-1/3 btn-sm h-10 btn-primary disabled:btn-primary normal-case font-normal text-base rounded-none`}
                                disabled={apiLoading}
                            >
                                {!apiLoading && `Zaloguj się`}
                            </button>
                        </div>
                    </div>
                }
            </div>
        </FormProvider>
    </form>
};