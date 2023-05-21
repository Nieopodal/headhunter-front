import { createContext } from "react";
import { UserRole } from "../types";

export interface BaseUserEntity {
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
  user: BaseUserEntity | null;
  isLoading: boolean;
  setUser: (payload: BaseUserEntity | null) => void;
  error: string | null;
  rerender: boolean;
  setRerender: () => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  error: null,
  isLoading: false,
  rerender: false,
  setUser: () => {},
  setRerender: () => {},
});
