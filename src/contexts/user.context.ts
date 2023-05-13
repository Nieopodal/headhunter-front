import {createContext} from "react";
import {UserRole} from "../types/UserRole";

export interface TemporaryUserEntity {
    id: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    githubUsername?: string;
    email: string;
    access_token: string;
    role: UserRole;
}

interface UserContextInterface {
    user: TemporaryUserEntity | null;
    isLoading: boolean;
    setUser: (payload: TemporaryUserEntity | null) => void;
    error: string | null;
    rerender: boolean;
    setRerender: () => void;
}

export const UserContext = createContext<UserContextInterface>({
    user: null,
    error: null,
    isLoading: false,
    rerender: false,
    setUser: () =>{},
    setRerender: () => {},
});