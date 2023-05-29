import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { useFetch } from "./useFetch";
import { apiUrl } from "../config/api";

export const useLogout = () => {
  let navigate = useNavigate();
  const { fetchApi, apiError, apiLoading } = useFetch();
  const { setUser, user } = useContext(UserContext);
  const [error] = useState<string | null>(null);

  const logoutUser = async () => {
    await fetchApi(
      user,
      `${apiUrl}/auth/logout`,
      "POST",
      "Wystąpił nieznany błąd."
    );
    if (!apiError) {
      setUser(null);
      navigate("/", { replace: true });
    }
  };

  return { logoutUser, error, apiLoading };
};
