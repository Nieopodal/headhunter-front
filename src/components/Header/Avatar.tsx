import React from "react";

export const Avatar = () => {

    // if user.role !== admin -> fetch to get user's GtiHub or get this with login!

    return <label className="btn-circle cursor-pointer avatar">
        <div className="w-20 rounded-full">
            <img src="https://randomuser.me/api/portraits/lego/2.jpg" alt="user profile"/>
        </div>
    </label>
};