import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import { initialBooks } from '../service/books';
import { getItem, STORAGE_KEYS } from '../service/storage';
import { Library } from 'lucide-react';

export function CategoryPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const currentTag = searchParams.get('tag') || 'TODOS';
    
    const [allBooks, setAllBooks] = useState<any[]>([]);

    useEffect(() => {
        const storedBooks = getItem<any[]>(STORAGE_KEYS.BOOKS);
        if (storedBooks && storedBooks.length > 0) {
            setAllBooks(storedBooks);
        } else {
            setAllBooks(initialBooks);
        }
    }, []);

    const filteredBooks = currentTag === 'TODOS' 
        ? allBooks 
        : allBooks.filter(book => book.tags?.some((t: any) => t.label === currentTag));

    const filterOptions = ["TODOS", "IA", "BLOCKCHAIN", "SEGURANÇA", "ARQUITETURA", "E-BOOK", "FÍSICO"];

    const handleFilterClick = (tag: string) => {
        setSearchParams({ tag: tag });
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 py-12 w-full">
                
                {/* Cabeçalho da Página */}
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <Library size={48} className="text-[#6366F1] mb-4" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
                        Nossas Categorias
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Navegue por nossas estantes virtuais e encontre o material perfeito para o seu desenvolvimento profissional.
                    </p>
                </div>

                {/* Barra de Filtros (Pills) */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleFilterClick(option)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                                currentTag === option 
                                ? "bg-[#1E1B4B] text-white ring-2 ring-[#6366F1] ring-offset-2" 
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            {option === "IA" ? "INTELIGÊNCIA ARTIFICIAL" : option}
                        </button>
                    ))}
                </div>

                {/* Grid de Livros */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <ProductCard
                                key={book.id}
                                book={book}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">Nenhum livro encontrado</h3>
                        <p className="text-gray-500 mb-6">Ainda não temos publicações para esta categoria.</p>
                        <button 
                            onClick={() => handleFilterClick('TODOS')}
                            className="text-[#6366F1] font-semibold hover:underline"
                        >
                            Ver todo o catálogo
                        </button>
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}

export default CategoryPage;