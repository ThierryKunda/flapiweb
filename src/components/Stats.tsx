import { Component, createResource, Suspense } from "solid-js";
import styles from "../style/Administration.module.css";
import Loader from "./Loader";
import { StatsProps } from "../types_definition/props";

const Stats: Component<StatsProps> = (props) => {
    const [stats] = createResource(props.fetching);
    return <section class={styles.statistics}>
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
    </section>;
};

export default Stats;