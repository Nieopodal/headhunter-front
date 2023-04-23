import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../contexts/user.context";
import {useFetch} from "./useFetch";
import {apiUrl} from "../config/api";

export const useLogout = () => {
    let navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const {data, fetchApi, apiError, apiLoading} = useFetch();
    const [error, setError] = useState<string | null>(null);

    const logoutUser = async () => {
        await fetchApi(
            `${apiUrl}/auth/login`,
            'DELETE',
            'Podczas wylogowywania wystąpił błąd.',
        );
        if (apiError) {
            setError(apiError);
        }
        if (data) {
            setUser(null);
            navigate('/login', {replace: true});
        }
    };

    return {logoutUser, error, apiLoading};
};

//@TODO: remove this when unnecessary
// try {
//     const res = await fetch('http://localhost:3001/user/', {
//         method: "DELETE",
//         credentials: "include",
//     });
//     const data: ApiResponse<string> = await res.json();
//     if (data.isSuccess) {
//         setUser(null);
//         navigate('/login', {replace: true});
//     } else if (data.error) {
//         console.log("Błąd podczas wylogowania:", data.error);
//     } else {
//         console.log("Nieznany błąd podczas wylogowania:", data.error);
//     }
// } catch {
//     console.log("Podczas próby wykonania zapytania wystąpił błąd.");
// }