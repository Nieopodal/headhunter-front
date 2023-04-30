import React, {ReactNode} from "react";
import {Link} from "react-router-dom";

interface Props {
    children: ReactNode;
    text: string;
    url: string;
}

export const MenuOption = ({children, text, url}: Props) => (
    <li>
        <Link to={url}>
            {children}
            {text}
        </Link>
    </li>
);