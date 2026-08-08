import { Package, User, Lock, LogOut } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import type { NavItem } from "../NavBar/NavIten";

export function AccountSidebar() {
    const menuItems: NavItem[] = [
        { id: "orders", href: "/account", label: "Meus Pedidos", icon: <Package size={20} /> },
        { id: "profile", href: "/account/profile", label: "Dados Pessoais", icon: <User size={20} /> },
        { id: "security", href: "/account/security", label: "Segurança", icon: <Lock size={20} /> }
    ];

    const logoutItem: NavItem[] = [
        { id: "logout", href: "/logout", label: "Sair da Conta", icon: <LogOut size={20} /> }
    ];

    return (
        <aside className="col-span-1 flex flex-col gap-8 w-full max-w-[280px]">
            <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-24 h-24 bg-[#EEF2FF] rounded-full flex items-center justify-center mb-4 border-[4px] border-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <span className="text-3xl font-bold text-[#4F46E5]">JD</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">João Da Silva</h2>
                <span className="text-sm text-gray-500">joao.silva@email.com</span>
            </div>

            <div className="flex flex-col gap-2 w-full pl-2 md:pl-0">
                <NavBar
                    className="flex flex-col gap-2 w-full"
                    items={menuItems}
                    activeClassName="flex items-center gap-4 w-full px-5 py-3.5 !bg-purple-600 text-white rounded-2xl font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-200"
                    inactiveClassName="flex items-center gap-4 w-full px-5 py-3.5 text-slate-600 rounded-2xl font-medium transition-all duration-300 hover:bg-purple-50 hover:text-purple-700 hover:translate-x-1"
                />

                <hr className="my-4 border-gray-200" />

                <NavBar
                    className="flex flex-col gap-2 w-full"
                    items={logoutItem}
                    activeClassName="flex items-center gap-4 w-full px-5 py-3.5 bg-red-50 text-red-600 rounded-2xl font-semibold transition-colors"
                    inactiveClassName="flex items-center gap-4 w-full px-5 py-3.5 text-slate-500 rounded-2xl font-medium transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:translate-x-1"
                />
            </div>
        </aside>
    );
}