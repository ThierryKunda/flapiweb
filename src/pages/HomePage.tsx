import { Component, createResource, createSignal, Match, Setter, Show, Switch } from "solid-js";
import { createForm, Field, setResponse, SubmitHandler } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";

import { SignInForm, SignUpForm } from "../types_definition/forms";
import styles from "../style/HomePage.module.css";
import { useSession } from "../contexts";
import Loader from "../components/Loader";
import { validateConfirmPassword } from "../utils/validation";

const HomePage: Component = () => {
    const navigate = useNavigate();
    const [session] = useSession();
    if (session.authorized) {
        navigate("/summary")
    }
    return (<div class={styles.homePageLayout}>
        <header class={styles.homePagePresentation}>
            <div class={styles.homePageTitle}>
                <h1 style={{"font-weight": 500}}>FreestyleLibreAPI</h1>
                <p style={{"width": "250px", margin: 0}}>Unofficial REST API for Freestyle Libre sensors users</p>
            </div>
            <div class={styles.extraInformation}>
            <p>Documentation right <a href="#" style={{"color": "inherit"}}>here</a>.</p> 
            <p>Need help ? <a href="#" style={{"color": "inherit"}}>Contact me</a>.</p> 
            </div>
        </header>
            <SignForm />
    </div>);
};

const SignForm: Component = () => {
    const [isSignIn, setSignIn] = createSignal(true);
    const navigate = useNavigate();
    const navigateToSummary = (validInputs: boolean) => {
        if (validInputs) {
            navigate('/summary')
        }
    }

    return (
        <main>
            <Show when={isSignIn()}
                fallback={<SignUp setSignIn={setSignIn} toNextPage={navigateToSummary} />}>
                <SignIn setSignIn={setSignIn} toNextPage={navigateToSummary} />
            </Show>
        </main>
    )
}

const SignIn: Component<{setSignIn: Setter<boolean>, toNextPage: (validInputs: boolean) => void}> = (props) => {
    const [signInForm, {Form, Field, FieldArray}] = createForm<SignInForm>();
    const [_, {authentificate}] = useSession();
    const [waitingResponse, setWaitingResponse] = createSignal({waiting: false, failed: false});
    const navigate = useNavigate();
    const handleSubmit: SubmitHandler<SignInForm> = (values, event) => {
        setWaitingResponse({waiting: true, failed: false});
        // Authentificate user using API
        const authSuccess = authentificate?.({username: values.username, password: values.password});
        authSuccess?.then((v) => {
            setWaitingResponse({waiting: false, failed: !v});
            if (v) {
                navigate("/summary")
            }
        }).catch((e) => setWaitingResponse({waiting: false, failed: true}))
    }
    return (
        <Form class={styles.signForm} onSubmit={handleSubmit}>
            <div class={styles.signFormTitle}>
                <h2 style={{
                    "font-size": "40px",
                    "margin": 0,
                    "text-align": "center",
                    "color": "#5CD8F3",
                    "font-weight": "500"
                }}>Log In</h2>
            </div>
            <div class={styles.formFields}>
                <div classList={{
                    [styles.formInput]: true,
                    [styles.signInFormInput]: true
                }}>
                    <label for="username" class={styles.label}>Username</label>
                    <Field name="username">
                        {(field, props) => <input class={styles.textInput} id="username" {...props} type="text" placeholder="Enter your username here" />}
                    </Field>
                </div>
                <div class={styles.formInput}>
                    <label for="password" class={styles.label}>Password</label>
                    <Field name="password">
                        {(field, props) => <input class={styles.textInput} id="password" {...props} type="password" placeholder="Enter your password here" />}
                    </Field>
                </div>
            </div>
            <div class={styles.confirmationArea}>
                <button type="submit" class={styles.confirmButton} style={{
                    "background-color": "#5CD8F3",
                    "color": "white",
                    "border": "none"
                }}
                >Log In</button>
                <p>Doesn't have an account yet ? <a class={styles.link} onClick={(ev) => {
                    ev.preventDefault();
                    props.setSignIn(false)
                }}>Sign up</a></p>
            </div>
            <Switch>
                <Match when={waitingResponse().waiting}>
                    <Loader loaderType="circle" size="small" />
                </Match>
                <Match when={!waitingResponse().waiting && waitingResponse().failed}>
                    <p>Incorrect username and/or password.</p>
                </Match>
            </Switch>
        </Form>
    );
}

