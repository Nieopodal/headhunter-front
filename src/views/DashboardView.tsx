import {useContext} from "react";
import {UserContext} from "../contexts/user.context";
import {StudentDashboardView} from "./StudentDashboardView";
import {HrView} from "./HrView/HrView";
import {UserRole} from "../types/UserRole";
import {AdminView} from "./AdminView";

export const DashboardView = () => {
    const {user} = useContext(UserContext);

    return <div>
        {user!.role === UserRole.Student && <StudentDashboardView/>}
        {user!.role === UserRole.Hr && <HrView/>}
        {user!.role === UserRole.Admin && <AdminView/>}
        </div>
};