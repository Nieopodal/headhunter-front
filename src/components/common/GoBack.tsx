import React from "react";
import {useNavigate} from "react-router-dom";

export const GoBack = () => {
    const navigate = useNavigate();
    return <button
        onClick={() => navigate(-1)}
        className="cursor-pointer flex items-end text-base font-bold"
    >
        Wróć
    </button>
};
