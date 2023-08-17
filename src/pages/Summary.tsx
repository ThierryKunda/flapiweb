import { Component, createSignal, onMount, For } from "solid-js";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Line } from "solid-chartjs";

import Drawer from "../components/Drawer";

import styles from "../style/Summary.module.css";
import { Sample } from "../types_definition/data";
import { Field, Form, SubmitHandler, createForm } from "@modular-forms/solid";
import { SamplesFileUploadForm } from "../types_definition/forms";
import { SamplesChart } from "../components/SamplesChart";

import { fetchAverageDaySamples, fetchLatestSamples, fetchStats, sendFile } from "../utils/fetching";
import DataTable from "../components/DataTable";
import Stats from "../components/Stats";
import DragAndDrop from "../components/DragAndDrop";

const Summary: Component = (props) => {
    const [drawerVisible, setDrawerVisible] = createSignal(false);

  return <div class={styles.summaryPage}>
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
};

export default Summary;