import React from "react";
import {Header} from "../Header/Header";
import {UserSideMenu} from "../UserSideMenu/UserSideMenu";

interface Props {
    children: React.ReactNode;
}

export const DashboardContainer = ({children}: Props) => (
    <>
        {/*<TempModal userName={userName}/>*/}
        <Header/>
        <div className="flex flex-row justify-center items-center w-full mt-2">
            <div className="flex flex-row w-[1430px]">
                <UserSideMenu/>
                <div className="w-full border-[1px] h-[100vh] mx-2">
                    {children}
                </div>
            </div>
        </div>
    </>
);