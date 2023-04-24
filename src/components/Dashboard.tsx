import logo from "../assets/logo.png";
import React, {useState} from "react";

export const Dashboard = () => {
    const [checked, setChecked] = useState(true);
    const user = {name: "Joanna Testowa"} //temp user obj
    return (
        <div className="flex justify-center items-center bg-base-200 w-full h-[80px]">
            <div className="flex place-content-between items-center w-[1430px] h-full">

                <a href="src#"><img className="w-24 p-3" src={logo} alt="logo"/></a>
                <div tabIndex={0}
                     className="relative cursor-pointer flex items-center gap-7 bg-base-200 dropdown dropdown-end px-3">
                    <div className="flex items-center"><label className="btn-circle cursor-pointer avatar">
                        <div className="w-20 rounded-full">
                            <img src="https://randomuser.me/api/portraits/women/79.jpg"/>
                        </div>
                    </label>
                        <span className="font-normal text-lg ml-3">
                            {user.name}
                        </span></div>
                    <span>🞃</span>
                    <ul tabIndex={0}
                        className="absolute top-[50px] mt-3 menu dropdown-content bg-base-200 w-full font-normal text-lg">
                        <li>
                            <a>
                                Konto
                            </a>
                        </li>
                        <li>
                            <a>
                                Wyloguj
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/*temp modal*/}
            <input type="checkbox" id="my-modal-4" checked={checked} onClick={() => setChecked(prev => !prev)}
                   className="modal-toggle"/>
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative bg-success/70 shadow-none" htmlFor="">
                    <h3 className="text-lg font-bold">Logowanie udane!</h3>
                    <p className="py-4">Dobrze Cię widzieć, {user.name}</p>
                </label>
            </label>
        </div>
    )
}