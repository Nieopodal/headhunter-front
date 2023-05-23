import React from "react";

interface Props {
    bigger?: boolean;
    imgUrl?: string;
}

export const Avatar = ({bigger, imgUrl}: Props) => (
    <label className={` btn-circle cursor-pointer avatar ${bigger && ' xl:w-40 xl:h-40 w-20 h-20'}`}>
        <div className="rounded-full">
            <img
                className="object-contain"
                src={imgUrl ? imgUrl : "https://randomuser.me/api/portraits/lego/2.jpg"}
                alt="user profile"
            />
        </div>
    </label>
);