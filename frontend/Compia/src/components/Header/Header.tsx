import { useState, useContext } from "react";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();
    const { cartItems } = useContext(CartContext);

    // Calculando a quantidade total de livros
    const totalItems = cartItems.reduce((acumulador, item) => {
        return acumulador + item.quantity;
    }, 0);

    const itensNavegation = [
        { id: "start", label: "Inicio", href: "/" },
        { id: "catalog", label: "Catálogo", href: "/catalog" },
        { id: "category", label: "Categorias", href: "/categories" },
        { id: "about", label: "Sobre", href: "/about" }
    ];

    const itensSocial = [
        { id: "Account", href: user ? "/account" : "/login", icon: <UserRound size='1.8rem' /> },
        { 
            id: "cart", 
            href: "/carrinho",
            icon: (
                <div className="relative flex items-center">
                    <ShoppingCart size='1.8rem' />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </div>
            ) 
        }
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

                    {!user && (
                        <div className="hidden md:flex items-center gap-4 mr-2 border-r border-gray-200 pr-6">
                            <Link to="/login" className="text-gray-600 hover:text-[#5A46F3] font-medium transition-colors">
                                Entrar
                            </Link>
                            <Link to="/register" className="bg-[#5A46F3] hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-md hover:-translate-y-0.5">
                                Cadastre-se
                            </Link>
                        </div>
                    )}

                    <NavBar
                        className='flex gap-4 md:gap-7 items-center'
                        activeClassName="text-gray-600 hover:text-[#5A46F3] cursor-pointer"
                        inactiveClassName="text-gray-600 hover:text-[#5A46F3] cursor-pointer"
                        items={itensSocial}
                    />

                    <button
                        className="md:hidden p-1 text-gray-600 hover:text-[#5A46F3] transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col px-6 py-4 animate-in slide-in-from-top-2">
                    {!user && (
                        <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-gray-100">
                            <Link to="/register" className="!bg-purple-600 hover:!bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-md hover:-translate-y-0.5">
                                Cadastre-se
                            </Link>
                            <Link to="/login" onClick={handleMobileClick} className="bg-gray-50 text-gray-700 text-center px-4 py-3 rounded-xl font-semibold border border-gray-200">
                                Entrar
                            </Link>
                        </div>
                    )}

                    <NavBar
                        className='flex flex-col gap-6 text-lg items-start py-2'
                        activeClassName="text-[#5A46F3] font-semibold"
                        inactiveClassName="text-gray-600 hover:text-[#5A46F3]"
                        items={mobileNavegation}
                    />
                </div>
            )}
        </div>
    );
}

export default Header;