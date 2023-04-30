import React, {useContext, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {useAuth} from "../hooks/useAuth";
import {AppLogo} from "../components/Header/AppLogo";
import {Input} from "../components/common/Form/Input";
import {UserContext} from "../contexts/user.context";
import {useNavigate} from "react-router-dom";

export const LoginView = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {loginUser} = useAuth();
    const methods = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if (user) navigate('/dashboard', {replace: true});
    }, []);

    return <form onSubmit={methods.handleSubmit(data => loginUser(data))}>
        <FormProvider {...methods}>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-[350px] flex flex-col">
                    <div className="flex justify-center">
                        <AppLogo classes="w-32"/>
                    </div>
                    <div className="form-control gap-4 my-4">
                        <Input type="email" name="email" placeholder="E-mail"/>
                        <Input type="password" name="password" placeholder="Hasło"/>
                    </div>
                    <div className="items-center flex flex-row place-content-between align-middle mt-2">

                        <a href="/reset-password" className="link link-hover font-medium text-sm tracking-wider">
                            Zapomniałeś hasła?
                        </a>

                        {/*<span className="text-sm tracking-wider">*/}
                        {/*    Nie masz konta? <a className="link font-bold">Zaloguj się</a>*/}
                        {/*</span>*/}

                        <button
                            className="w-1/3 btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                            Zaloguj się
                        </button>
                    </div>
                </div>
            </div>
        </FormProvider>
    </form>
};