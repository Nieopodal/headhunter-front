import React from "react";
import {Menu} from "./Menu";
import {AdminFileUpload} from "./AdminFileUpload";
import {Header} from "./Header";
import {TempModal} from "./common/TempModal";
import {Routes, Route} from "react-router-dom";
import {AdminAddHrForm} from "./AdminAddHrForm";
import {PasswordReset} from "./PasswordReset";

type Props = {
    userName: string
}

export const Dashboard = ({userName}: Props) => {

    return (<>
        <TempModal userName={userName}/>

        <Header>
            {userName}
        </Header>

        <div className="flex flex-row justify-center items-center w-full mt-2">
            <div className="flex flex-row w-[1430px]">
                <Menu/>
                <Routes>
                    <Route path='/add-st' element={<AdminFileUpload/>}/>
                    <Route path='/add-hr' element={<AdminAddHrForm/>}/>
                    <Route path='see-cv'/>
                    <Route path='change-cv'/>
                    <Route path='got-employed'/>
                    <Route path='/pass-reset' element={<PasswordReset/>}/>
                </Routes>
            </div>
        </div>



    </>)
}