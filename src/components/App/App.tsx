import React, {useState} from 'react';
import {LoginView} from "../../views/LoginView";
import {useAuth} from "../../hooks/useAuth";
import {BaseUserEntity, UserContext} from "../../contexts/user.context";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import {AdminFileUploadView} from "../../views/AdminFileUploadView";
import {AdminAddHrView} from "../../views/AdminAddHrView";
import {PasswordReset} from "../PasswordReset/PasswordReset";
import {DashboardView} from "../../views/DashboardView";
import {DashboardContainer} from "../common/DashboardContainer";
import {UserRole} from "@Types";
import {ModalProvider} from "../../contexts/modal.context";
import {StudentDashboardView} from "../../views/StudentDashboardView";
import {PasswordSendNew} from "../PasswordSendNew/PasswordSendNew";
import {StudentCvForHr} from "../StudentCvForHr";
import {Loader} from "../common/Loader";
import {StudentFoundJobFormView} from "../../views/StudentFoundJobFormView";
import {HrFilteringProvider} from "../../contexts/hr.filtering.context";
import {NewUserView} from "../../views/NewUserView";


export const App = () => {
    const {error, apiLoading} = useAuth();
    const [user, setUser] = useState<BaseUserEntity | null>(null);
    const [rerender, setRerender] = useState<boolean>(false);

    if (apiLoading) return <Loader/>

    else return <UserContext.Provider value={{
        user: user,
        setUser,
        error,
        isLoading: apiLoading,
        rerender: rerender,
        setRerender: () => setRerender(prev => !prev),
    }}>

        <HrFilteringProvider>
            <ModalProvider>
                <DashboardContainer>

                    <Routes>
                        <Route path="/" element={<LoginView/>}/>
                        <Route path="/auth/new-user/:role/confirm/:id/:token" element={<NewUserView/>}/>
                        <Route path='/reset-password' element={<PasswordReset/>}/>
                        <Route path='/auth/reset-password/:role/confirm/:id/:token' element={<PasswordSendNew/>}/>
                        <Route path="/dashboard" element={<PrivateRoute outlet={<DashboardView/>}/>}/>

                        <Route path="/" element={<LoginView/>}/>
                        <Route path='/reset-password' element={<PasswordReset/>}/>
                        <Route path='/reset-password/:id/:token' element={<PasswordSendNew/>}/>
                        <Route path="/dashboard" element={<PrivateRoute outlet={<DashboardView/>}/>}/>

                        <Route
                            path="/add-students"
                            element={
                                <PrivateRoute
                                    outlet={<AdminFileUploadView/>}
                                    accessFor={[UserRole.ADMIN]}
                                />
                            }
                        />

                        <Route
                            path="/add-hr"
                            element={
                                <PrivateRoute
                                    outlet={<AdminAddHrView/>}
                                    accessFor={[UserRole.ADMIN]}
                                />
                            }
                        />

                        <Route
                            path='/change-cv'
                            element={
                                <PrivateRoute
                                    outlet={<StudentDashboardView showAsForm/>}
                                    accessFor={[UserRole.STUDENT]}/>
                            }
                        />

                        <Route
                            path='/student-cv/:studentId'
                            element={
                                <PrivateRoute
                                    outlet={<StudentCvForHr/>}
                                    accessFor={[UserRole.HR]}/>
                            }
                        />

                        <Route
                            path='/found-job'
                            element={
                                <PrivateRoute
                                    outlet={<StudentFoundJobFormView/>}
                                    accessFor={[UserRole.STUDENT]}/>
                            }
                        />


                        </Routes>

                </DashboardContainer>
            </ModalProvider>
        </HrFilteringProvider>
    </UserContext.Provider>
};

