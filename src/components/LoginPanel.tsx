import logo from "../assets/logo.png";
import React from "react";


export const LoginPanel = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-[350px] flex flex-col">
                <div className="flex justify-center">
                    <img className="w-32" src={logo} alt="logo"/></div>
                <div className="form-control gap-4 my-4">
                    <input type="text" placeholder="E-mail"
                           className="h-10 bg-neutral input input placeholder:text-neutral-content"/>
                    <input type="text" placeholder="Hasło"
                           className="h-10 bg-neutral input input placeholder:text-neutral-content"/>
                </div>
                <div className="flex justify-end">
                    <a href="#" className="link link-hover font-medium text-sm tracking-wider">
                        Zapomniałeś hasła?
                    </a></div>
                <div className="items-center flex flex-row place-content-between align-middle mt-6">
                <span className="text-sm tracking-wider">
                    Nie masz konta? <a className="link font-bold">Zarejestruj się</a></span>
                    <button
                        className="w-1/3 btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                        Zaloguj się
                    </button>
                </div>
            </div>
            <hr/>

        </div>
    )
}