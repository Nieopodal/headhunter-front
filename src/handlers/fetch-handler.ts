export async function fetchHandler<T>(token: string | undefined, url: string, method: string = "GET", body?: T, asJson?: boolean, contentType?: string): Promise<Response> {

    if (!body) return await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    else return await fetch(url, {
        method: method,
        credentials: "include",
        headers: contentType ? {
            "Authorization": `Bearer ${token}`,
            "Content-Type": contentType!,
        } : {
            "Authorization": `Bearer ${token}`,
        },
        body: asJson ? JSON.stringify(body as BodyInit) : body as BodyInit,
    });
}