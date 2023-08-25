import { HttpVerb } from "../miscellaneous"

export interface Sample {
    date: Date,
    value: number,
    device: string
}

export interface APIResource {
    resource_name: string,
    description?: string
}

export interface APIFeature {
    title: string,
    description?: string,
    http_verb: HttpVerb,
    uri: string,
    available: boolean,
}

export interface FetchFeaturesError {
    detail: string
}

export type FetchFeaturesResult = APIFeature[] | FetchFeaturesError | undefined;

export type ResourcesData = {
    id: number,
    resource_name: string,
    description: string | null,
    admin_privilege: boolean
}

export interface SecretSignature {
    id: number,
    secret_value: string,
    generation_date: string
}

export type BlockOfContent = {
    title: string,
    content: string,
}

export interface APIDocumentationInfo {
    description: BlockOfContent[],
    authentification: BlockOfContent[],
    rights: BlockOfContent[]
}

export type UserInfo = Record<string, string|string[]>;

export interface newPAT {
    app_name: string,
    expiration_date: string,
    token_value: string,
    profile_right: boolean,
    samples_right: boolean,
    goals_right: boolean,
    stats_right: boolean,
}

export interface PersonalAccessToken extends newPAT {
    creation_date: string,
}

export interface AverageTimeSample {
    hour: string,
    average_value: number
}

export interface AvgTSParams {
    hours: string[],
    error: number
}

export interface Stats {
    mean: number,
    median: number,
    variance: number,
    standard_deviation: number
}

export interface FileUploadParams {
    username: string,
    apiToken: string,
    confirm: boolean,
    file: File
}

export interface FileUploadStatus {
    message: string,
}

export interface TokenInformation {
    access_token: string,
    token_type: string
}