const SignUp: Component<{setSignIn: Setter<boolean>, toNextPage: (validInputs: boolean) => void}> = (props) => {
    const [signUpForm, {Form, Field, FieldArray}] = createForm<SignUpForm>();
    const [_, {createAccount}] = useSession();
    const [waitingResponse, setWaitingResponse] = createSignal({waiting: false, failed: false});
    const navigate = useNavigate();
    const handleSubmit: SubmitHandler<SignUpForm> = (values, event) => {
        // Register user using API - TODO
        if (validateConfirmPassword(values.password, values.confirmPassword)) {
            const authSuccess = createAccount?.({firstname: values.firstname, lastname: values.lastname, email: values.email, password: values.password});
            authSuccess?.then((v) => {
                setWaitingResponse({waiting: false, failed: !v});
                if (v) {
                    navigate("/summary")
                }
            }).catch((e) => setWaitingResponse({waiting: false, failed: true}))
        }
    }

    return (
        <Form class={styles.signForm} onSubmit={handleSubmit}>
            <div class={styles.signFormTitle}>
                <h2 style={{
                    "font-size": "40px",
                    "margin": 0,
                    "text-align": "center",
                    "color": "#5CD8F3",
                    "font-weight": "500"
                }}>Sign Up</h2>
            </div>
            <div class={styles.formFields}>
                <div class={styles.groupedInputs}>
                    <div class={styles.formInput}>
                        <label for="firstname" class={styles.label}>Firstname</label>
                        <Field name="firstname">
                        {(field, props) => <input classList={{
                            [styles.textInput]: true,
                            [styles.signUpInput]: true
                        }} id="firstname" {...props} type="text" />}
                        </Field>
                    </div>
                    <div class={styles.formInput}>
                        <label for="lastname" class={styles.label}>Lastname</label>
                        <Field name="lastname">
                        {(field, props) => <input classList={{
                            [styles.textInput]: true,
                            [styles.signUpInput]: true
                        }} id="lastname" {...props} type="text" />}
                        </Field>
                    </div>
                </div>
                <div class={styles.formInput}>
                    <label for="email" class={styles.label}>Email</label>
                    <Field name="email">
                    {(field, props) => <input class={styles.textInput} id="email" {...props} type="text" />}
                    </Field>
                </div>
                    <div class={styles.formInput}>
                        <label for="password" class={styles.label}>Password</label>
                        <Field name="password">
                        {(field, props) => <input class={styles.textInput} id="password" {...props} type="password" />}
                        </Field>
                    </div>
                    <div class={styles.formInput}>
                        <label for="confirmPassword" class={styles.label}>Confirm password</label>
                        <Field name="confirmPassword">
                        {(field, props) => <input class={styles.textInput} id="confirmPassword" {...props} type="password" />}
                        </Field>
                    </div>
            </div>
            <div class={styles.confirmationArea}>
                <button type="submit" class={styles.confirmButton} style={{
                    "background-color": "transparent",
                    "color": "#5CD8F3",
                    "border": "2px solid #5CD8F3"
                }}>Sign Up</button>
                <p>Already registered ? <a class={styles.link} onClick={(ev) => {
                    ev.preventDefault();
                    props.setSignIn(true)
                }}>Log in</a></p>
            </div>
            <Switch>
                <Match when={waitingResponse().waiting}>
                    <Loader loaderType="circle" size="small" />
                </Match>
                <Match when={!waitingResponse().waiting && waitingResponse().failed}>
                    <p>Credentials already used, please choose another one.</p>
                </Match>
            </Switch>
        </Form>
    );
}

export default HomePage;