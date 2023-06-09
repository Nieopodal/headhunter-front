import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {
    RiUserSearchLine,
    RiUserSettingsLine,
    RiUserStarLine,
} from "react-icons/ri";
import {MdOutlineHandshake} from "react-icons/md";
import React, {useContext} from "react";
import {SideMenu} from "../common/SideMenu";
import {MenuOption} from "../common/MenuOption";
import {UserContext} from "../../contexts/user.context";
import {StudentSummaryFetched} from "../StudentSummary/StudentSummaryFetched";
import {UserRole} from "@Types";

export const UserSideMenu = () => {
    const {user} = useContext(UserContext);

    return <SideMenu roleException={UserRole.HR}>
        {user?.role === UserRole.ADMIN && (
            <>
                <MenuOption text="Dodaj kursantów" url="/add-students">
                    <AiOutlineUsergroupAdd className="h-6 w-6"/>
                </MenuOption>

                <MenuOption text="Dodaj osobę HR" url="/add-hr">
                    <RiUserStarLine className="h-6 w-6"/>
                </MenuOption>
            </>
        )}

        {user?.role === UserRole.STUDENT && (
            <>
                <StudentSummaryFetched/>

                <MenuOption text="Zobacz swoje CV" url="/dashboard">
                    <RiUserSearchLine className="h-6 w-6"/>
                </MenuOption>

                <MenuOption text="Zmień swoje dane" url="/change-cv">
                    <RiUserSettingsLine className="h-6 w-6"/>
                </MenuOption>

                <MenuOption text=" Znalazłem/am pracę!" url="/found-job">
                    <MdOutlineHandshake className="h-6 w-6"/>
                </MenuOption>
            </>
        )}
    </SideMenu>
};
