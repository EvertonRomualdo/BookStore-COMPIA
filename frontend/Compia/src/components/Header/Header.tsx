import {Search, ShoppingCart, UserRound } from "lucide-react"
import Logo from "../Logo/Logo"
import NavBar from "../NavBar/NavBar"

function Header(){

    const itensNavegation = [
        {id:"start", label:"Inicio", href:"#"},
        { id: "catalog", label: "Catálogo", href: "#catalogo" },
        { id: "category", label: "Categorias", href: "#categorias" },
        { id: "about", label: "Sobre", href: "#sobre" }
    ]

    const itensSocial = [
        {id: "search", icon: <Search size = '1.5rem'/>},
        {id:"Account", icon: <UserRound size = '1.8rem'/>},
        {id: "setting", icon: <ShoppingCart size = '1.8rem'/>}

    ]

    return (

        <div className="flex justify-between items-center bg-white shadow-2xs">
            <Logo/>
            <NavBar className='flex gap-15 text-1xl items-center justify-between h-100%' items={itensNavegation}/>
            <NavBar className='flex gap-7 items-center justify-between h-100% p-4' items={itensSocial}/>
        </div>
    )
}


export default Header