import { Component, createSignal, For, Switch, Match, createResource, Show } from "solid-js";
import { DocumentationSection } from "../miscellaneous";
import { capitalize, emphasizeKeyWords } from "../utils/other";

import Header from "../components/Header";
import Drawer from "../components/Drawer";
import Search from "../components/Search";
import Resources from "../components/Resources";

import styles from "../style/Documentation.module.css";
import { fetchAPIDocumentationInfo } from "../utils/fetching";
import Loader from "../components/Loader";
import { ContentProps } from "../types_definition/props";

const Documentation: Component = () => {
    const [drawerVisible, setDrawerVisible] = createSignal(false);
    const [searchModalVisible, setSearchModalVisible] = createSignal(false);

    const [searchInput, setSearchInput] = createSignal('');
    const [documentSection, setDocumentationSection] = createSignal<DocumentationSection>(DocumentationSection.description);
    const [documentationInfo] = createResource(fetchAPIDocumentationInfo);

    return (<div class={styles.documentationPage}>
        <Header setDrawerVisible={setDrawerVisible} setSearchModalVisible={setSearchModalVisible}/>
        <Drawer visible={drawerVisible()} />
        <Search
            searchModalVisible={searchModalVisible()}
            setSearchModalVisible={setSearchModalVisible}
            previousInput={searchInput()}
            setSearchInput={setSearchInput}
        />
        <h1>API Documentation</h1>
        <nav class={styles.docTabs}>
            <For each={Object.values(DocumentationSection)}>
                {(sectionName) =>
                    <button
                        onClick={() => setDocumentationSection(sectionName)}
                        classList={{
                            [styles.docTabActive]: sectionName === documentSection()
                        }}
                        >{capitalize(sectionName)}</button>
                }
            </For>
        </nav>
        <Show when={documentationInfo()} fallback={<Loader loaderType="circle" size="large" />}>
        <Switch fallback={<></>}>
            <Match when={documentSection() === DocumentationSection.description}>
                <Content content={documentationInfo()?.description} />
            </Match>
            <Match when={documentSection() === DocumentationSection.authentification}>
                <Content content={documentationInfo()?.authentification} />
            </Match>
            <Match when={documentSection() === DocumentationSection.resources}>
                <Resources />
            </Match>
            <Match when={documentSection() === DocumentationSection.rights}>
                <Content content={documentationInfo()?.rights} />
            </Match>
        </Switch>
        </Show>
    </div>);
}

const Content: Component<ContentProps> = (props) => {
  return <div>
    <For each={props.content}>{(block) => 
        <div class={styles.contentBlock}>
            <h2>{block.title}</h2>
            <p> {block.content}</p>
        </div>
    }</For>
  </div>;
};

export default Documentation;