import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {HrView} from "./views/HrView/HrView";
import {Modal} from "./components/common/Modal";
import {log} from "util";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <HrView/>
        </BrowserRouter>
    </React.StrictMode>
);

