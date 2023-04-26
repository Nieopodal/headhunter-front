import React, {useEffect, useState} from 'react';
import {LoginPanel} from "./LoginPanel";
import {useAuth} from "./hooks/useAuth";
import {TemporaryUserEntity, UserContext} from "./contexts/user.context";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import {DashboardView} from "./views/DashboardView";

export const App = () => {
    const {error, findUser, loading} = useAuth();
    const [user, setUser] = useState<TemporaryUserEntity | null>(null);

    useEffect(() => {
        (async () => {
            await findUser();
        })();
    }, [user]);

    return <UserContext.Provider value={{
        user,
        setUser,
        error,
        isLoading: loading,
    }}>
    <Routes>
        <Route path="/login" element={<LoginPanel/>}/>
        <Route path="/dashboard" element={<PrivateRoute outlet={<DashboardView/>}/>}/>
    </Routes>
</UserContext.Provider>
};

