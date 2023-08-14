import { APIDocumentationInfo, APIResource, AverageTimeSample, AvgTSParams, FetchFeaturesResult, PersonalAccessToken, ResourcesData, UserInfo } from "../types_definition/data";

export async function storeApiToken(username: string, password: string) {
    await new Promise((r) => setTimeout(r, 1000));
    sessionStorage.setItem('apiToken', JSON.stringify({access_token: "12ac3a8fc12cb4", token_type: "bearer"}));
}

export function getApiToken() {
    let token = sessionStorage.getItem('apiToken');
    return token ? JSON.parse(token) as {access_token: string, token_type: string} : null;
}

export async function fetchResources(): Promise<APIResource[]> {
    await new Promise((r) => setTimeout(r, 500));
    return (await fetch('http://localhost:8000/doc/resources')).json();
}

export async function fetchFeatures(resource: APIResource): Promise<FetchFeaturesResult> {
    await new Promise((r) => setTimeout(r, Math.random() * 2000));
    return (await fetch(`http://localhost:8000/doc/resource/${resource.resource_name}/features`)).json();
}

export async function fetchLatestAnnouncement() {
    await new Promise((r) => setTimeout(r, Math.random() * 2000));
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis leo vel fringilla est ullamcorper eget nulla. Id volutpat lacus laoreet non. Aliquet risus feugiat in ante metus dictum at tempor. Ultricies leo integer malesuada nunc. Mauris a diam maecenas sed enim ut sem. Leo vel fringilla est ullamcorper eget nulla facilisi. Felis eget velit aliquet sagittis id consectetur purus ut. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Arcu vitae elementum curabitur vitae nunc."
}

export async function fetchStats() {
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
    // await new Promise((r) => setTimeout(r, 5000));
    // return [
    //     {id: 1, resource_name: "profile", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", admin_privilege: false},
    //     {id: 2, resource_name: "samples", description: null, admin_privilege: false},
    //     {id: 3, resource_name: "statistics", description: null, admin_privilege: false}
    // ]
    return (await fetch('http://127.0.0.1:8000/doc/resources_data')).json();
}

export async function fetchDevDB(): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 5000));
    return [
        {id: 1, name: 'Alpha version of API', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 2, name: 'V1_populated', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 3, name: 'V1.1__added_signatures_table', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 4, name: 'V1.2__added_available_column', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 5, name: 'V1.2__added_annoucements_table', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 6, name: 'V2.0__populated', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: true},
    ]
}

export async function fetchProdDB(): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 5000));
    return [
        {id: 1, name: 'V1', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 1, name: 'V1.1', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 1, name: 'V1.2', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: false},
        {id: 1, name: 'V2.0', created_at: '03/07/2023-11:06', last_modification: '19/07/2023-14:38', currently_used: true},
    ]
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

export async function fetchAverageDaySamples(fetchParams: AvgTSParams): Promise<AverageTimeSample[]> {
    await new Promise((r) => setTimeout(r, 2000));
    return fetchParams.hours.map((h) => ({
        hour: h,
        average_value: Math.random() * (200 - 70) + 70
    }))
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