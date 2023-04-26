import React, {PropsWithChildren} from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Header = (props: PropsWithChildren) => {
    return (
        <div className="flex justify-center items-center bg-base-200 w-full h-[80px]">
            <div className="flex place-content-between items-center w-[1430px] h-full">
                <a href="#"><img className="w-24 p-3" src={logo} alt="logo"/></a>
                //test
                <div tabIndex={0}
                     className="relative cursor-pointer flex items-center gap-7 bg-base-200 dropdown dropdown-end px-3">
                    <div className="flex items-center"><label className="btn-circle cursor-pointer avatar">
                        <div className="w-20 rounded-full">
                            <img src="https://randomuser.me/api/portraits/women/79.jpg"/>
                        </div>
                    </label>
                        <span className="font-normal text-lg ml-3">
                            {props.children}
                        </span></div>
                    <span>🞃</span>
                    <ul tabIndex={0}
                        className="absolute top-[50px] mt-3 menu dropdown-content bg-base-200 w-full font-normal text-lg">
                        <li>
                            <Link to="/pass-reset">
                                Zmiana hasła
                            </Link>
                        </li>
                        <li>
                            <a>
                                Wyloguj
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}