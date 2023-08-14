import { Component, createResource, createSignal, Suspense, SuspenseList } from "solid-js";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import Search from "../components/Search";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";

import { fetchResourcesData, fetchSecretSignatures, fetchStats } from "../utils/fetching";
import styles from "../style/Administration.module.css";
import Stats from "../components/Stats";

const Administration: Component = () => {
    const [drawerVisible, setDrawerVisible] = createSignal(false);
    const [searchModalVisible, setSearchModalVisible] = createSignal(false);
    const [searchInput, setSearchInput] = createSignal('');

    return <SuspenseList revealOrder="forwards">
        <div class={styles.administrationPage}>
            <Header setDrawerVisible={setDrawerVisible} />
            <Drawer visible={drawerVisible()} />
            <Search
                searchModalVisible={searchModalVisible()}
                setSearchModalVisible={setSearchModalVisible}
                setSearchInput={setSearchInput}
                previousInput={searchInput()}
            />
            <Stats fetching={fetchStats} />
            <DataTable
                tableTitle="Secret signatures"
                fetching={[fetchSecretSignatures]}
                maxItemDisplayed={3}
            />
            <DataTable
                tableTitle="Documentation assets"
                dataTitles={["Resources", "Features"]}
                fetching={[fetchSecretSignatures, fetchResourcesData]}
                maxItemDisplayed={3}
            />
        </div>
    </SuspenseList>
};



export default Administration;