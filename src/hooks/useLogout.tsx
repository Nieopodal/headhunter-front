import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../contexts/user.context";
import {useFetch} from "./useFetch";
import {apiUrl} from "../config/api";
import { ApiResponse } from "types";

export const useLogout = () => {
    let navigate = useNavigate();
    const {setUser, user} = useContext(UserContext);
    const {apiLoading} = useFetch();
    const [error] = useState<string | null>(null);

    const logoutUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${user?.access_token}`,
                }
            });
            const data: ApiResponse<null> =await res.json();
            if (data.isSuccess) {
                setUser(null);
                navigate('/', {replace: true});
            } else {
                console.log(data.error);
            }
        } catch {
            console.log('Podczas próby wykonania zapytania wystąpił błąd');
        }
    };

    return {logoutUser, error, apiLoading};
};