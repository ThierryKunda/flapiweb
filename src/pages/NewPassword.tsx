import { Component, Match, Show, Switch, createResource, createSignal } from "solid-js";
import { StatusNotificationProps } from "../types_definition/props";
import { validateConfirmPassword } from "../utils/validation";
import { fetchPasswordRequestData, setNewPassword } from "../utils/fetching";
import Loader from "../components/Loader";

import styles from "../style/PasswordRecovery.module.css";
import { useSearchParams } from "@solidjs/router";

const NewPassword: Component = () => {
  const [notificationOpened, setNotificationOpened] = createSignal(false);
  const [newPasswordValue, setNewPasswordValue] = createSignal("");
  const [confirmPasswordValue, setConfirmPasswordValue] = createSignal("");
  const [waitingResponse, setWaitingResponse] = createSignal(false);
  const [submitResult, setSubmitResult] = createSignal<{
    is_success: boolean,
    description: string,
  } | undefined>();
  const [searchParams] = useSearchParams();
  const [newPasswordRequest] = createResource(searchParams.change_req_id, fetchPasswordRequestData);
  const handleSubmitNewPassword = async (ev: MouseEvent) => {
    ev.preventDefault();
    setNotificationOpened(false);
    if (validateConfirmPassword(newPasswordValue(), confirmPasswordValue())) {
      console.log("Email validated !");
      setWaitingResponse(true);
      var reqRes = await setNewPassword({
        changeReqId: searchParams.change_req_id,
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
    <Switch>
    <Match when={newPasswordRequest.state === "pending"}>
        <Loader loaderType="circle" size="large" />
      </Match>      
      <Match when={"detail" in newPasswordRequest()}>
        <p>{newPasswordRequest().detail}</p>
      </Match>
      <Match when={"change_req_id" in newPasswordRequest()}>
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
          isSuccess={submitResult()?.is_success}
          description={submitResult()?.description}
        />
      </Match>
    </Switch>
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