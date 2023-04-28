import {createContext} from "react";

enum TemporaryUserRole {
    Admin = "admin",
    Student = "student",
    Hr = "hr",
}

export interface TemporaryUserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    access_token: string;
    role: TemporaryUserRole;
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