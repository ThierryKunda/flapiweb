import { Component, Switch, Match, Show } from "solid-js";
import { LoaderProps } from "../types_definition/props";

import styles from '../style/Documentation.module.css';

const Loader: Component<LoaderProps> = (props) => {
  return <div class={styles.loader} classList={{
    [styles.loaderSmall]: props.size === 'small',
    [styles.loaderMedium]: props.size === 'medium',
    [styles.loaderLarge]: props.size === 'large',
  }}>
    <Show when={props.placeholderText}>
      <p>{props.placeholderText}</p>
    </Show>
    <Switch fallback={<p>Loading...</p>}>
      <Match when={props.loaderType === 'circle'}>
        <div class={styles.circleLoader}></div>
      </Match>
      <Match when={props.loaderType === 'rebound'}>
        <div class={styles.reboundLoader}>
          <div></div>
          <div></div>
        </div>
      </Match>
    </Switch>
  </div>;
};

export default Loader;