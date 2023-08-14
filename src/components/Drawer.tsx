import { Component } from "solid-js";
import { A } from "@solidjs/router";

import styles from "../style/Summary.module.css";

const Drawer: Component<{visible: boolean}> = (props) => {
    return (<nav classList={{
        [styles.drawer]: true,
        [styles.drawerVisible]: props.visible
        }}>
        <div class={styles.menuLinks}>
            <A href="/summary">Summary</A>
            <A href="/docs">Documentation</A>
            <A href="/profile">Profile</A>
        </div>
        <div class={styles.drawerBottomInfo}>
            <h2>Thierry Kunda</h2>
        </div>
    </nav>);
}

export default Drawer;