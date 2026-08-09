import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { CartContext } from "../contexts/CartContext";
import { getItem, STORAGE_KEYS } from "../service/storage";
import { initialBooks } from "../service/books";
import { ShoppingCart, BookOpen, Globe, Calendar, ArrowLeft } from "lucide-react";

export function ProductDetailsPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const allBooks = getItem<any[]>(STORAGE_KEYS.BOOKS) || initialBooks;
        const foundBook = allBooks.find(b => b.id === Number(id));
        
        if (foundBook) {
            setBook(foundBook);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#F9FAFB]"><Header /></div>;

    if (!book) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-700">Livro não encontrado</h2>
                    <button onClick={() => navigate('/catalog')} className="mt-4 text-[#6366F1] hover:underline">
                        Voltar para o catálogo
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col font-sans">
            <Header />

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
                
                {/* Botão de Voltar */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-500 hover:text-[#6366F1] transition-colors font-medium mb-8"
                >
                    <ArrowLeft size={20} /> Voltar
                </button>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Coluna da Imagem */}
                    <div className="md:w-2/5 bg-gray-50 p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                        <img 
                            src={book.imageUrl} 
                            alt={`Capa do livro ${book.title}`} 
                            className="w-full max-w-[280px] object-cover rounded-md shadow-2xl transition-transform hover:scale-105 duration-300"
                        />
                    </div>

                    {/* Coluna dos Detalhes */}
                    <div className="md:w-3/5 p-10 flex flex-col justify-center">
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {book.tags?.map((tag: any, index: number) => (
                                <span key={index} className={`px-3 py-1 rounded text-xs font-extrabold uppercase tracking-wider ${tag.colorClass}`}>
                                    {tag.label}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
                            {book.title}
                        </h1>
                        <p className="text-lg text-gray-500 font-medium mb-8">
                            por <span className="text-[#6366F1]">{book.author}</span>
                        </p>

                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-4xl font-extrabold text-slate-900">
                                R$ {book.price.toFixed(2).replace('.', ',')}
                            </span>
                            {book.oldPrice && (
                                <span className="text-lg text-gray-400 line-through mb-1 font-medium">
                                    R$ {book.oldPrice.toFixed(2).replace('.', ',')}
                                </span>
                            )}
                        </div>

                        <button 
                            onClick={() => addToCart(book)}
                            className="flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 bg-[#1E1B4B] hover:bg-[#3f3899] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mb-10"
                        >
                            <ShoppingCart size={22} />
                            Adicionar ao Carrinho
                        </button>

                        <hr className="border-gray-100 mb-8" />

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><BookOpen size={20} /></div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Páginas</span>
                                    <span className="text-sm font-semibold text-gray-700">{book.pages || "N/A"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Globe size={20} /></div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Idioma</span>
                                    <span className="text-sm font-semibold text-gray-700">{book.language || "N/A"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Calendar size={20} /></div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Lançamento</span>
                                    <span className="text-sm font-semibold text-gray-700">{book.year || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sinopse */}
                <div className="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Sinopse da Obra</h3>
                    <p className="text-gray-600 leading-relaxed text-lg text-justify">
                        {book.description || "Nenhuma descrição disponível para este livro no momento."}
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default ProductDetailsPage;