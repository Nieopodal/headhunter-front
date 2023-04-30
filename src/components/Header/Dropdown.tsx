import {Link} from "react-router-dom";
import React from "react";
import {useLogout} from "../../hooks/useLogout";

export const Dropdown = () => {
const {logoutUser} = useLogout();
    return <ul tabIndex={0}
        className="absolute top-[50px] mt-3 menu dropdown-content bg-base-200 w-full font-normal text-lg">
        <li>
            <Link to="/reset-password">
                Zmiana hasła
            </Link>
        </li>
        <li>
            <button onClick={logoutUser}>
                Wyloguj
            </button>
        </li>
    </ul>
};