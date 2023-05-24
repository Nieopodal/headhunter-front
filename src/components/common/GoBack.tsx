import React from "react";
import { useNavigate } from "react-router-dom";
import goBack from "../../assets/arrow-go-back.svg";

export const GoBack = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="cursor-pointer flex items-end text-base font-bold"
    >
      <img src={goBack} alt="go back icon" />
      Wróć
    </button>
  );
};
