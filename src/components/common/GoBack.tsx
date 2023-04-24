import goBack from "../../assets/arrow-go-back.svg";
import React from "react";

export const GoBack = () => {
    return (
        <div className=""><a href="#" className="flex items-end text-base font-bold"><img src={goBack}/>Wróć</a></div>
    );
}