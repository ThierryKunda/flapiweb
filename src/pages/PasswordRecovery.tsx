import { Component, Show, createSignal } from "solid-js";
import { StatusNotificationProps } from "../types_definition/props";
import { submitNewPasswordRequest } from "../utils/fetching"
import Loader from "../components/Loader";

import styles from "../style/PasswordRecovery.module.css";

const PasswordRecovery: Component = () => {
  const [notificationOpened, setNotificationOpened] = createSignal(false);
  const [usernameValue, setUsernameValue] = createSignal<string|undefined>();
  const [waitingResponse, setWaitingResponse] = createSignal(false);
  const [submitResult, setSubmitResult] = createSignal<{
    is_success: boolean,
    description: string,
  }| undefined>();
  const handleSubmitUsername = async (ev: MouseEvent) => {
    ev.preventDefault();
    console.log("Username validated !");
    setWaitingResponse(true);
    var reqRes = await submitNewPasswordRequest(usernameValue());
    setWaitingResponse(false);
    setNotificationOpened(reqRes !== undefined);
    setSubmitResult(reqRes);
  };
  return <div class={styles.page}>
    <h1>Password recovery</h1>
      <Show when={waitingResponse()}>
        <Loader loaderType="circle" />
      </Show>
    <form class={styles.resetForm}>
      <div class={styles.usernameField}>
        <label for="username">Username</label>
        <input onInput={(ev) => setUsernameValue(ev.target.value)} id="username" type="username" placeholder="Enter your username" />
      </div>
      <button onClick={handleSubmitUsername}>Reset password</button>
    </form>
    <StatusNotification
      opened={notificationOpened()}
      setOpen={setNotificationOpened}
      isSuccess={submitResult()?.is_success}
      description={submitResult()?.description}
    />
  </div>;
};

const StatusNotification: Component<StatusNotificationProps> = (props) => {
  return <div class={styles.notification}
  classList={{
    [styles.success]: props.isSuccess,
    [styles.failure]: !props.isSuccess,
    [styles.opened]: props.opened
  }}>
    <div onClick={() => props.setOpen(false)} class={styles.closeButton}>
      <span>X</span>
    </div>
      <Show
        when={props.isSuccess}
        fallback={<span>Password reset failed 🤔</span>}>
        <span>Password successfully reset ! 😁</span>
      </Show>
      <span class={styles.notificationDescription}>{props.description}</span>
  </div>
}

export default PasswordRecovery;