import {Avatar} from "../Header/Avatar";
import {AiFillGithub} from "react-icons/ai";
import {BsFillTelephoneFill} from "react-icons/bs";
import {GrMail} from "react-icons/gr";
import React from "react";

interface Props {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    githubName: string;
    phone: string;
    email: string;
    about: string;
}

export const StudentSummary = ({email, about, githubName, firstName, lastName, phone, avatarUrl}: Props) => (
    <div className="flex flex-col p-4 text-sm sm:col-span-3 sm:my-4 xl:my-0">
        <div className="sm:grid sm:grid-cols-3 xl:block ">
            <div className="flex items-center sm:col-span-3 mb-4">
                <div className="flex xl:flex-col items-center">
                    <Avatar customSize="40" imgUrl={avatarUrl ?? ""}/>
                    <div className="flex flex-col ml-2">
                        <div className="text-3xl xl:text-xl font-bold">
                            {`${firstName} ${lastName}`}
                        </div>
                        <div className="flex sm:justify-start xl:justify-center" style={{color: "#0B8BD4"}}>
                            <AiFillGithub/> {githubName}
                        </div>
                    </div>
                </div>

            </div>
            <div className="my-2 flex flex-col justify-center">
            <div className="flex">
                <BsFillTelephoneFill color="grey"/> <span className="ml-2">{phone}</span>
            </div>
            <div className="flex">
                <GrMail color="grey"/> <span className="ml-2">{email}</span>
            </div>
        </div>
            <div className="w-[180px] break-words sm:col-span-2 w-full">

                <span style={{color: "#838484"}}>o mnie</span>
                <p>
                    {about}
                </p>
            </div>
        </div>
    </div>
);