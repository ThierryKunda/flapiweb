import { Component, Match, Switch, createResource, createSignal, JSX } from "solid-js";
import { DragAndDropProps } from "../types_definition/props";
import Loader from "./Loader";

type SubmitEvent = MouseEvent & {
  currentTarget: HTMLButtonElement;
  target: Element;
}

type FileInputEvent = InputEvent & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
}

const DragAndDrop: Component<DragAndDropProps> = (props) => {
  const [droppedFile, setDroppedFile] = createSignal<File|null>(null);
  const [confirm, setConfirm] = createSignal(false);
  const params = () => ({
    username: '',
    apiToken: '',
    confirm: confirm(),
    file: droppedFile()
  })
  const [uploadResponse] = createResource(params, props.sendAction);
  
  const handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    setConfirm(true)
  }

  const handleFileInput = (ev: FileInputEvent) => {
    setConfirm(false);
    setDroppedFile(ev.target.files![0]);
  }
  return <section>
    <form style={{display: "flex", "flex-direction": "column", "align-items": "center"}}>
        <div style={dropArea}>
          <input style={fileInput} type="file" onInput={(ev) => handleFileInput(ev)} />
          <p style={{color: "#5CD8F3"}}>{droppedFile() ? droppedFile()!.name : props.sendButtonText}</p>
        </div>
        <button style={submitButton} type="submit" onClick={(ev) => handleSubmit(ev)}>Upload</button>
        <Switch>
          <Match when={uploadResponse()}>
              <p>{uploadResponse()!.message}</p>
          </Match>
          <Match when={uploadResponse() === null && confirm()}>
            <Loader loaderType="circle" size="small" />
          </Match>
        </Switch>
    </form>
  </section>
};

const dropArea: JSX.CSSProperties = {
  position: "relative",
  border: "3px dashed #5CD8F3",
  "border-radius": "14px",
  width: "600px",
  "min-height": "200px",
  "display": "flex",
  "justify-content": "center",
  "align-items": "center"
}

const fileInput: JSX.CSSProperties = {
  opacity: "0",
  "position": "absolute",
  "top": "0",
  "left": 0,
  "width": "100%",
  "height": "100%"
}

const submitButton: JSX.CSSProperties = {
  display: "block",
  "background-color": "#5CD8F3",
  color: "white",
  "font-size": "20px",
  padding: "10px",
  "margin-top": "25px",
  width: "200px",
  border: "none",
  "border-radius": "50px"
}

export default DragAndDrop;