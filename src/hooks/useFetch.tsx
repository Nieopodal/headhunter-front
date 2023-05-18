import {useState} from "react";
import {fetchHandler} from "../handlers/fetch-handler";
import {TemporaryUserEntity} from "../contexts/user.context";
import {apiUrl} from "../config/api";

export const useFetch = () => {
    const [data, setData] = useState<unknown | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    async function fetchApi<T>(user: TemporaryUserEntity | null, url: string, method: string = "GET", customErrMsg: string, body?: T, asJson?: boolean, contentType?: string, innerToken?: string): Promise<unknown> {
        try {
            setApiLoading(true);
            const res = await fetchHandler(innerToken ?? user?.access_token, url, method, body, asJson, contentType);
            const data = await res.json();
            if (data.isSuccess) {
                setData(data.payload as unknown);
                return data.payload;
            } else if (res.status === 401 || res.status === 403) {
                const refreshRes = await fetchHandler(user?.access_token, `${apiUrl}/auth/refresh`, "POST");
                //@TODO: this should be changed into separate and better functions
                const refreshData: any = await refreshRes.json();
                if (refreshData.statusCode !== 403) {
                    const res = await fetchHandler(refreshData.access_token, url, method, body, asJson, contentType);
                    const data = await res.json();

                    if (data.isSuccess) {
                        setData(data.payload as unknown);
                        return data.payload;
                    } else {
                        setApiError(data.error);
                    }
                } else {
                    setApiError(refreshData.error)
                }
            }
        } catch (e) {
            setApiError('Podczas próby wykonania zapytania wystąpił błąd.');
        } finally {
            setApiLoading(false);
        }
    }

    return {fetchApi, data, apiError, apiLoading};
}