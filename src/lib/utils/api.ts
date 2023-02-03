import type { APIResponse } from "$lib/server/response";

interface APIOptions {
    body?: any;
    headers?: { [key: string]: string };
    method?: "GET" | "POST";
}

export const api = async (path: string, options: APIOptions = {}): Promise<APIResponse> => {
    let { body, headers = {}, method } = options;

    const url = `${window.origin}/api/${path}`;

    const token = localStorage.getItem("token");
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
        headers["Content-Type"] = "applicaton/json";

        if (!method) {
            method = "POST"
        }
    }

    let resp;
    try {
        resp = await fetch(url, {
            method: method || "GET",
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })
    } catch (e) {
        return { success: false, message: "Unexpected error" }
    }

    let json;
    try {
        json = await resp.json();
    } catch (e) {
        return { success: false, message: "Invalid JSON" }
    }

    return json;
}