import { Component, Show, For, createResource, createSignal, Accessor, Setter, createEffect } from "solid-js";
import { RecordComponent, DataTableComponent, TableHeaderProps, PageNavigationProps } from "../types_definition/props";

import styles from '../style/Administration.module.css';
import { removeNewLineSpace } from "../utils/other";
import { useSession } from "../contexts";

const DataTable: DataTableComponent = (props) => {
  const [session] = useSession();
  const [tabSelected, setTabSelected] = createSignal(0);
  const [currentPage, setCurrentPage] = createSignal(0);
  
  const data = props.fetching.map((fetcher) => {
    const [d] = createResource(session.access_token, fetcher);
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
  return <section class={styles.dataTable}>
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

const handleValueDisplay = (v: any): string | undefined => {
  if (v === null) {
    return "null";
  } else if (typeof v === 'boolean') {
    return v.toString();
  }
  return typeof v === 'string'
  || typeof v === 'number'
  || typeof v === 'boolean'
  || typeof v === 'undefined'
  || v === null ? v : "Can't format value for display";
} 

const Record: RecordComponent = (props) => {
  return <div class={styles.record}>
    <For each={Object.values(props.dataItem)}>{(el) =>
      <span>{removeNewLineSpace(handleValueDisplay(el))}</span>
    }</For>
  </div>;
};


const DataTitles: Component<{dataTitles: string[], tabSelectedIndex: number, setTabSelectedIndex: (idx: number) => void}> = (props) => {
  
  return <div class={styles.dataTitles}>
  <For each={props.dataTitles}>{(title, i) =>
    <button classList={{
      [styles.tabSelected]: props.tabSelectedIndex === i()
    }} onClick={() => props.setTabSelectedIndex(i())}>
      <h2>{title}</h2>
    </button>
  }</For>
</div>;
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