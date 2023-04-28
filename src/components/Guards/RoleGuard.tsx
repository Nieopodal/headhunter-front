import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../../contexts/user.context";

export type ProtectedRouteProps = {
    outlet: JSX.Element;
    accessFor: string;
//     @TODO change it to enum from BE
};

export const RoleGuard = ({outlet, accessFor}: ProtectedRouteProps) => {
    const {user, isLoading} = useContext(UserContext);

    if (isLoading) {
        return <p>Ładowanie danych...</p>
    }

    return user?.role === accessFor ? outlet : <Navigate to={{pathname: '/dashboard'}}/>
};