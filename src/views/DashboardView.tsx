import {useContext} from "react";
import {UserContext} from "../contexts/user.context";

import {StudentDashboardView} from "./StudentDashboardView";
import {UserRole} from "../types/UserRole";

export const DashboardView = () => {
    const {user} = useContext(UserContext);

    return <div>
        {user?.role === UserRole.Student && <StudentDashboardView/>}
        </div>
};