import goBack from "../../assets/arrow-go-back.svg";
import React from "react";
import {useNavigate} from "react-router-dom";

export const GoBack = () => {
    const navigate = useNavigate();
    return (
        <div className=""><a onClick={() => navigate(-1)} className="cursor-pointer flex items-end text-base font-bold"><img src={goBack}/>Wróć</a></div>
    );
}