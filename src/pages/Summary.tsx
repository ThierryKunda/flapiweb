import { Component, Show, createEffect, createResource, createSignal } from "solid-js";

import Drawer from "../components/Drawer";

import styles from "../style/Summary.module.css";
import { SamplesChart } from "../components/SamplesChart";

import { fetchAverageDaySamples, fetchLatestSamples, fetchStats, fetchUserDataExists, sendFile } from "../utils/fetching";
import DataTable from "../components/DataTable";
import Stats from "../components/Stats";
import DragAndDrop from "../components/DragAndDrop";
import { useNavigate } from "@solidjs/router";
import { useSession } from "../contexts";

const Summary: Component = (props) => {
  const [session] = useSession();
  const [drawerVisible, setDrawerVisible] = createSignal(false);
  const [userDataExists] = createResource({username: session.username!, access_token: session.access_token!}, fetchUserDataExists);
  return <Show
      when={userDataExists() && userDataExists().user_data_exists}
      fallback={<CenteredDragAndDrop />}
    >
    <div class={styles.summaryPage}>
      <Drawer visible={drawerVisible()} />
      <div class={styles.mainContent}>
          <SamplesChart fetching={fetchAverageDaySamples} />
          <DataTable
            fetching={[fetchLatestSamples]}
            maxItemDisplayed={3}
            tableTitle="Latest samples"
          />
          <Stats fetching={fetchStats} />
          <DragAndDrop
            sendButtonText="Drop your data file here."
            sendAction={sendFile}
          />
      </div>
      <button class={styles.drawerToggler} onClick={(ev) => setDrawerVisible(v => !v)}>
          <span></span>
          <span></span>
          <span></span>
      </button>
    </div>;
  </Show>
};

const CenteredDragAndDrop: Component = () => {
  return <div style={{
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "height": "100vh",
    "width": "100vw"
  }}>
    <DragAndDrop
        sendButtonText="Drop your data file here."
        sendAction={sendFile}
      />
  </div>;
};

export default Summary;