import {useNavigate} from "react-router-dom";
import { ApiResponse } from "types";
import {useContext} from "react";
import {UserContext} from "../contexts/user.context";

export const useLogout = () => {
    let navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const logoutUser = async () => {
        try {
            const res = await fetch('http://localhost:3001/user/', {
                method: "DELETE",
                credentials: "include",
            });
            const data: ApiResponse<string> = await res.json();
            if (data.isSuccess) {
                setUser(null);
                navigate('/login', {replace: true});
            } else if (data.error) {
                console.log("Błąd podczas wylogowania:", data.error);
            } else {
                console.log("Nieznany błąd podczas wylogowania:", data.error);
            }
        } catch {
            console.log("Podczas próby wykonania zapytania wystąpił błąd.");
        }
    };

    return {logoutUser};
};