import React from "react";

interface Props {
    customSize?: string;
    imgUrl?: string;
}

export const Avatar = ({customSize, imgUrl}: Props) => {

    // if user.role !== admin -> fetch to get user's GtiHub or get this with login!

    return <label className={`${customSize ? `w-${customSize} h-${customSize}` : `w-10 h-10`} btn-circle cursor-pointer avatar`}>
        <div className="rounded-full">
            <img className="object-contain" src={imgUrl ? imgUrl : "https://randomuser.me/api/portraits/lego/2.jpg"} alt="user profile"/>
        </div>
    </label>
};