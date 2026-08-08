import { Link, useLocation } from "react-router-dom";
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
                    activeClassName = " text- text-purple-600 border-b-2 pb-1 border-purple-600 cursor-pointer",
                    inactiveClassName = "text-gray-600 hover:text-purple-600 cursor-pointer",
                }: NavBarProps) {

    const location = useLocation();

    return (
        <nav className={className}>
            {items.map(item => {
                const isActive = location.pathname === item.href;

                return (
                    <Link
                        key={item.id}
                        to={item.href || "#"}
                        onClick={item.onClick}
                        className={isActive ? activeClassName : inactiveClassName}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default NavBar;