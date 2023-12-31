import { APIDocumentationInfo, APIResource, AverageTimeSample, AvgTSParams, FetchFeaturesResult, FileUploadParams, FileUploadStatus, PersonalAccessToken, ResourcesData, Stats, UserInfo } from "../types_definition/data";
import { SERVER_URL } from "../env";

export async function fetchUserRole(token: string) {
    const res = await fetch(`${SERVER_URL}/user/role`, {headers: {"Authorization": `Bearer ${token}`}});
    return await res.json();
}

export async function fetchUserDataExists(reqParams: {username: string, access_token: string}) {
    const {username, access_token} = reqParams;
    const res = await fetch(`${SERVER_URL}/user/${username}/has_data`, {headers: {"Authorization": `Bearer ${access_token}`}});
    return await res.json();
}

export async function fetchResources(): Promise<APIResource[]> {
    return (await fetch(`${SERVER_URL}/doc/resources`)).json();
}

export async function fetchFeatures(resource: APIResource): Promise<FetchFeaturesResult> {
    return (await fetch(`${SERVER_URL}/doc/resource/${resource.resource_name}/features`)).json();
}

export async function fetchAllFeatures(token: string) {
    const res = await fetch(`${SERVER_URL}/doc/features`, {headers: {"Authorization": `Bearer ${token}`}});
    return await res.json();
}

export async function fetchStats(fetchParams: {username: string, token: string}): Promise<Stats> {
    const {username, token} = fetchParams;
    const res = await fetch(`${SERVER_URL}/user/${username}/stats`, {headers: {"Authorization": `Bearer ${token}`}});
    return await res.json();
}

export async function fetchAllUsersStats(token: string) {
    const res = await fetch(`${SERVER_URL}/users/stats`, {headers: {"Authorization": `Bearer ${token}`}});
    return await res.json();
    
}

export async function fetchAPIDocumentationInfo(): Promise<APIDocumentationInfo> {
    return (await fetch(`${SERVER_URL}/doc/general_information`)).json();
}

export async function fetchSecretSignatures(fetchParams: {access_token: string, username?: string}) {
    const res = await fetch(`${SERVER_URL}/doc/signatures`, {headers: {"Authorization": `Bearer ${fetchParams.access_token}`}});
    return await res.json();
}

export async function fetchResourcesData(fetchParams: {access_token: string, username?: string}): Promise<ResourcesData[]> {
    const res = await fetch(`${SERVER_URL}/doc/resources_data`, {headers: {"Authorization": `Bearer ${fetchParams.access_token}`}});
    return await res.json();
}

export async function fetchUserPersonalInfo(token: string): Promise<UserInfo> {
    const res = await fetch(`${SERVER_URL}/user`, {headers: {"Authorization": `Bearer ${token}`}});
    return await res.json() as UserInfo;
}

export async function fetchPasswordRequestData(changeReqId: string) {
    const urlParams = new URLSearchParams({
        "change_req_id": changeReqId,
    });
    const res = await fetch(`${SERVER_URL}/new_password_request?${urlParams.toString()}`);
    return await res.json();
}

export async function submitNewPasswordRequest(usernameOrEmail?: string) {
    const res = await fetch(`${SERVER_URL}/submit_password_change`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email_or_username: usernameOrEmail}),
    });
    return await res.json();
}

export async function setNewPassword(data: {
    changeReqId: string,
    oldPassword?: string
    newPassword: string,
    confirmNewPassword: string
}) {
    if (data.newPassword === data.confirmNewPassword) {
        const res = await fetch(`${SERVER_URL}/new_password/${data.changeReqId}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({new_password: data.newPassword}),
        });
        return await res.json();
    }
    return {
        is_success: false,
        description: "New password and confirm password does not match.",
    }
}

export async function fetchTokens(token: string): Promise<PersonalAccessToken[]> {
    const res = await fetch(`${SERVER_URL}/tokens`, {headers: {"Authorization": `Bearer ${token}`}});
    return await res.json();
}

export async function fetchAverageDaySamples(fetchParams: AvgTSParams & {username: string, token: string}): Promise<AverageTimeSample[]> {
    const body = JSON.stringify({
        hours: fetchParams.hours,
        error: fetchParams.error
    });

    const res = await fetch(`${SERVER_URL}/user/${fetchParams.username}/samples/average_day`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${fetchParams.token}`,
        },
        body
    })
    return await res.json();
}

export async function fetchLatestSamples(fetchParams: {username: string, access_token: string}) {
    const res = await fetch(`${SERVER_URL}/user/${fetchParams.username}/samples/latest`, {
        headers: {"Authorization": `Bearer ${fetchParams.access_token}`},
    })
    return await res.json();
}

export async function fetchTriggerPasswordReset(fetchParams: {confirm: boolean, emailOrUsername: string}) {
    if (fetchParams.confirm) {
        const res = await fetch(`${SERVER_URL}/submit_password_change`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email_or_username: fetchParams.emailOrUsername
        })
    })
    return await res.json();
    }
    return null;
}

export async function sendFile(params: FileUploadParams): Promise<FileUploadStatus | null> {
    
    const uri = `${SERVER_URL}/user/${params.username}/raw_data`;
    const form = new FormData();
    form.append("file", params.file);
    if (params.confirm) {
        let fetchRes = await fetch(uri, {
            method: "POST",
            body: form,
            headers: new Headers({
                "Accept": "application/json",
                "Authorization": `Bearer ${params.apiToken}`
            })
        })
        return await fetchRes.json();
    }
    return null;
}