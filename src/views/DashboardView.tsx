import {useContext} from "react";
import {UserContext} from "../contexts/user.context";
import {StudentDashboardView} from "./StudentDashboardView";
import {UserRole} from "../types/UserRole";
import {HrDashboardView} from "./HrDashboardView";
import {AdminView} from "./AdminView";

export const DashboardView = () => {
    const {user} = useContext(UserContext);

    return <div>
        {user!.role === UserRole.Student && <StudentDashboardView/>}
        {user!.role === UserRole.Hr && <HrDashboardView/>}
        {user!.role === UserRole.Admin && <AdminView/>}
    </div>
};