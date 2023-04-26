import {useState} from "react";
import {ApiResponse} from "types";
import {fetchHandler} from "../handlers/fetch-handler";

export const useFetch = () => {
    const [data, setData] = useState<unknown | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    async function fetchApi<T> (url: string, method: string = "GET", customErrMsg: string, body?: T, asJson?: boolean, contentType?: string) {
        try {
            setApiLoading(true);
            const res = await fetchHandler(url, method, body, asJson, contentType);

            const data: ApiResponse<unknown> = await res.json();

            if (data.isSuccess) {
                setData(data.payload as any);
            } else if (data.error) {
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

    return {data, apiError, apiLoading};
}