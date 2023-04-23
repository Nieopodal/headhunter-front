import React, {useEffect} from 'react';
import {LoginPanel} from "./LoginPanel";
import {useAuth} from "./hooks/useAuth";
import { UserContext} from "./contexts/user.context";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import {DashboardView} from "./views/DashboardView";

export const App = () => {
    const {user, setUser, error, apiLoading, findUser} = useAuth();

    useEffect(() => {
        (async () => {
            await findUser();
        })();
    }, [user, findUser]);

    return <UserContext.Provider value={{
        user,
        setUser,
        error,
        isLoading: apiLoading,
    }}>
    <Routes>
        <Route path="/login" element={<LoginPanel/>}/>
        <Route path="/dashboard" element={<PrivateRoute outlet={<DashboardView/>}/>}/>

    </Routes>
</UserContext.Provider>
};

