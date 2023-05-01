import {TemporaryUserEntity} from "../contexts/user.context";

export async function fetchHandler<T> (user: TemporaryUserEntity | null, url: string, method: string = "GET", body?: T, asJson?: boolean, contentType?: string): Promise<Response> {

    if (!body) return await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${user?.access_token}`,
        },
    });

    else return await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${user?.access_token}`,
            "Content-Type": contentType!,
        },
        body: asJson ? JSON.stringify(body as BodyInit) : body as BodyInit,
    });
}