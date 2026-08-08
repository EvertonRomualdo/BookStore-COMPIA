import { useState } from "react";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const itensNavegation = [
        { id: "start", label: "Inicio", href: "/" },
        { id: "catalog", label: "Catálogo", href: "/catalog" },
        { id: "category", label: "Categorias", href: "/categories" },
        { id: "about", label: "Sobre", href: "/aboult" }
    ];

    const itensSocial = [
        { id: "Account", href: "/account", icon: <UserRound size='1.8rem' /> },
        { id: "setting", href: "/cart", icon: <ShoppingCart size='1.8rem' /> }
    ];

    const handleMobileClick = () => setIsMenuOpen(false);
    const mobileNavegation = itensNavegation.map(item => ({
        ...item,
        onClick: handleMobileClick
    }));

    return (
        <div className="bg-white shadow-sm sticky top-0 z-50">
            <div className="flex w-full justify-between items-center p-4 max-w-7xl mx-auto h-18">

                <Link to={'/'} className="z-50 shrink-0">
                    <Logo />
                </Link>

                <NavBar
                    className='hidden md:flex gap-8 lg:gap-15 text-lg items-center h-full'
                    items={itensNavegation}
                />

                <div className="flex items-center gap-4 md:gap-7 z-50">
                    <NavBar
                        className='flex gap-4 md:gap-7 items-center'
                        activeClassName="text-gray-600 hover:text-purple-600 cursor-pointer"
                        items={itensSocial}
                    />

                    <button
                        className="md:hidden p-1 text-gray-600 hover:text-purple-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col px-6 py-4 animate-in slide-in-from-top-2">
                    <NavBar
                        className='flex flex-col gap-6 text-lg items-start py-2'
                        activeClassName="text-purple-600 font-semibold"
                        inactiveClassName="text-gray-600 hover:text-purple-600"
                        items={mobileNavegation}
                    />
                </div>
            )}
        </div>
    );
}

export default Header;