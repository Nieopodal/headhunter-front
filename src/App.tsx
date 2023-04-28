import React, {useEffect, useState} from 'react';
import {LoginView} from "./views/LoginView";
import {useAuth} from "./hooks/useAuth";
import {TemporaryUserEntity, UserContext} from "./contexts/user.context";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./components/Guards/PrivateRoute";
import {AdminFileUploadView} from "./views/AdminFileUploadView";
import {AdminAddHrView} from "./views/AdminAddHrView";
import {PasswordReset} from "./components/PasswordReset/PasswordReset";
import {DashboardView} from "./views/DashboardView";
import {RoleGuard} from "./components/Guards/RoleGuard";

export const App = () => {
    const {error, findUser, loading} = useAuth();
    const [user, setUser] = useState<TemporaryUserEntity | null>(null);

    useEffect(() => {
        (async () => {
            console.log(user);
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
            <Route path="/login" element={<LoginView/>}/>
            <Route path="/dashboard" element={<PrivateRoute outlet={<DashboardView/>}/>}/>

            <Route
                path="/add-students"
                element={
                    <PrivateRoute
                        outlet={<RoleGuard outlet={<AdminFileUploadView/>} accessFor="admin"/>}
                    />
                }
            />

            <Route
                path="/add-hr"
                element={
                    <PrivateRoute
                        outlet={<RoleGuard outlet={<AdminAddHrView/>} accessFor="admin"/>}
                    />
                }
            />

            {/*<Route*/}
            {/*    path='/change-cv'*/}
            {/*    element={*/}
            {/*        <PrivateRoute*/}
            {/*            outlet={*/}
            {/*                <RoleGuard outlet={< xxxx />} accessFor="student"/>*/}
            {/*            }*/}
            {/*        />*/}
            {/*    }*/}
            {/*/>*/}

            {/*<Route path='/see-cv'/>  to chyba jako zwykły dashboard dla usera?*/}
            {/*<Route path='/got-employed'/> to chyba nie musi być osobna ścieżka, tylko sam fetch na BE*/}

            <Route path='/reset-password' element={<PasswordReset/>}/>
        </Routes>
    </UserContext.Provider>
};

