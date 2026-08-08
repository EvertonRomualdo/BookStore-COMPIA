import { Package, User as UserIcon, Lock, LogOut } from "lucide-react";
import NavBar from "../NavBar/NavBar";
import type { NavItem } from "../NavBar/NavIten";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function AccountSidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const getInitials = (name?: string) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const menuItems: NavItem[] = [
        { id: "orders", href: "/account", label: "Meus Pedidos", icon: <Package size={20} /> },
        { id: "profile", href: "/account/profile", label: "Dados Pessoais", icon: <UserIcon size={20} /> },
        { id: "security", href: "/account/security", label: "Segurança", icon: <Lock size={20} /> }
    ];

    const logoutItem: NavItem[] = [
        { id: "logout", href: "#", label: "Sair da Conta", icon: <LogOut size={20} />, onClick: handleLogout }
    ];

    return (
        <aside className="col-span-1 flex flex-col gap-8 w-full max-w-[280px]">
            <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 border-[4px] border-white shadow-sm transition-transform duration-300 group-hover:scale-105 overflow-hidden bg-[#EEF2FF]">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={`Foto de perfil de ${user.name}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-3xl font-bold text-[#4F46E5]">
                            {getInitials(user?.name)}
                        </span>
                    )}

                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                    {user?.name || 'Carregando...'}
                </h2>
                <span className="text-sm text-gray-500">{user?.email}</span>
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
                    activeClassName=""
                    inactiveClassName="flex items-center gap-4 w-full px-5 py-3.5 text-slate-500 rounded-2xl font-medium transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:translate-x-1"
                />
            </div>
        </aside>
    );
}