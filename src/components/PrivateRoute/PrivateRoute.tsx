import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../../contexts/user.context";

export type ProtectedRouteProps = {
    outlet: JSX.Element;
};

export const PrivateRoute = ({outlet}: ProtectedRouteProps) => {
    const {user, isLoading} = useContext(UserContext);

    if (isLoading) {
        return <p>Ładowanie danych...</p>
    }
    if (user) {
        return outlet;
    } else {
        return <Navigate to={{pathname: '/login'}}/>;
    }
};