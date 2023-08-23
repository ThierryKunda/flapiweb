import { createContext, createResource, useContext } from "solid-js";
import { FlowComponent, JSX } from "solid-js";
import { TokenInformation } from "./types_definition/data";
import { createStore } from "solid-js/store";
import { fetchApiToken } from "./utils/session";

interface OptionalTokenInformation {
  access_token: string | undefined,
  token_type: string | undefined,
}

type SessionCtxType = [
  {
    authorized: boolean,
  } & OptionalTokenInformation,
  {
    authentificate?: (reqParams: {username: string, password: string}) => Promise<boolean>, 
    resetSession?: (tk: TokenInformation) => void,
    quitSession?: () => void,
  }
]

export const SessionContext = createContext<SessionCtxType>([{authorized: false, access_token: undefined, token_type: undefined}, {}]);

export const SessionProvider: FlowComponent<{session: OptionalTokenInformation & {authorized: boolean}}, JSX.Element> = (props) => {
  const [state, setState] = createStore(props.session);
  const session: SessionCtxType = [
    state,
    {
      async authentificate(reqParams: {username: string, password: string}) {
        const {access_token, token_type} = await fetchApiToken(reqParams);
        setState("access_token", access_token);
        setState("token_type", token_type);
        setState("authorized", true);
        return true;
      },
      resetSession(tk: TokenInformation) {
        setState("access_token", () => tk.access_token);
        setState("token_type", () => tk.token_type);
        setState("authorized", () => true);
      },
      quitSession() {
        setState("authorized", () => false);
        setState("access_token", () => undefined);
      },
    }
  ];

  return <SessionContext.Provider value={session}>
    {props.children}
  </SessionContext.Provider>;
};

export function useSession() { return useContext(SessionContext); }