import React, {ReactNode, useContext} from "react";
import {UserContext} from "../../contexts/user.context";

interface Props {
    children: ReactNode;
    roleException?: string;

}

export const SideMenu = ({children, roleException}: Props) => {
    const {user} = useContext(UserContext);

    if (roleException && roleException === user?.role) return null;

    return <ul className="menu menu-vertical bg-base-300 h-full min-w-fit p-2 text-base" style={{background: "#292A2B"}}>
        {children}
    </ul>
};

