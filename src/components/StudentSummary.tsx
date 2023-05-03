import {Avatar} from "./Header/Avatar";
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
    <div className="flex flex-col p-4 text-sm">
        <div className="flex flex-col items-center">
            <Avatar customSize="40" imgUrl={avatarUrl}/>
            <div className="text-xl font-bold my-1">
                {`${firstName} ${lastName}`}
            </div>
            <div className="flex" style={{color: "#0B8BD4"}}>
                <AiFillGithub/> {githubName}
            </div>
        </div>

        <div className="my-2">
            <div className="flex">
                <BsFillTelephoneFill color="grey"/> <span className="ml-2">{phone}</span>
            </div>
            <div className="flex">
                <GrMail color="grey"/> <span className="ml-2">{email}</span>
            </div>
        </div>

        <div className="w-[180px] break-words">
            <span style={{color: "#838484"}}>o mnie</span>
            <p>
                {about}
            </p>
        </div>
    </div>
);