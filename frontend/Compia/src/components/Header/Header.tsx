import {ShoppingCart, UserRound } from "lucide-react"
import Logo from "../Logo/Logo"
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar"

function Header(){

    const itensNavegation = [
        {id:"start", label:"Inicio", href:"/"},
        { id: "catalog", label: "Catálogo", href: "/catalog" },
        { id: "category", label: "Categorias", href: "/categories" },
        { id: "about", label: "Sobre", href: "/aboult" }
    ]

    const itensSocial = [
        {id:"Account", href:"/login", icon: <UserRound size = '1.8rem'/>},
        {id: "setting", href:"/cart", icon: <ShoppingCart size = '1.8rem'/>}
    ]

    return (
        <div className="flex w-full justify-between items-center bg-white shadow-2xs sticky top-0">
            <Link to={'/'}> <Logo/></Link>
            <NavBar className='flex gap-15 text-1xl items-center justify-between h-100%' items={itensNavegation}/>
            <NavBar className='flex gap-7 items-center justify-between h-100% p-4' activeClassName="text-gray-600 hover:text-purple-600 cursor-pointer" items={itensSocial}/>
        </div>
    )
}

export default Header