import React, {ReactNode} from "react";
import {NavLink} from "react-router-dom";

interface Props {
    children: ReactNode;
    text: string;
    url: string;
}

export const MenuOption = ({children, text, url}: Props) => (
    <li>
        <NavLink to={url} style={{background: "e02735"}} className="mb-2">
            {children}
            {text}
        </NavLink>
    </li>
);