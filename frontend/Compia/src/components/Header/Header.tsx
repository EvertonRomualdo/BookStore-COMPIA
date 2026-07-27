import { Link } from 'react-router-dom';
import { Search, ShoppingCart, UserRound } from "lucide-react";
import Logo from "../Logo/Logo";
import NavBar from "../NavBar/NavBar";
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext'; 

function Header() {
    const { cartItems } = useContext(CartContext);

    const totalItems = cartItems.reduce((acumulador, item) => {
        return acumulador + item.quantity;
    }, 0); 

    const itensNavegation = [
        { id: "start", label: "Inicio", href: "#" },
        { id: "catalog", label: "Catálogo", href: "#catalogo" },
        { id: "category", label: "Categorias", href: "#categorias" },
        { id: "about", label: "Sobre", href: "#sobre" }
    ];

    const itensSocial = [
        { id: "search", icon: <Search size='1.5rem'/> },
        { id: "account", icon: <UserRound size='1.8rem'/> },
        { 
            id: "cart", 
            icon: (
                <Link to="/carrinho" className="relative flex items-center">
                    <ShoppingCart size='1.8rem'/>
                    
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Link>
            )
        }
    ];

    return (
        <div className="flex w-full justify-between items-center bg-white shadow-sm sticky top-0 z-50">
            <Logo/>
            <NavBar className='flex gap-15 text-1xl items-center justify-between h-full' items={itensNavegation}/>
            <NavBar className='flex gap-7 items-center justify-between h-full p-4' items={itensSocial}/>
        </div>
    );
}

export default Header;