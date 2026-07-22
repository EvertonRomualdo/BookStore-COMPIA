function NavBar() {

    return (

        //TODO - Implementar focus dinâmico

        <>
            <nav className="hidden md:flex space-x-8">
                <a href="#"  className="text-[#683EE7] font-medium border-b-2 pb-1">Início</a>
                <a href="#catalogo" className="text-gray-600 hover:text-[#683EE7] font-medium transition-colors">Catálogo</a>
                <a href="#categorias" className="text-gray-600 hover:text-[#683EE7] font-medium transition-colors">Categorias</a>
                <a href="#" className="text-gray-600 hover:text-[#683EE7] font-medium transition-colors">Sobre</a>
            </nav>
        </>
        
    )
}

export default NavBar