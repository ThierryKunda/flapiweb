import { createContext, useContext } from "solid-js";
import { FlowComponent, JSX } from "solid-js";
import { TokenInformation } from "./types_definition/data";
import { createStore } from "solid-js/store";
import { createUser, fetchApiToken, storeApiToken } from "./utils/session";

type SessionCtxType = [
  {
    authorized: boolean,
    username?: string,
  } & Partial<TokenInformation>,
  {
    authentificate?: (reqParams: {username: string, password: string}) => Promise<boolean>,
    createAccount?: (reqParams: {firstname: string, lastname: string, email: string, password: string}) => Promise<boolean>
    resetSession?: (tk: TokenInformation) => void,
    quitSession?: () => void,
  }
]

export const SessionContext = createContext<SessionCtxType>([{username: undefined, authorized: false, access_token: undefined, token_type: undefined}, {}]);

export const SessionProvider: FlowComponent<{session: Partial<TokenInformation> & {authorized: boolean, username?: string}}, JSX.Element> = (props) => {
  const [state, setState] = createStore(props.session);
  const session: SessionCtxType = [
    state,
    {
      async authentificate(reqParams: {username: string, password: string}) {
        const res = await fetchApiToken(reqParams);
        try {
          if ("detail" in res) {
            return false;
          }
          const {access_token, token_type} = res;
          setState("username", reqParams.username);
          setState("access_token", access_token);
          setState("token_type", token_type);
          setState("authorized", true);
          storeApiToken({
            username: reqParams.username,
            access_token,
            token_type
          });
          return true;
        } catch (e) {
          return false;
        }
      },
      async createAccount(reqParams: {firstname: string, lastname: string, email: string, password: string}) {
        const res = await createUser(reqParams);
        if ("detail" in res) {
          return false;
        }
        setState("username", reqParams.firstname + "_" + reqParams.lastname);
        setState("access_token", res.access_token);
        setState("token_type", res.token_type);
        setState("authorized", true);
        const {access_token, token_type} = res;
        storeApiToken({
          username: reqParams.firstname + "_" + reqParams.lastname,
          access_token,
          token_type
        });
        return true;
      },
      resetSession(tk: TokenInformation) {
        setState("username", undefined);
        setState("access_token", tk.access_token);
        setState("token_type", tk.token_type);
        setState("authorized", true);
        localStorage.removeItem("apiToken");
      },
      quitSession() {
        setState("username", undefined);
        setState("authorized", false);
        setState("access_token", undefined);
        setState("token_type", undefined);
        localStorage.removeItem("apiToken");
      },
    }
  ];

  return <SessionContext.Provider value={session}>
    {props.children}
  </SessionContext.Provider>;
};

export function useSession() { return useContext(SessionContext); }