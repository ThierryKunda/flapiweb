import { Component, createSignal, onMount, For } from "solid-js";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Line } from "solid-chartjs";

import Drawer from "../components/Drawer";

import styles from "../style/Summary.module.css";
import { Sample } from "../types_definition/data";
import { Field, Form, SubmitHandler, createForm } from "@modular-forms/solid";
import { SamplesFileUploadForm } from "../types_definition/forms";

const Summary: Component = (props) => {
    const [drawerVisible, setDrawerVisible] = createSignal(false);
    const samples_data: Sample[] = [
        {date: new Date(), device: "FL1", value: 120},
        {date: new Date(), device: "FL1", value: 120},
        {date: new Date(), device: "FL1", value: 120},
        {date: new Date(), device: "FL1", value: 120},
        {date: new Date(), device: "FL1", value: 120},
        {date: new Date(), device: "FL1", value: 120},
    ]


  return <div class={styles.summaryPage}>
    <Drawer visible={drawerVisible()} />
    <div class={styles.mainContent}>
        <AverageGraph data={[]}/>
        <GeneralStatistics data={[]} />
        <Samples data={samples_data} />
        <SamplesInput />
    </div>
    <button class={styles.drawerToggler} onClick={(ev) => setDrawerVisible(v => !v)}>
        <span></span>
        <span></span>
        <span></span>
    </button>
  </div>;
};

// const Drawer: Component<{visible: boolean}> = (props) => {
//     return (<nav classList={{
//         [styles.drawer]: true,
//         [styles.drawerVisible]: props.visible
//         }}>
//         <div class={styles.menuLinks}>
//             <a href="#">Summary</a>
//             <a href="#">Documentation</a>
//             <a href="#">Profile</a>
//             <a href="#">Help</a>
//             <a href="#">Appearance</a>
//         </div>
//         <div class={styles.drawerBottomInfo}>
//             <h2>Thierry Kunda</h2>
//             <p>Last update in 29/06/2023</p>
//         </div>
//     </nav>);
// }

const AverageGraph: Component<{data: any}> = (props) => {
    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors)
    })
    const chartData = {
        labels: ["4am", "8am", "12am", "4pm", "8pm", "12pm"],
        datasets: [
            {
                label: "Hours in a day",
                data: [67, 150, 120, 75, 80, 200]
            },
        ]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    return <div class={styles.graph}>
        <h1>Average evolution of the week</h1>
        <Line data={chartData} options={chartOptions} />
    </div>
}

const GeneralStatistics: Component<{data: any}> = (props) => {
    return <div class={styles.statistics}>
        <h1>General statistics</h1>
        <table>
            <thead>
                <tr>
                    <td>Statistic</td>
                    <td>Value</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mean</td>
                    <td>110mg/dL</td>
                </tr>
                <tr>
                    <td>Mean</td>
                    <td>110mg/dL</td>
                </tr>
                <tr>
                    <td>Median</td>
                    <td>102mg/dL</td>
                </tr>
                <tr>
                    <td>Variance</td>
                    <td>4.76</td>
                </tr>
                <tr>
                    <td>Standard deviation</td>
                    <td>2.1817</td>
                </tr>
            </tbody>
        </table>
        <a href="#">More stats</a>
    </div>
}

const Samples: Component<{data: Sample[]}> = (props) => {
    return <div class={styles.samples}>
        <h1>Latest samples</h1>
        <table>
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Value</td>
                    <td>Device</td>
                </tr>
            </thead>
            <For each={props.data}>{(sample) =>
                <tr>
                    <td>{`${sample.date.getDay()}/${sample.date.getMonth()}/${sample.date.getFullYear()}`}</td>
                    <td>{sample.value}</td>
                    <td>{sample.device}</td>
                </tr>
            }
            </For>
        </table>
        <a href="#">More samples</a>
    </div>
}

const SamplesInput: Component = (props) => {
  const [samplesUploadForm, {Form, Field}] = createForm<SamplesFileUploadForm>();
  const handleSubmit: SubmitHandler<SamplesFileUploadForm> = (values, ev) => {
    console.log(values.csvFile);
  }
  return <section class={styles.samplesInput}>
    <h1>Upload samples file</h1>
      <Form onSubmit={handleSubmit}>
        <Field name="csvFile">
            {(field, props) => <input type="file" {...props} id="samples-input" />}
        </Field>
        <button type="submit">Uploader</button>
      </Form>
  </section>;
};

export default Summary;