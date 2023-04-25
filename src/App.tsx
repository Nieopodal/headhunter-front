import React from 'react';
import {Dashboard} from "./components/Dashboard";


export const App = () => {
    const user = {name: "Joanna Testowa"} //temp user obj
    return (
    <>
        <Dashboard userName={user.name}/>
    </>
)
}

