import type { ReactNode } from "react";

export type NavItem = {
    id: string;
    href?: string;
    label?: string;
    icon?: ReactNode;
    onClick?: () => void;
};