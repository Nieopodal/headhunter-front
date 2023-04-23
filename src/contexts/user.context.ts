import {createContext} from "react";

enum TemporaryUserRole {
    Admin,
    Student,
    Hr,
}

export interface TemporaryUserEntity {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: TemporaryUserRole;
}

interface UserContextInterface {
    user: TemporaryUserEntity | null;
    isLoading: boolean;
    setUser: (payload: TemporaryUserEntity | null) => void;
    error: string | null;
}

// @TODO :delete temporary interfaces and get the real ones

export const UserContext = createContext<UserContextInterface>({
    user: null,
    error: null,
    isLoading: false,
    setUser: () =>{},
});