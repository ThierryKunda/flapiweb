import { Component, For, Show, createSignal, createResource } from "solid-js";
import { createForm } from "@modular-forms/solid";

import { fetchTokens, fetchUserPersonalInfo } from "../utils/fetching";
import { formatPropertyNameForDisplay } from "../utils/other";
import { PersonalAccessToken, UserInfo } from "../types_definition/data";

import Loader from "../components/Loader";
import Drawer from "../components/Drawer";
import Header from "../components/Header";

import styles from "../style/Profile.module.css";
import { NewPasswordForm } from "../types_definition/forms";

const Profile: Component = () => {
  const [drawerVisible, setDrawerVisible] = createSignal(false);
  return <div class={styles.profilePage}>
    <Header setDrawerVisible={setDrawerVisible} />
    <Drawer visible={drawerVisible()} />
    <h1>Profile</h1>
    <main>
      <PersonalInformation />
    	<Tokens />
    </main>
    <button>Log out</button>
  </div>;
};

const PersonalInformation: Component = () => {
    const [userInfo] = createResource(fetchUserPersonalInfo);
  return <section class={styles.personalInfo}>
    <h2>Personal information</h2>
    <div>
      <FixedInfo info={userInfo()} />
    	<NewPassword />
    </div>
  </section>;
};



const NewPassword: Component = () => {
  const [newPasswordForm, { Form, Field }] = createForm<NewPasswordForm>();


  const handleSubmit = (values: NewPasswordForm) => {

  };
  return <div class={styles.newPasswordForm}>
    <Form onSubmit={(v) => {}}>
      <Field name="oldPassword">
        {(field, props) =>
        <div>
          <label for="oldPassword">Old password</label>
          <input {...props} type="password" />
        </div>
        }
      </Field>
      <Field name="newPassword">
        {(field, props) =>
        <div>
        	<label for="newPassword">New password</label>
        	<input {...props} type="password" />  
        </div>
        }
      </Field>
      <Field name="confirmNewPassword">
        {(field, props) => 
        <div>
        	<label for="confirmNewPassword">Confirm new password</label>
          <input {...props} type="password" />
        </div>
        }
      </Field>
      <button type="submit">Change password</button>
    </Form>
    <FormNotification isSuccess={false} description={"Failure !"} />
  </div>;
};

const FormNotification: Component<{isSuccess: boolean|undefined, description: string}> = (props) => {
  return <div class={styles.formNotification}>
    <p>Here is the form notification</p>
    <p>{props.description}</p>
  </div>;
};

const FixedInfo: Component<{info?: UserInfo}> = (props) => {
  
  return <div class={styles.fixedInfo}>
    <Show when={props.info} fallback={<Loader loaderType="circle" size="medium" />}>
        <For each={Object.keys(props.info!)}>{(item) => 
            <FixedInfoItem
                title={item}
                value={props.info![item]}
            />
        }</For>
    </Show>
  </div>;
};

const FixedInfoItem: Component<{title: string, value: any}> = (props) => {
  return <div class={styles.fixedInfoItem}>
    <h3>{formatPropertyNameForDisplay(props.title)}</h3>
    <Show when={typeof props.value === "object"} fallback={<span>{props.value}</span>}>
        <ul>
            <For each={props.value}>{(item) =>
                <li>{item}</li>
            }</For>
        </ul>
    </Show>
  </div>;
};

const Tokens: Component = () => {
  return <section class={styles.tokens}>
    <div>
      <h2>Personal access tokens</h2>
      <button>+</button>
    </div>
    <TokensList />
  </section>
}

const TokensList: Component = () => {
  const [tokens_list] = createResource(fetchTokens);
  return <div class={styles.tokensList}>
    <Show when={tokens_list()} fallback={<Loader loaderType="circle" size="medium" />}>
      <For each={tokens_list()}>{(tk) =>
        <Token data={tk} />
      }</For>
    </Show>
  </div>
}

const Token: Component<{data: PersonalAccessToken}> = (props) => {
  return <div class={styles.token}>
    <h3>{props.data.app_name}</h3>
    <div>
      <span>Token value - <em>{props.data.token_value}</em></span>
      <span>Rights - <em>{props.data.token_value}</em></span>
      <span>Creation date - <em>{props.data.creation_date}</em></span>
      <span>Expiration date - <em>{props.data.expiration_date}</em></span>
    </div>
  </div>;
};

export default Profile;