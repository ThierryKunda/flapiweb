import { Component, Show, createSignal } from "solid-js";

const DragAndDrop: Component = () => {
  const [fileName, setFileName] = createSignal<string|null>(null);
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
            onInput={(ev) => setFileName(ev.target.files![0].name)} />
          <Show when={fileName()} fallback={<p>Drop your data file here.</p>}>
            <p>{fileName()}</p>
          </Show>
        </div>
        <button type="submit" onClick={(ev) => {ev.preventDefault(); console.log(fileName())}}>Upload</button>
    </form>
  </section>
};

export default DragAndDrop;