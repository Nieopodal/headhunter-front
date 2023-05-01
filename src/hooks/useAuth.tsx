import {useContext, useState} from "react";
import {TemporaryUserEntity, UserContext} from "../contexts/user.context";
import {LoginFormData} from "../types/LoginFormData";
import {apiUrl} from "../config/api";
import {useNavigate} from "react-router-dom";
import {useFetch} from "./useFetch";

export const useAuth = () => {
    const navigate = useNavigate();
    const {fetchApi, data, apiError} = useFetch();
     const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const findUser = async () => {
        // @TODO: this function should get new access token and actual user object!
        setLoading(true);
        await fetchApi(user, `${apiUrl}/auth/refresh`, "POST", "Wystąpił nieznany błąd.");
        if (data) {
            setUser({
                ...user,
                access_token: (data as TemporaryUserEntity).access_token,
            } as TemporaryUserEntity);
        } else {
            setError(apiError);
        }
        setLoading(false);
    };

    const loginUser = async (formData: LoginFormData) => {

        setLoading(true);
        await fetchApi(null, `${apiUrl}/auth/login`, "POST", "Wystąpił nieznany błąd.", formData, true, "application/json");
        if (data) {
            setUser(data as TemporaryUserEntity);
            navigate('/dashboard', {replace: true});
        } else {
            setError(apiError);
        }
        setLoading(false);

    };

    return {
        user, setUser, error, setError, loginUser, findUser, loading
    }
};