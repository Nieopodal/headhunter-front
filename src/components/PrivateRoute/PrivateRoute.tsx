import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../../contexts/user.context";
import {UserRole} from "../../types/UserRole";

export type ProtectedRouteProps = {
    outlet: JSX.Element;
    accessFor?: UserRole[];
};

export const PrivateRoute = ({outlet, accessFor}: ProtectedRouteProps) => {
    const {user, isLoading} = useContext(UserContext);

    if (isLoading) {
        return <p>Ładowanie danych, potrzebny spinner...</p>
    }
    if (user) {
        if (!accessFor) return outlet;
        else {
            return accessFor.includes(user?.role) ? outlet : <Navigate to={{pathname: '/dashboard'}}/>
        }
    } else {
        return <Navigate to={{pathname: '/'}}/>;
    }
};