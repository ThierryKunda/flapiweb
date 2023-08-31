import { Component, Show, For, createResource, createSignal, Accessor, Setter, JSX } from "solid-js";
import { RecordComponent, TableHeaderProps, PageNavigationProps, DataTableProps } from "../types_definition/props";
import { css } from "../../styled-system/css"
import { handleTypeDisplay, removeNewLineSpace } from "../utils/other";
import { useSession } from "../contexts";
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
  return <div class={css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    margin: "10px 0",
    minHeight: "60px",
    fontSize: "24px",
    border: "1px solid #AAAAAA",
    borderRadius: "10px",
  })}>
    <For each={Object.values(props.dataItem)}>{(el) =>
      <span class={css({
        display: "inline-block",
        maxHeight: "80px",
        fontSize: "20px",
        textAlign: "center",
        width: "120px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      })}>{removeNewLineSpace(handleTypeDisplay(el))}</span>
    }</For>
  </div>;
};

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
  return <div class={css({
    marginBottom: "40px",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 50px",
    borderRadius: "10px",
    border: "1px solid #2479F6",
    backgroundColor: "primary.admin",
    color: "white",
  })}>
    <For each={props.columnNames}>{(columnName) =>
      <span class={css({
        textAlign: "center",
        display: "block",
        fontWeight: "500",
        width: "120px",
        fontSize: "small",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      })}
      title={columnName}>{columnName}</span>
    }</For>
  </div>
}

const PageNavigation: Component<PageNavigationProps> = (props) => {
  const handlePrevDisable = () =>
    props.currentItems === undefined || props.currentPage() === 0
  const handleNextDisable = () =>
    props.currentItems === undefined || props.currentItems.length === 0
  
  return <div
   class={css({
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
   })}
    >
      <PageNavigationButton
        description="<"
        onClick={() => props.prevPage(props.currentPage, props.updater)}
        disabled={handlePrevDisable()}
      />
      <div class={css({
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}>{props.currentPage()+1}</div>
        <PageNavigationButton
          description=">"
          onClick={() => props.nextPage(props.currentPage, props.updater)}
          disabled={handleNextDisable()}
        />
  </div>
}

const PageNavigationButton: Component<{description: string, onClick: () => void, disabled: boolean}> = (props) => {
  return <button
    class={css({
      border: "1px solid #AAAAAA",
      width: "50px",
      height: "50px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "20px",
      transitionProperty: "background-color",
      transitionTimingFunction: "ease-in",
      transitionDuration: ".1s",
      "&:hover": {
        backgroundColor: "#eee",
      }
    })}
    {...props}
    title={props.description === "<" ? "Previous" : "Next"}>{props.description}</button>;
};

export default DataTable;