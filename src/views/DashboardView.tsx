import {useContext} from "react";
import {UserContext} from "../contexts/user.context";
import {StudentDashboardView} from "./Student/StudentDashboardView";
import {UserRole} from "@Types";
import {HrDashboardView} from "./Hr/HrDashboardView";
import {AdminDashboardView} from "./Admin/AdminDashboardView";

export const DashboardView = () => {
    const {user} = useContext(UserContext);

    return <div>
        {user!.role === UserRole.STUDENT && <StudentDashboardView/>}
        {user!.role === UserRole.HR && <HrDashboardView/>}
        {user!.role === UserRole.ADMIN && <AdminDashboardView/>}
    </div>
};