import { ReactNode } from "react";

export interface NavItem {
    title: string,
    link: string,
    page: ReactNode
}

export interface TabItem {
    label: string,
    nav: ReactNode
}
