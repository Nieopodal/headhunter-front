import {useContext} from "react";
import {UserContext} from "../contexts/user.context";
import {HrView} from "./HrView/HrView";

export const DashboardView = () => {
    const {user} = useContext(UserContext)

    return <div>
        {user!.role === "hr" ? <HrView/> : null}
        </div>
};