import { JSX, Setter, Accessor, ResourceFetcher } from "solid-js"
import { LoaderType } from "../miscellaneous";
import { AverageTimeSample, BlockOfContent, FileUploadStatus, Stats } from "./data";
import { SizeToken } from "../../styled-system/tokens";

export interface APIDocDescriptionBlockProps {
    title: string,
    content: string
}

export interface DrawerButtonProps {
    setDrawerVisible: Setter<boolean>,
}

export interface SearchButtonProps {
    setSearchModalVisible: Setter<boolean>

}

export interface SearchModalProps {
    searchModalVisible: boolean,
    setSearchModalVisible: Setter<boolean>,
    setSearchInput: Setter<string>,
    previousInput: string,
}

export interface HeaderProps extends DrawerButtonProps {}

export interface LoaderProps {
    loaderType?: LoaderType,
    placeholderText?: string,
    size?: 'small' | 'medium' | 'large',
}

interface RecordProps<T extends object> {
    dataItem: T
}

export type RecordComponent = <T extends object>(props: RecordProps<T>) => JSX.Element;



export interface TableHeaderProps {
    columnNames: string[]
}

export interface DataTableProps {
    fetching: ResourceFetcher<any, any[], any>[]
    tableTitle: string,
    maxItemDisplayed: number,
    dataTitles?: string[]
    size: SizeToken
}

export interface PageNavigationProps {
    currentPage: Accessor<number>,
    currentItems: any[]|undefined,
    updater: Setter<number>,
    maxItemDisplayed: number,
    prevPage: (currentPage: Accessor<number>, updater: Setter<number>) => void,
    nextPage: (currentPage: Accessor<number>, updater: Setter<number>) => void
}

export interface StatusNotificationProps {
    isSuccess?: boolean,
    description?: string,
    opened: boolean,
    setOpen: Setter<boolean>
}

export interface ContentProps {
    content: BlockOfContent[] | undefined
}

export interface SamplesChartProps {
    fetching: ResourceFetcher<any, AverageTimeSample[], any>
}

export interface StatsProps {
    fetching: ResourceFetcher<any, Stats, any>
}

export interface DragAndDropProps {
    sendAction: ResourceFetcher<any, FileUploadStatus|null, any>
    sendButtonText: string
}