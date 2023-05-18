import React, {ReactNode} from "react";
import {GoBack} from "./GoBack";
import {AppLogo} from "../Header/AppLogo";

interface Props {
    title: string;
    description: string;
    children: ReactNode;
    hideGoBack?: boolean;
}

export const SmallFormContainer = ({children, title, description, hideGoBack}: Props) => (
    <div className="flex flex-col items-center justify-start w-full mt-10">
        <div className="">
            <div className="flex justify-center">
                <AppLogo classes="w-32 mb-12"/>
            </div>
            {!hideGoBack && <div className="mb-7"><GoBack/></div>}
            <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center mb-10">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-base font-normal">{description}</p>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    </div>
);