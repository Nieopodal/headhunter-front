import React, {useContext} from "react";
import {Header} from "../Header/Header";
import {UserSideMenu} from "../UserSideMenu/UserSideMenu";
import {UserContext} from "../../contexts/user.context";

interface Props {
    children: React.ReactNode;
}

export const DashboardContainer = ({children}: Props) => {
    const {user} = useContext(UserContext);

    if (!user) return <>{children}</>;

    else return <>
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
};