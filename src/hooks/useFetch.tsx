import {useContext, useState} from "react";
import {fetchHandler} from "../handlers/fetch-handler";
import {TemporaryUserEntity, UserContext} from "../contexts/user.context";
import {apiUrl} from "../config/api";

export const useFetch = () => {
    const {setUser} = useContext(UserContext);
    const [data, setData] = useState<unknown | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    async function fetchApi<T> (user: TemporaryUserEntity | null, url: string, method: string = "GET", customErrMsg: string, body?: T, asJson?: boolean, contentType?: string) {
        try {
            setApiLoading(true);
            const res = await fetchHandler(user, url, method, body, asJson, contentType);
            const data = await res.json();
            if (data.isSuccess) {
                setData(data.payload as unknown);
            } else if (data.error) {
                if (user && (res.status === 403 || 401)) {
                    const refreshRes = await fetchHandler(user, `${apiUrl}/auth/refresh`, "POST");
                    //@TODO: this should be changed into separate and better functions
                    const refreshData: any = await refreshRes.json();
                    if (refreshData.isSuccess) {
                        setUser({
                            ...user,
                            access_token: refreshData.access_token,
                        } as TemporaryUserEntity);

                        const res = await fetchHandler(user, url, method, body, asJson, contentType);
                        const data = await res.json();
                        if (data.isSuccess) {
                            setData(data.payload as unknown);
                        } else {
                            setApiError(data.error);
                        }
                    } else {
                        setApiError(refreshData.error)
                    }
                }
                setApiError(data.error);
            } else {
                setApiError(customErrMsg);
            }
        } catch (e) {
            setApiError('Podczas próby wykonania zapytania wystąpił błąd.');
        } finally {
            setApiLoading(false);
        }
    }

    return {fetchApi, data, apiError, apiLoading};
}