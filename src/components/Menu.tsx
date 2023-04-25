import React from "react"
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {RiUserSearchLine, RiUserSettingsLine, RiUserStarLine} from "react-icons/ri";
import {MdOutlineHandshake} from "react-icons/md";
import {Link} from "react-router-dom";

export const Menu = () => {
    return (<>
        <ul className="menu menu-vertical bg-base-300 h-full min-w-fit p-2 text-base">
            <li>
                <Link to="/add-st">
                    <AiOutlineUsergroupAdd className="h-6 w-6"/>
                    Dodaj kursantów
                </Link>
            </li>
            <li>
                <Link to="/add-hr">
                    <RiUserStarLine className="h-6 w-6"></RiUserStarLine>
                    Dodaj osobę HR
                </Link>
            </li>
            <li>
                <Link to="">
                    <RiUserSearchLine className="h-6 w-6"/>
                    Zobacz swoje CV
                </Link>
            </li>
            <li>
                <Link to="">
                    <RiUserSettingsLine className="h-6 w-6"/>
                    Zmień swoje dane
                </Link>
            </li>
            <li>
                <Link to="">
                    <MdOutlineHandshake className="h-6 w-6"/>
                    Znalazłem/am pracę!
                </Link>
            </li>

        </ul>
    </>)
}

