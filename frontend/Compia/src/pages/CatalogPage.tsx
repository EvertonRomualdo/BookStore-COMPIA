import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import { initialBooks } from "../service/books"; 
import { getItem, setItem, STORAGE_KEYS } from "../service/storage"; 

function CatalogPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [books, setBooks] = useState<any[]>([]); 

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    const booksPerPage = 6;

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" }, { replace: true });
        }

        const storedBooks = getItem<any[]>(STORAGE_KEYS.BOOKS);
        
        if (storedBooks && Array.isArray(storedBooks) && storedBooks.length > 0) {
            setBooks(storedBooks);
        } else {
            // 3. CORREÇÃO: Salvamos a constante 'initialBooks', não o estado vazio
            setItem(STORAGE_KEYS.BOOKS, initialBooks);
            setBooks(initialBooks);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function changePage(newPage: number) {
        setSearchParams({ page: newPage.toString() });
    }
    
    const safeBooks = Array.isArray(books) ? books : [];
    
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = safeBooks.slice(indexOfFirstBook, indexOfLastBook); 
    
    const totalPages = Math.ceil(safeBooks.length / booksPerPage) || 1; 

    return (
        <>
            <Header/>
            <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col items-center py-10'>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Catálogo de Livros</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 mb-10">
                    {currentBooks.map((book) => (
                        <ProductCard 
                            key={book.id} 
                            book={book} 
                        />
                    ))}
                </div>

                {/* Paginação */}
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                    >
                        Anterior
                    </button>
                    
                    <span className="font-medium text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </>
    )
}
export default CatalogPage;