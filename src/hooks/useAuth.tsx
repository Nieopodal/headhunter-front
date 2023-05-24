import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUserEntity, UserContext } from "../contexts/user.context";
import { LoginFormData } from "../types/LoginFormData";
import { apiUrl } from "../config/api";
import { useFetch } from "./useFetch";

export const useAuth = () => {
  const navigate = useNavigate();
  const { fetchApi, apiError } = useFetch();
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const findUser = async () => {
    setLoading(true);
    const restoredUser = await fetchApi(
      user,
      `${apiUrl}/auth/user`,
      "GET",
      "Wystąpił nieznany błąd."
    );
    if (restoredUser) {
      setUser({
        ...restoredUser,
      } as BaseUserEntity);
    } else {
      setError(apiError);
    }
    setLoading(false);
  };

  const loginUser = async (formData: LoginFormData) => {
    setLoading(true);
    const loggedUser = await fetchApi(
      null,
      `${apiUrl}/auth/login`,
      "POST",
      "Wystąpił nieznany błąd.",
      formData,
      true,
      "application/json"
    );
    if (loggedUser) {
      setUser(loggedUser as BaseUserEntity);
      navigate("/dashboard", { replace: true });
    } else {
      setError("Błędny login i/lub hasło.");
    }
    setLoading(false);
  };

  return {
    user,
    setUser,
    error,
    loginUser,
    findUser,
    apiLoading: loading,
  };
};
