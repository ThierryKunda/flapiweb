import { Component, createSignal, createResource, For, Show, Switch, Match } from "solid-js";
import { capitalize, colorFromHTTPVerb, featuresFetchingIsSuccess } from "../utils/other"; 
import { fetchFeatures, fetchResources } from "../utils/fetching";
import { APIResource, APIFeature, FetchFeaturesError } from "../types_definition/data";
import Loader from "./Loader";

import styles from '../style/Documentation.module.css';

const Resources: Component = () => {
    const [resourcesList] = createResource(fetchResources);
    const [currentResource, setCurrentResource] = createSignal<APIResource>();
    const [featuresList] = createResource(currentResource, fetchFeatures);

  return <div class={styles.resources}>
    <Show
        when={!resourcesList.loading}
        fallback={<Loader loaderType="circle" />}
    >
        <nav class={styles.resourcesTabs}>
            <For each={resourcesList()}>{(resource) =>
                <button
                    classList={{
                        [styles.resourceTabActive]: currentResource()?.resource_name === resource.resource_name
                    }}
                    onClick={() => setCurrentResource(resource)}
                >{capitalize(resource.resource_name)}</button>
            }</For>
        </nav>
        <Switch>
            <Match when={featuresList.loading}>
                <Loader loaderType="rebound" />
            </Match>
            <Match when={featuresList()}>
                <Show
                    when={featuresFetchingIsSuccess(featuresList())}
                    fallback={<p>Error while getting documentation, reason : {(featuresList() as FetchFeaturesError).detail}...</p>}
                >
                <main>
                    <For each={featuresList() as APIFeature[]}>{(feature) =>
                        <Feature feature={feature} />
                    }</For>
                </main>
                </Show>
            </Match>
            <Match when={featuresList.error}>
                <p>{(featuresList() as FetchFeaturesError).detail}</p>
            </Match>
        </Switch>
    </Show>
  </div>;
};

const Feature: Component<{feature: APIFeature}> = (props) => {
  return <section>
    <h3>{props.feature.title}</h3>
    <p>{props.feature.description ?? "No description."}</p>
    <div class={styles.verbAndUri}>
        <div style={{
            "width": "10%",
            "padding": "15px 0",
            "background-color": colorFromHTTPVerb(props.feature.http_verb),
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "border-radius": "10px 0 0 10px",
        }}><span>{props.feature.http_verb.toUpperCase()}</span></div>
        <div style={{
            "width": "90%",
            "display": "flex",
            "padding": "10px 20px",
            "align-items": "center",
            "background-color": "#1C152C",
            "border-radius": "0 10px 10px 0",
        }}
        ><span>{props.feature.uri}</span></div>
    </div>
  </section>;
};

export default Resources;