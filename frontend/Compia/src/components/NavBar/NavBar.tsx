import { useState } from "react";
import type { NavItem } from "./NavIten";

type NavBarProps = {
    items: NavItem[];

    className?: string;

    activeClassName?: string;
    inactiveClassName?: string;
};

function NavBar({
    items,
    className,
    activeClassName = " text- text-purple-600 border-b-2 border-purple-600 cursor-pointer",
    inactiveClassName = "text-gray-600 hover:text-purple-600 cursor-pointer",
}: NavBarProps) {

    const [activeItem, setActiveItem] = useState(items[0]?.id);

    return (
        <nav className={className}>
            {items.map(item => (
                <a
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                        setActiveItem(item.id);
                        item.onClick?.();
                    }}
                    className={
                        activeItem === item.id
                            ? activeClassName
                            : inactiveClassName
                    }
                >
                    {item.icon}
                    {item.label}
                </a>
            ))}
        </nav>
    );
}

export default NavBar;