import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {RiUserSearchLine, RiUserSettingsLine, RiUserStarLine} from "react-icons/ri";
import {MdOutlineHandshake} from "react-icons/md";
import React, {useContext} from "react";
import {SideMenu} from "../common/SideMenu";
import {MenuOption} from "../common/MenuOption";
import {UserContext} from "../../contexts/user.context";
import {StudentSummary} from "../StudentSummary";

export const UserSideMenu = () => {
    const {user} = useContext(UserContext);

    return <SideMenu roleException="hr">
        {user?.role === 'admin' &&
            <>
                <MenuOption text="Dodaj kursantów" url="/add-students">
                    <AiOutlineUsergroupAdd className="h-6 w-6"/>
                </MenuOption>

                <MenuOption text="Dodaj osobę HR" url="/add-hr">
                    <RiUserStarLine className="h-6 w-6"/>
                </MenuOption>
            </>
        }

        {user?.role === 'student' &&
            <>
                <MenuOption text="Zobacz swoje CV" url="/dashboard">
                    <RiUserSearchLine className="h-6 w-6"/>
                </MenuOption>

                <MenuOption text="Zmień swoje dane" url="#">
                    <RiUserSettingsLine className="h-6 w-6"/>
                </MenuOption>

                <MenuOption text=" Znalazłem/am pracę!" url="#">
                    <MdOutlineHandshake className="h-6 w-6"/>
                </MenuOption>

                <StudentSummary firstName="Jan" lastName="Kowalski" avatarUrl="" githubName="gitName" phone="+48 797 797 797" email="student@test.com" about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."/>
            </>
        }
    </SideMenu>
};