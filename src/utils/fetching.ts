import { APIDocumentationInfo, APIResource, FetchFeaturesResult, PersonalAccessToken, ResourcesData, UserInfo } from "../types_definition/data";

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
    await new Promise((r) => setTimeout(r, Math.random() * 3000));
    return {
        description: [
            {title: "Introduction", content: "This API is using data provided by the user (via CSV file downloaded from the official LibreView web app)."},
            {title: "Why ?", content: "Currently there is no official REST API for third-part software. Therefore the idea is to provide an API, as well as generating some predictions base on user data."},
            {title: "Resources", content: "For now, there are 4 kinds of resources : profile, samples, goals and statistics."}
        ],
        authentification: [
            {title: "Roles", content: "As said in the description, there are two roles : normal users and administrators (users with extra privileges)."},
            {title: "Generate a new token", content: "Tokens are generated with the /token endpoint..."},
            {title: "Additional information", content: "The current API displayed here is also actually using the token provided by the API and stored in the browser..."}
        ],
        rights: [
            {title: "General idea", content: "As written in the authentification section, there are two types of users : normal users and administrators. Administrators can make extra actions regarding the API documentation, backups management, additional information regarding the overall users set such as general statistics."},
            {title: "In details", content: "For normal users, they (or an authorized third-part software) can do the actions stated below : ..."},
            {title: "Additional information", content: "The list of actions displayed on this page is not exhaustive and might differ with the most recent implementation. They can be found in the API Reference, however that would usually there is still no current implementation of data retrieval for the wanted resource."}
        ]
    }
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
    await new Promise((r) => setTimeout(r, 5000));
    return [
        {id: 1, resource_name: "profile", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", admin_privilege: false},
        {id: 2, resource_name: "samples", description: null, admin_privilege: false},
        {id: 3, resource_name: "statistics", description: null, admin_privilege: false}
    ]
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