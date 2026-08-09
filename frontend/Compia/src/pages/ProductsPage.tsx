import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard/ProductCard";

function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState<any[]>([]); 

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    const booksPerPage = 6;

    // no momento utilizando a base openlibrary para o link das imagens
    // usar links no formato [https://covers.openlibrary.org/b/isbn/NUMERO_DO_ISBN-L.jpg](https://covers.openlibrary.org/b/isbn/NUMERO_DO_ISBN-L.jpg)
    // caso não tenha o isbn usar o olid ex:[https://covers.openlibrary.org/b/olid/](https://covers.openlibrary.org/b/olid/){CODIGO_AQUI}-L.jpg
    const initialBooks = [
        { 
            id: 1, 
            title: "IA: Uma Abordagem Moderna", 
            author: "Stuart Russell", 
            price: 250.00, 
            oldPrice: 300.00,
            isNew: true,
            tags: [{ label: "Best Seller", colorClass: "bg-blue-100 text-blue-700" }],
            imageUrl: "https://covers.openlibrary.org/b/isbn/9788535237016-L.jpg" 
        },
        { 
            id: 2, 
            title: "Superinteligência", 
            author: "Nick Bostrom", 
            price: 65.90, 
            tags: [{ label: "Filosofia", colorClass: "bg-purple-100 text-purple-700" }],
            imageUrl: "https://covers.openlibrary.org/b/isbn/8594540604-L.jpg" 
        },
        { 
            id: 3, 
            title: "Life 3.0", 
            author: "Max Tegmark", 
            price: 79.90, 
            isNew: true,
            imageUrl: "https://covers.openlibrary.org/b/isbn/9781101946596-L.jpg" 
        },
        { 
            id: 4, 
            title: "Deep Learning", 
            author: "Ian Goodfellow", 
            price: 310.00, 
            oldPrice: 350.00,
            tags: [{ label: "Técnico", colorClass: "bg-gray-200 text-gray-800" }],
            imageUrl: "https://covers.openlibrary.org/b/isbn/9780262035613-L.jpg" 
        },
        { 
            id: 5, 
            title: "Machine Learning", 
            author: "Tom Mitchell", 
            price: 180.00, 
            imageUrl: "https://covers.openlibrary.org/b/isbn/9780070428072-L.jpg" 
        },
        { 
            id: 6, 
            title: "Rebooting AI", 
            author: "Gary Marcus", 
            price: 85.50, 
            imageUrl: "https://covers.openlibrary.org/b/isbn/9781524748258-L.jpg" 
        },
        {
            id: 7,
            title: "Utilização de ML em elementos textuais geográficos",
            author: "Matheus Emerick de Magalhães",
            price: 60.00,
            tags: [{ label: "Tese", colorClass: "bg-green-100 text-green-700" }],
            imageUrl: "https://covers.openlibrary.org/b/olid/OL45635391M-L.jpg"
        }
    ];

    // Lógica do LocalStorage disparada quando a tela carrega
    useEffect(() => {
        // 1. Tenta buscar o banco de dados no navegador
        const storedBooks = localStorage.getItem('booksDB');
        
        if (storedBooks) {
            // 2. Se existe, transforma o texto de volta em lista (Array)
            setBooks(JSON.parse(storedBooks));
        } else {
            // 3. Se não existe, cria o banco salvando a lista inicial
            localStorage.setItem('booksDB', JSON.stringify(initialBooks));
            setBooks(initialBooks);
        }
    }, []);

    function changePage(newPage: number) {
        setSearchParams({ page: newPage.toString() });
    }
    
    // As variáveis de paginação agora usam o estado 'books' que veio do LocalStorage
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook); 
    const totalPages = Math.ceil(books.length / booksPerPage);

    return (
        <>
            <Header/>
            <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col items-center py-10'>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Nossos Livros</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 mb-10">
                    {/* Renderizamos os livros que estão no estado */}
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
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </>
    )
}
export default ProductsPage;