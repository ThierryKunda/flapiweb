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

export async function storeApiToken(tokenInformation: TokenInformation & {username: string}) {
    localStorage.setItem('apiToken', JSON.stringify(tokenInformation));
    return tokenInformation;
}

export function getApiToken() {
    const tokenInformation = localStorage.getItem("apiToken") as (TokenInformation & {username: string}) | null;
    return tokenInformation ?? null;
}