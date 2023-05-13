import {Avatar} from "./Avatar";
import {Dropdown} from "./Dropdown";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user.context";
import {UserRole} from "../../types/UserRole";
import {useFetch} from "../../hooks/useFetch";
import {apiUrl} from "../../config/api";

export const HeaderMenu = () => {
    const {user, rerender} = useContext(UserContext);
    const {fetchApi} = useFetch();
    const [githubUsername, setGithubUsername] = useState<string | null>(user!.githubUsername ?? null);

    useEffect(() => {
        user?.role === UserRole.Student && (async () => {
            const avatar = await fetchApi(user, `${apiUrl}/student/avatar`, "GET", "Wystąpił nieznany błąd");
            if (avatar) setGithubUsername(avatar as string);
        })();
    }, [rerender]);

    return <div tabIndex={0}
                className="relative cursor-pointer flex items-center gap-7 bg-base-200 dropdown dropdown-end px-3"
    >
        <div className="flex items-center">
            <Avatar imgUrl={(githubUsername) ? `https://github.com/${githubUsername}.png` : ''}/>
            <span className="font-normal text-lg ml-3">
                {user!.role === "admin" ? `Administrator` : null}
                {user!.role === "hr" ? `${user?.fullName}` : null}
                {user!.role === "student" ? `${user?.firstName} ${user?.lastName}` : null}
            </span>
        </div>
        <span>🞃</span>
        <Dropdown/>
    </div>
};