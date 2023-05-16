import React, {ReactNode, useContext} from "react";
import {UserContext} from "../../contexts/user.context";

interface Props {
    children: ReactNode;
    roleException?: string;

}

export const SideMenu = ({children, roleException}: Props) => {
    const {user} = useContext(UserContext);

    if (roleException && roleException === user?.role) return null;

    return <ul className="xl:block menu bg-base-300 h-full p-2 text-base mb-4 sm:items-center sm:grid sm:grid-cols-3 xl:min-w-[200px] xl:max-w-[250px]" style={{background: "#292A2B"}}>
        {children}
    </ul>
};

