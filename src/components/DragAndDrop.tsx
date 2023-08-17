import { Component, Match, Show, Switch, createResource, createSignal } from "solid-js";
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
    <form>
        <div
          style={{
            position: "relative",
            border: "3px dashed black",
            "border-radius": "14px",
            width: "600px",
            "min-height": "200px",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
          }}>
          <input
            style={{
              opacity: "0",
              "position": "absolute",
              "top": "0",
              "left": 0,
              "width": "100%",
              "height":
              "100%"
            }}
            type="file"
            onInput={(ev) => handleFileInput(ev)} />
          <Show when={droppedFile()} fallback={<p>{props.sendButtonText}</p>}>
            <p>{droppedFile()!.name}</p>
          </Show>
        </div>
        <button type="submit" onClick={(ev) => handleSubmit(ev)}>Upload</button>
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

export default DragAndDrop;