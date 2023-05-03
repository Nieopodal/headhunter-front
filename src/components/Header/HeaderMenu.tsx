import {Avatar} from "./Avatar";
import {Dropdown} from "./Dropdown";
import React, {useContext} from "react";
import {UserContext} from "../../contexts/user.context";

export const HeaderMenu = () => {
    const {user} = useContext(UserContext);

    return <div tabIndex={0}
                className="relative cursor-pointer flex items-center gap-7 bg-base-200 dropdown dropdown-end px-3"
    >
        <div className="flex items-center">
            <Avatar/>
            <span className="font-normal text-lg ml-3">
                {user!.role === "admin" ? `Administrator` : null}
                {user!.role === "hr" ? `${user?.fullName}` : null}
                {user!.role === "student" ? `${user?.firstName} ${user?.lastName}` : null}
            </span>
        </div>
        <span>🞃</span>
        <Dropdown/>
    </div>
};