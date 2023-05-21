import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { StudentDashboardView } from "./StudentDashboardView";
import { UserRole } from "../types";
import { HrDashboardView } from "./HrDashboardView";
import { AdminView } from "./AdminView";

export const DashboardView = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user!.role === UserRole.STUDENT && <StudentDashboardView />}
      {user!.role === UserRole.HR && <HrDashboardView />}
      {user!.role === UserRole.ADMIN && <AdminView />}
    </div>
  );
};
