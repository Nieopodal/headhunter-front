import {useContext, useState} from "react";
import {TemporaryUserEntity, UserContext} from "../contexts/user.context";
import {LoginFormData} from "../types/LoginFormData";
import {apiUrl} from "../config/api";
import {ApiResponse} from "types";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const findUser = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/refresh`, {
                method: "POST",
                credentials: "include",
            });
            const data: any = await res.json();
            console.log(data)

            if (data.isSuccess) {
                setUser({
                    ...user,
                    access_token: data.access_token,
                } as TemporaryUserEntity);
            } else {
                setError(data.error);
            }

        } catch {
            setError('Wystąpił błąd podczas próby wykonania zapytania');
        } finally {
            setLoading(false)
        }
    };

    const loginUser = async (formData: LoginFormData) => {
        try {
            const res = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data: ApiResponse<TemporaryUserEntity> = await res.json();

            if (data.isSuccess) {
                setUser(data.payload);
                navigate('/dashboard', {replace: true})
            } else {
                setError(data.error)
            }
        } catch {
            setError('Wystąpił błąd podczas próby wykonania zapytania.');
        }
    };

    return {
        user, setUser, error, setError, loginUser, findUser, loading
    }
};