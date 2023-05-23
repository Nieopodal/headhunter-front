import React, {useContext, useEffect, useState} from "react";
import {Avatar} from "./Avatar";
import {Dropdown} from "./Dropdown";
import {UserContext} from "../../contexts/user.context";
import {UserRole} from "@Types";
import {useFetch} from "../../hooks/useFetch";
import {apiUrl} from "../../config/api";

export const HeaderMenu = () => {
    const {user, rerender} = useContext(UserContext);
    const {fetchApi} = useFetch();
    const [githubUsername, setGithubUsername] = useState<string | null>(user!.githubUsername ?? null);

    useEffect(() => {
        user?.role === UserRole.STUDENT && (async () => {
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
                {user!.role === UserRole.ADMIN ? `Administrator` : null}
                {user!.role === UserRole.HR ? `${user?.fullName}` : null}
                {user!.role === UserRole.STUDENT ? `${user?.firstName} ${user?.lastName}` : null}
            </span>
        </div>
        <span>🞃</span>
        <Dropdown/>
    </div>
};