import {createContext} from "react";
import {UserRole} from "../types/UserRole";

export interface TemporaryUserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    access_token: string;
    role: UserRole;
}

interface UserContextInterface {
    user: TemporaryUserEntity | null;
    isLoading: boolean;
    setUser: (payload: TemporaryUserEntity | null) => void;
    error: string | null;
}

export const UserContext = createContext<UserContextInterface>({
    user: null,
    error: null,
    isLoading: false,
    setUser: () =>{},
});