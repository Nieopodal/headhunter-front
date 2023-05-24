import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  children: ReactNode;
  text: string;
  url: string;
}

export const MenuOption = ({ children, text, url }: Props) => (
  <li>
    <NavLink
      to={url}
      style={{ background: "e02735" }}
      className="flex justify-center mb-2 mx-1 sm:text-sm md:text-base"
    >
      {children}
      {text}
    </NavLink>
  </li>
);
