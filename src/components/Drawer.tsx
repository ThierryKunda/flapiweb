import { Component, Show, createResource } from "solid-js";
import { A } from "@solidjs/router";
import { useSession } from "../contexts";

import styles from "../style/Summary.module.css";
import { fetchUserRole } from "../utils/fetching";

const Drawer: Component<{visible: boolean}> = (props) => {
    const [session] = useSession();
    const [userRole] = createResource(session.access_token!, fetchUserRole);
    return (<nav classList={{
        [styles.drawer]: true,
        [styles.drawerVisible]: props.visible
        }}>
        <div class={styles.menuLinks}>
            <A href="/summary">Summary</A>
            <A href="/docs">Documentation</A>
            <A href="/profile">Profile</A>
            <Show when={userRole() && userRole().is_admin}>
                <A href="/admin">Administration</A>
            </Show>
        </div>
        <div class={styles.drawerBottomInfo}>
            <h2>{session.username?.split("_").join(" ")}</h2>
        </div>
    </nav>);
}

export default Drawer;