import { Component, Show, createSignal } from "solid-js";
import { StatusNotificationProps } from "../types_definition/props";
import { validateConfirmPassword } from "../utils/validation";
import { setNewPassword } from "../utils/fetching";
import Loader from "../components/Loader";

import styles from "../style/PasswordRecovery.module.css";

const NewPassword: Component = () => {
  const [email, _] = createSignal("");
  const [notificationOpened, setNotificationOpened] = createSignal(false);
  const [newPasswordValue, setNewPasswordValue] = createSignal("");
  const [confirmPasswordValue, setConfirmPasswordValue] = createSignal("");
  const [waitingResponse, setWaitingResponse] = createSignal(false);
  const [submitResult, setSubmitResult] = createSignal<{
    isSuccess: boolean,
    description: string,
  }| undefined>();
  const handleSubmitNewPassword = async (ev: MouseEvent) => {
    ev.preventDefault();
    setNotificationOpened(false);
    if (validateConfirmPassword(newPasswordValue(), confirmPasswordValue())) {
      console.log("Email validated !");
      setWaitingResponse(true);
      var reqRes = await setNewPassword({
        email: email(),
        newPassword: newPasswordValue(),
        confirmNewPassword: confirmPasswordValue()
    });
      setWaitingResponse(false);
      setNotificationOpened(reqRes !== undefined);
      setSubmitResult(reqRes);
    } else {
      console.log("Email invalid...");
    }
  };
  return <div class={styles.newPasswordPage}>
    <h1>New password</h1>
      <Show when={waitingResponse()}>
        <Loader loaderType="circle" />
      </Show>
    <form class={styles.resetForm}>
      <div class={styles.emailField}>
        <label for="email">New password</label>
        <input onInput={(ev) => setNewPasswordValue(ev.target.value)} id="email" type="password" />
      </div>
      <div class={styles.emailField}>
        <label for="password">Confirm new password</label>
        <input onInput={(ev) => setConfirmPasswordValue(ev.target.value)} id="password" type="password" />
      </div>
      <button onClick={handleSubmitNewPassword}>Reset password</button>
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

export default NewPassword;