import { Component } from "solid-js";
import { HeaderProps, DrawerButtonProps, SearchButtonProps } from "../types_definition/props";

import styles from "../style/Documentation.module.css";

const Header: Component<HeaderProps> = (props) => {
    return <header>
        <DrawerButton setDrawerVisible={props.setDrawerVisible} />
        {/* <SearchButton setSearchModalVisible={props.setSearchModalVisible} />  */}
    </header>;
}

const DrawerButton: Component<DrawerButtonProps> = (props) => {
    return <button class={styles.drawerToggler} onClick={() => props.setDrawerVisible(v => !v)}>
        <span></span>
        <span></span>
        <span></span>
    </button>;
}

const SearchButton: Component<SearchButtonProps> = (props) => {
    return <button onClick={() => props.setSearchModalVisible(true)}>
        <svg class={styles.searchIcon} viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1586 22.5464C5.069 22.5464 0.132397 17.6098 0.132397 11.5202C0.132397 5.43059 5.069 0.493988 11.1586 0.493988C17.2482 0.493988 22.1848 5.43059 22.1848 11.5202C22.1848 17.6098 17.2482 22.5464 11.1586 22.5464ZM11.1586 19.2051C6.91431 19.2051 3.47364 15.7645 3.47364 11.5202C3.47364 7.27593 6.91431 3.83526 11.1586 3.83526C15.4029 3.83526 18.8435 7.27593 18.8435 11.5202C18.8435 15.7645 15.4029 19.2051 11.1586 19.2051Z" fill="#5CD8F3"/>
        <rect width="2.67302" height="14.7016" transform="matrix(-0.707107 0.707107 0.707107 0.707107 18.4719 17.2004)" fill="#5CD8F3"/>
        </svg>
    </button>;
}

export default Header;