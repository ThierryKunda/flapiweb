import { TokenInformation } from "../types_definition/data";

export async function createUser(reqParams: {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}) {
    const res = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqParams),
    })
    return await res.json();
}

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
    })).json();
}

export async function storeApiToken(tokenInformation: TokenInformation & {username: string}) {
    localStorage.setItem('apiToken', JSON.stringify(tokenInformation));
    return tokenInformation;
}

export function getApiToken() {
    const sessionValue = localStorage.getItem("apiToken");
    return sessionValue ? JSON.parse(sessionValue) as (TokenInformation & {username: string}) : null;
}