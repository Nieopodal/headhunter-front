import logo from "../../assets/logo.png";
import React from "react";

interface Props {
    classes: string;
}

export const AppLogo = ({classes}: Props) => (
    <img className={classes} src={logo} alt="logo"/>
);