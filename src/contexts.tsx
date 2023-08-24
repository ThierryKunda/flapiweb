import { createContext, createResource, useContext } from "solid-js";
import { FlowComponent, JSX } from "solid-js";
import { TokenInformation } from "./types_definition/data";
import { createStore } from "solid-js/store";
import { fetchApiToken, storeApiToken } from "./utils/session";

interface OptionalTokenInformation {
  access_token: string | undefined,
  token_type: string | undefined,
}

type SessionCtxType = [
  {
    authorized: boolean,
    username: string | undefined,
  } & OptionalTokenInformation,
  {
    authentificate?: (reqParams: {username: string, password: string}) => Promise<boolean>, 
    resetSession?: (tk: TokenInformation) => void,
    quitSession?: () => void,
  }
]

export const SessionContext = createContext<SessionCtxType>([{username: undefined, authorized: false, access_token: undefined, token_type: undefined}, {}]);

export const SessionProvider: FlowComponent<{session: OptionalTokenInformation & {authorized: boolean, username: string | undefined}}, JSX.Element> = (props) => {
  const [state, setState] = createStore(props.session);
  const session: SessionCtxType = [
    state,
    {
      async authentificate(reqParams: {username: string, password: string}) {
        try {
          const {access_token, token_type} = await fetchApiToken(reqParams);
          setState("username", reqParams.username);
          setState("access_token", access_token);
          setState("token_type", token_type);
          setState("authorized", true);
          storeApiToken({
            username: reqParams.username,
            access_token,
            token_type
          });
        } catch (e) {
          return false;
        }
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