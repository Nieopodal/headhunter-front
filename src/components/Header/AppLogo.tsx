import logo from "../../assets/logo.png";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

interface Props {
  classes: string;
}

export const AppLogo = ({ classes }: Props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate(user ? `/dashboard` : `/`)}
      className={classes}
      src={logo}
      alt="logo"
    />
  );
};
