import { Component, Show, createSignal } from "solid-js";
import { StatusNotificationProps } from "../types_definition/props";
import { submitNewPasswordRequest } from "../utils/fetching"
import { validateEmail } from "../utils/validation";
import Loader from "../components/Loader";

import styles from "../style/PasswordRecovery.module.css";

const PasswordRecovery: Component = () => {
  const [notificationOpened, setNotificationOpened] = createSignal(false);
  const [emailValue, setEmailValue] = createSignal<string|undefined>();
  const [waitingResponse, setWaitingResponse] = createSignal(false);
  const [submitResult, setSubmitResult] = createSignal<{
    isSuccess: boolean,
    description: string,
  }| undefined>();
  const handleSubmitEmail = async (ev: MouseEvent) => {
    ev.preventDefault();
    if (validateEmail(emailValue())) {
      console.log("Email validated !");
      setWaitingResponse(true);
      var reqRes = await submitNewPasswordRequest(emailValue());
      setWaitingResponse(false);
      setNotificationOpened(reqRes !== undefined);
      setSubmitResult(reqRes);
    } else {
      console.log("Email invalid...");
    }
  };
  return <div class={styles.page}>
    <h1>Password recovery</h1>
      <Show when={waitingResponse()}>
        <Loader loaderType="circle" />
      </Show>
    <form class={styles.resetForm}>
      <div class={styles.emailField}>
        <label for="email">Email</label>
        <input onInput={(ev) => setEmailValue(ev.target.value)} id="email" type="email" placeholder="Enter your email" />
      </div>
      <button onClick={handleSubmitEmail}>Reset password</button>
    </form>
    <StatusNotification
      opened={notificationOpened()}
      setOpen={setNotificationOpened}
      isSuccess={submitResult()?.isSuccess}
      description="Check your email inbox to define a new one."
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