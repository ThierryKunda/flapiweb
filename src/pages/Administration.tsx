import { Component, createResource, createSignal, Suspense, SuspenseList } from "solid-js";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import Search from "../components/Search";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";

import { fetchDevDB, fetchLatestAnnouncement, fetchProdDB, fetchResourcesData, fetchSecretSignatures, fetchStats } from "../utils/fetching";
import styles from "../style/Administration.module.css";

const Administration: Component = () => {
    const [drawerVisible, setDrawerVisible] = createSignal(false);
    const [searchModalVisible, setSearchModalVisible] = createSignal(false);
    const [searchInput, setSearchInput] = createSignal('');
    const [showAllAnn, setShowAllAnn] = createSignal(false);
    
    const [latestAnn] = createResource(fetchLatestAnnouncement);
    const [stats] = createResource(fetchStats);

    return <SuspenseList revealOrder="forwards">
        <div class={styles.administrationPage}>
            <Header setDrawerVisible={setDrawerVisible} setSearchModalVisible={setSearchModalVisible} />
            <Drawer visible={drawerVisible()} />
            <Search
                searchModalVisible={searchModalVisible()}
                setSearchModalVisible={setSearchModalVisible}
                setSearchInput={setSearchInput}
                previousInput={searchInput()}
            />
            <section class={styles.announcement}>
                <div class={styles.announcementOutput}>
                    <h1>Latest announcement</h1>
                    <Suspense fallback={<Loader />}>
                        <div>
                            <p class={styles.latestAnnContent} classList={{
                            [styles.showAll]: showAllAnn()
                        }}>{latestAnn()}</p>
                        </div>
                        <button onClick={() => setShowAllAnn(shown => !shown)}>Show all</button>
                    </Suspense>
                </div>
                <button class={styles.manageAnnBtn}>Manage announcement</button>
            </section>
            <section class={styles.statistics}>
                <h1>Statistics preview</h1>
                <Suspense fallback={<Loader loaderType="circle" />}>
                    <div class={styles.statsValues}>
                        <div>
                            <h2>Mean</h2>
                            <span>{stats()?.mean}</span>
                        </div>
                        <div>
                            <h2>Median</h2>
                            <span>{stats()?.median}</span>
                        </div>
                        <div>
                            <h2>Variance</h2>
                            <span>{stats()?.variance}</span>
                        </div>
                        <div>
                            <h2>Standard deviation</h2>
                            <span>{stats()?.std_dev}</span>
                        </div>
                    </div>
                </Suspense>
            </section>
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
            <DataTable
                tableTitle="Database versioning and migrations"
                dataTitles={['Production', 'Development']}
                fetching={[fetchDevDB, fetchProdDB]}
                maxItemDisplayed={3}
            />
        </div>
    </SuspenseList>
};



export default Administration;