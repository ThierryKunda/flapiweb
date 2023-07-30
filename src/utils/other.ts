import { JSX } from "solid-js";
import { HttpVerb } from "../miscellaneous";
import { APIFeature, FetchFeaturesResult, FetchFeaturesError } from "../types_definition/data";

function capitalize(text: string) {
    return text[0].toUpperCase() + text.substring(1);
}

function featuresFetchingIsSuccess(maybeFeatures: FetchFeaturesResult): maybeFeatures is APIFeature[] {
    return !(maybeFeatures && 'detail' in maybeFeatures);
}

function featuresFetchingFailed(maybeFeatures: FetchFeaturesResult): maybeFeatures is FetchFeaturesError {
    return typeof maybeFeatures !== 'undefined' && 'detail' in maybeFeatures;
} 

function colorFromHTTPVerb(verb: HttpVerb): string {
    if (verb === 'get') {
        return '#685CF3';
    } else if (verb === 'post') {
        return '#24D82B';
    } else if (verb === 'delete') {
        return '#D62121';
    } else if (verb === 'patch') {
        return '#F9E007';
    } else {
        return 'black';
    }
}

function removeNewLineSpace(text?: string): string | undefined {
    if (text) {
        return String(text).replace("\n", "");
    }
    return undefined;
}

function formatPropertyNameForDisplay(propertyName: string) {
    let res = capitalize(propertyName);
    return res.replace("_", " ");
}

async function createTokenBasedSession<T>(username: string, password: string, fetching: (username: string, password: string) => Promise<T>, key?: string) {
    let k = key ?? 'token';
    let token = await fetching(username, password);
    sessionStorage.setItem(k, JSON.stringify(token));

    const getToken = () => JSON.parse(sessionStorage.getItem(k)!) as T;
    const removeToken = () => {
        let tk = getToken();
        sessionStorage.removeItem(k);
        return tk;
    }
    const getStorageKey = () => k;
    
    return [getToken, removeToken, getStorageKey];
}


export {
    capitalize,
    featuresFetchingIsSuccess,
    featuresFetchingFailed,
    removeNewLineSpace,
    colorFromHTTPVerb,
    formatPropertyNameForDisplay
};