import { Component, For, Show, Suspense, createResource, createSignal, onMount,  } from "solid-js";
import { SamplesChartProps } from "../types_definition/props";
import { validateTimeFormat } from "../utils/validation";
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Line } from "solid-chartjs";
import Loader from "./Loader";
import { compareHoursAsString } from "../utils/other";

export const SamplesChart: Component<SamplesChartProps> = (props) => {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors)
  })
  const [dayTimes, setDayTimes] = createSignal(["00:00", "08:00", "12:00", "16:00", "20:00"]);
  const fetchParams = () => ({
    username: session.username,
    token: session.access_token,
    hours: dayTimes(),
    error: 60
  })
  const [averageSamples] = createResource(fetchParams, props.fetching);
  const hours = () => averageSamples()?.map((s) => s.hour.slice(0, -3));
  const values = () => averageSamples()?.map((s) => s.average_value);
  const data = () => ({
    labels: hours(),
    datasets: [
      {
        label: 'Glucose rate (mg/dL)',
        data: values()
      }
    ]
  })
  const charOptions = {
    responsive: false,
    maintainAspectRatio: false
  };
  return <section>
    <h1>Average evolution of the week</h1>
    <div style={{display: "flex", "justify-content": "center"}}>
        <DayTimes
          dayTimes={dayTimes()}
          addDayTimes={(t: string) => {if (validateTimeFormat(t)) setDayTimes(prev => [...prev, t].sort((h1, h2) => compareHoursAsString(h1, h2)))}}
          removeDayTimes={(t: string) => setDayTimes(prev => prev.filter((v => v !== t)))}  
        />
        <Show when={averageSamples()}>
          <Line data={data()} options={charOptions} width={500} height={400} />
        </Show>
        <Show when={averageSamples.loading}>
          <Loader loaderType="circle" size="medium" />
        </Show>
    </div>
  </section>;
};

const DayTimes: Component<{
  dayTimes: string[],
  addDayTimes: (t: string) => void,
  removeDayTimes: (t: string) => void,
}> = (props) => {
  const [inputValue, setInputValue] = createSignal("");
  return <div style={{"box-sizing": "border-box"}}>
    <div style={{width: "300px"}}>
      <div style={{display: "flex", "justify-content": "space-between", width: "100%"}}>
        <input style={{display: "block", width: "50px"}} type="text" onInput={(ev) => setInputValue(ev.target.value)} />
        <button style={{
          background: "#5CD8F3",
          color: "white",
          "font-size": "20px",
          "border": "none",
          "border-radius": "50px",
          "padding": "14px"
        }} onClick={() => props.addDayTimes(inputValue())}>Add new day time</button>
        <div style={{
          display: "flex",
          "flex-wrap": "wrap",
        }}>
      </div>
    </div>
      <div style={{display: "flex", "flex-direction": "column", "flex-wrap": "wrap", "max-height": "400px"}}>
        <For each={props.dayTimes}>{(t) =>
          <span style={{
            display: "block",
            border: "2px solid black",
            "border-radius": "50px",
            "padding": "10px",
            "width": "100px",
            "text-align": "center",
            "margin": "10px 0",
            "cursor": "pointer",
          }}
          onClick={() => props.removeDayTimes(t)}
          >{t}</span>
        }</For>
      </div>
    </div>
  </div>;
};