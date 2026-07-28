import type { ReactNode } from "react";

export interface BaseCardProps {
    title: ReactNode;
    description: ReactNode;
    className?: string;
}

export interface IconCardProps extends BaseCardProps {
    icon: ReactNode;
}