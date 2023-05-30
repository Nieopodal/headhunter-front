import {useContext, useState} from "react";
import { fetchHandler } from "../handlers/fetch-handler";
import {BaseUserEntity, UserContext} from "../contexts/user.context";
import { apiUrl } from "../config/api";
import {ApiResponse, Tokens } from "@Types";

export const useFetch = () => {
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState<unknown | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  async function fetchApi<T>(
    user: BaseUserEntity | null,
    url: string,
    method: string = "GET",
    customErrMsg: string,
    body?: T,
    asJson?: boolean,
    contentType?: string,
    innerToken?: string
  ): Promise<unknown> {
    try {
      setApiLoading(true);
      setApiError(null);
      const res = await fetchHandler(
        innerToken ?? user?.access_token,
        url,
        method,
        body,
        asJson,
        contentType
      );
      const data = await res.json();
      if (data.isSuccess) {
        setData(data.payload as unknown);
        return data.payload;
      } else if (res.status === 401 || res.status === 403) {
        const refreshRes = await fetchHandler(
          user?.access_token,
          `${apiUrl}/auth/refresh`,
          "POST"
        );
        const refreshData: ApiResponse<Tokens> = await refreshRes.json();

        if (refreshData.isSuccess) {
          setUser({
            ...user as BaseUserEntity,
            access_token: refreshData.payload.access_token,
          });

          const res = await fetchHandler(
            refreshData.payload.access_token,
            url,
            method,
            body,
            asJson,
            contentType
          );
          const data = await res.json();

          if (data.isSuccess) {
            setData(data.payload as unknown);
            return data.payload;
          } else {
            setApiError(data.error);
          }
        } else {
          setApiError(refreshData.error);
        }
      } else {
        setApiError(data.error);
      }
    } catch (e) {
      setApiError("Podczas próby wykonania zapytania wystąpił błąd.");
    } finally {
      setApiLoading(false);
    }
  }

  return { fetchApi, data, apiError, apiLoading };
};
