import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TemporaryUserEntity, UserContext} from "../contexts/user.context";
import {LoginFormData} from "../types/LoginFormData";
import {ApiResponse} from 'types';

export const useAuth = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);

    const findUser = async () => {
        try {
            const res = await fetch('http://localhost:3001/check-user', {
                method: "GET",
                credentials: "include",
            });

            const data: ApiResponse<TemporaryUserEntity> = await res.json();
            //@TODO remove temporary user entity and get the real one

            if (data.isSuccess) {
                setUser(data.payload);
            } else if (data.error) {
                setError(data.error);
            } else {
                setError('Wystąpił błąd podczas próby pobrania użytkownika.');
            }
        } catch (e) {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        }
    };

    const loginUser = async (formData: LoginFormData) => {
        try {
            const res = await fetch('http://localhost:3001/user', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data: ApiResponse<TemporaryUserEntity> = await res.json();

            if (data.isSuccess) {
                await findUser();
                navigate('/dashboard', {replace: true});
            } else if (data.error) {
                setError(data.error);
            } else {
                setError('Wystąpił błąd podczas logowania.');
            }
        } catch (e) {
            setError('Podczas próby wykonania zapytania wystąpił błąd.');
        }
    };

    return {
        user, setUser, error, setError, loginUser, findUser,
    }
};


// export const useAuth = () => {
//     const navigate = useNavigate();
//
//     const {user, setUser} = useContext(UserContext);
//     const [error, setError] = useState<string | null>(null);
//
//     const createUserContext = (user: TemporaryUserEntity) => {
//         setUser(user);
//         localStorage.setItem("user", JSON.stringify(user));
//     };
//
//     const removeUserContext = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//     };
//
//     const getUserFromLocalStorage = () => {
//         const userObject = localStorage.getItem("user");
//         if (userObject) {
//             setUser(JSON.parse(userObject));
//             return true;
//         } else return false;
//     };
//
//     const loginUser = async (formData: LoginFormData) => {
//         try {
//             const res = await fetch('http://localhost:3001/user/', {
//                 method: "POST",
//                 credentials: "include",
//                 body: JSON.stringify(formData),
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });
//
//             const data: ApiResponse<TemporaryUserEntity> = await res.json();
//
//             if (data.isSuccess) {
//                 createUserContext(data.payload);
//                 navigate('/dashboard', {replace: true});
//             } else if (data.error) {
//                 setError(data.error);
//             } else {
//                 setError('Wystąpił błąd podczas logowania.');
//             }
//         } catch (e) {
//             setError('Podczas próby wykonania zapytania wystąpił błąd.');
//         }
//     };
//
//     return {
//         user, setUser, error, setError, loginUser, getUserFromLocalStorage, removeUserContext,
//     }
// };