import { FlowComponent, JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useSession } from "../contexts";

const AuthState: FlowComponent<{}, JSX.Element> = (props) => {
	const [session] = useSession();
	const navigate = useNavigate();
  if (!session.authorized) {
		navigate("/");
	}
  return <>{props.children}</>;
};

export default AuthState;