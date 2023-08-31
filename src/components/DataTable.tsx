import { Component, Show, For, createResource, createSignal, Accessor, Setter, JSX } from "solid-js";
import { RecordComponent, TableHeaderProps, PageNavigationProps, DataTableProps } from "../types_definition/props";

import styles from '../style/Administration.module.css';
import { css } from "../../styled-system/css"
import { handleTypeDisplay, removeNewLineSpace } from "../utils/other";
import { useSession } from "../contexts";
import { primaryAdmin } from "../style/themeColors";
import { ColorToken } from "../../styled-system/tokens";
import { Property } from "../../styled-system/types/csstype";

const DataTable: Component<DataTableProps> = (props) => {
  const [session] = useSession();
  const [tabSelected, setTabSelected] = createSignal(0);
  const [currentPage, setCurrentPage] = createSignal(0);
  
  const data = props.fetching.map((fetcher) => {
    const [d] = createResource({access_token: session.access_token, username: session.username}, fetcher);
    return d;
  });

  const toPrevPage = (currentPage: Accessor<number>, updater: Setter<number>) => {
    if (currentPage() > 0) updater(p => p-1);
  }
  const toNextPage = (_: Accessor<number>, updater: Setter<number>) => {
    updater(p => p+1);
  }

  const currentItems = () => {
    var currentData = data[tabSelected()]();
    var start = currentPage() * props.maxItemDisplayed;
    var end = currentPage() * props.maxItemDisplayed + props.maxItemDisplayed;
    return currentData?.slice(start,end);
  }
  return <section style={tableStyle(props.size)}>
    <h1>{props.tableTitle}</h1>
      <Show when={props.dataTitles}>
        <DataTitles
          dataTitles={props.dataTitles!}
          setTabSelectedIndex={(idx: number) => setTabSelected(idx)}
          tabSelectedIndex={tabSelected()}
        />
      </Show>
      <Show
        when={data[tabSelected()]()}
        fallback={<p>Fetching value schema...</p>}
        >
        <TableHeader columnNames={Object.keys(data[tabSelected()]()![0])} />
      </Show>
      <Show when={currentItems() ? currentItems()!.length > 0 : false} fallback={<p>No (more) data.</p>}>
        <For each={currentItems()} fallback={<p>Fetching values...</p>}>{(item) =>
          <Record dataItem={item} />
        }</For>
      </Show>
      <PageNavigation
        currentPage={currentPage}
        currentItems={currentItems()}
        prevPage={toPrevPage}
        nextPage={toNextPage}
        updater={setCurrentPage}
        maxItemDisplayed={props.maxItemDisplayed}
       />
  </section>;
};

const tableStyle = (size: "medium" | "large" | "full-width") => {
  var width;
  switch (size) {
    case "medium":
      width = "600px"
      break;
    case "large":
      width = "800px"
    case "full-width":
      width = "100%"
      break;
  }
  return { width } as JSX.CSSProperties
  }

const Record: RecordComponent = (props) => {
  return <div class={styles.record}>
    <For each={Object.values(props.dataItem)}>{(el) =>
      <span>{removeNewLineSpace(handleTypeDisplay(el))}</span>
    }</For>
  </div>;
};

function buttonTabTheming(selectedTabIndex: number, currentTabIndex: number) {

}

const buttonStyle: JSX.CSSProperties = {
  border: "1px solid #2479F6",
  margin: "0 10px",
  "border-radius": "30px",
  "background-color": "transparent",
  color: primaryAdmin,
  width: "180px",
  "font-size": "16px",
  height: "45px",
  transition: "background-color, color .1s ease-in-out",

}

const DataTitles: Component<{dataTitles: string[], tabSelectedIndex: number, setTabSelectedIndex: (idx: number) => void}> = (props) => {;
  return <div class={css({display: "flex", marginBottom: "20px"})}>
  <For each={props.dataTitles}>{(title, i) =>
    <TableTabStyled
      title={title}
      currentTabIndex={i()}
      selectedTabIndex={props.tabSelectedIndex}
      setTabSelectedIndex={props.setTabSelectedIndex}
    />
  }</For>
</div>;
};

const TableTabStyled: Component<{title: string, currentTabIndex: number, selectedTabIndex: number, setTabSelectedIndex: (idx: number) => void}> = (props) => {
  return <Show when={props.currentTabIndex === props.selectedTabIndex}
    fallback={
      <TableTab
        backgroundColor="transparent"
        color="primary.admin"
        title={props.title}
        currentTabIndex={props.currentTabIndex}
        setTabSelectedIndex={props.setTabSelectedIndex}
    />
    }
  >
    <TableTab
      backgroundColor="primary.admin"
      color="white"
      title={props.title}
      currentTabIndex={props.currentTabIndex}
      setTabSelectedIndex={props.setTabSelectedIndex}
    />
  </Show>;
};

const TableTab: Component<{backgroundColor: ColorToken | Property.BackgroundColor, color: ColorToken | Property.Color, title: string, currentTabIndex: number, setTabSelectedIndex: (idx: number) => void}> = (props) => {
  return <button
    class={css({
      border: "1px solid #2479F6",
      marginRight: "10px",
      "&:last-child": {
        marginRight: "0",
      },
      borderRadius: "30px",
      backgroundColor: props.backgroundColor,
      color: props.color,
      width: "180px",
      fontSize: "20px",
      height: "45px",
      transitionProperty: ["color", "background-color"],
      transitionDuration: "0.1s",
      transitionTimingFunction: "ease-in-out",
      _hover: {
        backgroundColor: "primary.admin",
        color: "white"
      }
    })}
  onClick={() => props.setTabSelectedIndex(props.currentTabIndex)}>
    <h2>{props.title}</h2>
</button>;
};

const TableHeader: Component<TableHeaderProps> = (props) => {
  return <div class={styles.tableHeader}>
    <For each={props.columnNames}>{(columnName) =>
      <span>{columnName}</span>
    }</For>
  </div>
}

const PageNavigation: Component<PageNavigationProps> = (props) => {
  const handlePrevDisable = () =>
    props.currentItems === undefined || props.currentPage() === 0
  const handleNextDisable = () =>
    props.currentItems === undefined || props.currentItems.length === 0
  
  return <div class={styles.pageNavigation}>
        <button
          onClick={() => props.prevPage(props.currentPage, props.updater)}
          disabled={handlePrevDisable()}
        >&lt;</button>
      <div>{props.currentPage()+1}</div>
      <button
        onClick={() => props.nextPage(props.currentPage, props.updater)}
        disabled={handleNextDisable()}
        >&gt;</button>
  </div>
}
export default DataTable;