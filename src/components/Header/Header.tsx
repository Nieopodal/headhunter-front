import React from "react";
import {HeaderMenu} from "./HeaderMenu";
import {AppLogo} from "./AppLogo";

export const Header = () => (
    <div className="flex justify-center items-center bg-base-200 w-full h-[80px]">
        <div className="flex place-content-between items-center w-[1430px] h-full">
            <AppLogo classes={"w-24 p-3 cursor-pointer"}/>
            <HeaderMenu/>
        </div>
    </div>
);