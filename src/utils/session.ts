import { TokenInformation } from "../types_definition/data";

export async function fetchApiToken(reqParams: {
    username: string,
    password: string
}) {
    const urlParams = new URLSearchParams({
        "username": reqParams.username,
        "password": reqParams.password,
        "scope": "samples goals profile stats"
    });
    
    return await (await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlParams.toString(), 
    })).json() as TokenInformation;
}

export async function storeApiToken(reqParams: {
    username: string,
    password: string
}|null) {
    if (reqParams) {
        const tokenInformation = await fetchApiToken(reqParams);
        sessionStorage.setItem('apiToken', JSON.stringify(tokenInformation));
        return tokenInformation;
    }
    return null;
}

export function getTokenValue() {
    const tokenInformation = sessionStorage.getItem("apiToken") as TokenInformation | null;
    return tokenInformation?.access_token ?? null;
}