import { APIDocumentationInfo, APIResource, AverageTimeSample, AvgTSParams, FetchFeaturesResult, FileUploadParams, FileUploadStatus, PersonalAccessToken, ResourcesData, Stats, UserInfo } from "../types_definition/data";

export async function fetchResources(): Promise<APIResource[]> {
    await new Promise((r) => setTimeout(r, 500));
    return (await fetch('http://localhost:8000/doc/resources')).json();
}

export async function fetchFeatures(resource: APIResource): Promise<FetchFeaturesResult> {
    await new Promise((r) => setTimeout(r, Math.random() * 2000));
    return (await fetch(`http://localhost:8000/doc/resource/${resource.resource_name}/features`)).json();
}

export async function fetchStats(): Promise<Stats> {
    await new Promise((r) => setTimeout(r, 2000));
    return {
        mean: Math.random() * 80,
        median: Math.random() * 80,
        variance: Math.random() * 20,
        std_dev: Math.random() * 10
    }
}

export async function fetchAPIDocumentationInfo(): Promise<APIDocumentationInfo> {
    return (await fetch('http://127.0.0.1:8000/doc/general_information')).json();
}

export async function fetchSecretSignatures() {
    await new Promise((r) => setTimeout(r, 1000));
    return [
        {id: 1, secret_value: "12a9c5d2fe2784", generation_date: "09/07/2023-12:47"},
        {id: 2, secret_value: "48a5d51c0fae67", generation_date: "12/10/2023-19:33"},
        {id: 3, secret_value: "1621a1c6cd8af31", generation_date: "29/01/2024-09:21"},
        {id: 4, secret_value: "1621a1c6cd8af31", generation_date: "29/01/2024-09:21"},
        {id: 5, secret_value: "1621a1c6cd8af31", generation_date: "29/01/2024-09:21"},
        {id: 6, secret_value: "1621a1c6cd8af31", generation_date: "29/01/2024-09:21"},
        {id: 7, secret_value: "1621a1c6cd8af31", generation_date: "29/01/2024-09:21"},
    ]
}

export async function fetchResourcesData(): Promise<ResourcesData[]> {
    return (await fetch('http://127.0.0.1:8000/doc/resources_data')).json();
}

export async function fetchUserPersonalInfo(): Promise<UserInfo> {
    await new Promise((r) => setTimeout(r, 3000));
    return {
        first_name: "John",
        last_name: "Doe",
        username: "John_Doe",
        email: "john.doe@example.com",
        devices: ["FreestyleLibre 1", "FreestyleLibre 2", "FreestyleLibreLink"]
    }
}



export async function submitNewPasswordRequest(email?: string) {
    if (email) {

    }
    await new Promise((r) => setTimeout(r, 2000));
    return {
        isSuccess: Math.random() < 0.5,
        description: "Here is some description 😎",
    }
}

export async function setNewPassword(data: {
    email: string,
    oldPassword?: string
    newPassword: string,
    confirmNewPassword: string
}) {
    await new Promise((r) => setTimeout(r, 2000));
    return {
        isSuccess: Math.random() < 0.5,
        description: "Here is some description 😎",
    }
}

export async function fetchTokens(): Promise<PersonalAccessToken[]> {
    await new Promise((r) => setTimeout(r, 2000));
    return [
        {
            app_name: 'MyHealth Mobile App',
            token_value: 'ab6f89ef7c15d',
            rights: {profile: true, stats: true, goals: false, samples: false},
            creation_date: '23/07/2023',
            expiration_date: '23/07/2023'
        },
        {
            app_name: 'Some random CLI app',
            token_value: 'ab6f89ef7c15d',
            rights: {profile: true, stats: true, goals: false, samples: false},
            creation_date: '23/07/2023',
            expiration_date: '23/07/2023'
        },
        {
            app_name: 'Diabetter plugin',
            token_value: 'ab6f89ef7c15d',
            rights: {profile: true, stats: true, goals: false, samples: false},
            creation_date: '23/07/2023',
            expiration_date: '23/07/2023'
        },{
            app_name: 'Diabetter plugin',
            token_value: 'ab6f89ef7c15d',
            rights: {profile: true, stats: true, goals: false, samples: false},
            creation_date: '23/07/2023',
            expiration_date: '23/07/2023'
        },{
            app_name: 'Diabetter plugin',
            token_value: 'ab6f89ef7c15d',
            rights: {profile: true, stats: true, goals: false, samples: false},
            creation_date: '23/07/2023',
            expiration_date: '23/07/2023'
        },
    ]
}

export async function fetchAverageDaySamples(fetchParams: AvgTSParams & {username: string, token: string}): Promise<AverageTimeSample[]> {
    const body = JSON.stringify({
        hours: fetchParams.hours,
        error: fetchParams.error
    });

    const res = await fetch(`http://localhost:8000/user/${fetchParams.username}/samples/average_day`, {
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

export async function fetchLatestSamples() {
    await new Promise((r) => setTimeout(r, 2000));
    return [
        {device: "LibreLink", value: 90, date: "09/07/2023-12:47"},
        {device: "FLibre2", value: 100, date: "12/10/2023-19:33"},
        {device: "FLibre2", value: 120, date: "29/01/2024-09:21"},
        {device: "FLibre2", value: 70, date: "03/02/2024-15:43"},
        {device: "FLibre2", value: 120, date: "14/03/2024-06:18"},
    ]
}

export async function fetchTriggerPasswordReset(confirm: boolean) {
    if (confirm) {
        await new Promise((r) => setTimeout(r, 2000));
        return {sent_from: "Windows Mozilla", received_at: "14/08/2023-16:21"};
    }
    return null;
}

export async function sendFile(params: FileUploadParams): Promise<FileUploadStatus | null> {
    // await new Promise((r) => setTimeout(r, 2000));
    // const uri = `http://127.0.0.1:8000/users/${params.username}/raw_data`;
    // const form = new FormData();
    // form.append("file", params.file);
    if (params.confirm) {
        // let fetchRes = await fetch(uri, {
        //     method: "POST",
        //     body: form,
        //     headers: new Headers({
        //         "Accept": "application/json",
        //         "Authorization": `Bearer ${params.apiToken}`
        //     })
        // })
        // return await fetchRes.json();
        return {
            message: "Your data was succesfully uploaded !"
        }
    }
    return null;
}