import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { DefaultButton } from '../components/DefaultButton/DefaultButton';
import InformationCardIcon from '../components/InformationCard/InformationCardIcon';
import { Brain, Box, Shield, Server } from 'lucide-react';
import ProductCard from '../components/ProductCard/ProductCard';
import Footer from '../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { initialBooks } from "../service/books";
import { getItem, STORAGE_KEYS } from "../service/storage";

export function HomePage() {
    const navigate = useNavigate();
    
    const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);

    useEffect(() => {
        const storedBooks = getItem<any[]>(STORAGE_KEYS.BOOKS);
        
        if (storedBooks && Array.isArray(storedBooks) && storedBooks.length > 0) {
            setFeaturedBooks(storedBooks.slice(0, 4));
        } else {
            setFeaturedBooks(initialBooks.slice(0, 4));
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Header />

            <main className="max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
                <div className="flex flex-col items-start gap-6 lg:w-1/2">
                    <h1 className="text-6xl lg:text-8xl font-extrabold text-[#111827] leading-[1.1] tracking-tight">
                        Domine o Futuro <br className="hidden lg:block" />
                        com a <span className="text-[#6366F1]">Inteligência <br className="hidden lg:block" /> Artificial</span>
                    </h1>
                    <p className="text-gray-500 text-xl sm:text-2xl max-w-lg leading-relaxed mt-2">
                        Livros e e-books especializados em IA, Arquitetura de Software e Cibersegurança para estudantes e profissionais que constroem o amanhã
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">

                        <DefaultButton
                            variant="primary"
                            className="px-8 py-4 text-base rounded-lg shadow-md shadow-purple-200"
                            onClick={() => navigate('/catalog')}
                        >
                            Explorar Livros <span className="ml-1 font-bold"> </span>
                        </DefaultButton>

                        <DefaultButton
                            variant="secondary"
                            className="px-8 py-4 text-base rounded-lg"
                            onClick={() => navigate('/about')}
                        >
                            Conheça a Editora
                        </DefaultButton>

                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2"></div>
            </main>

            <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
                <div className="text-center mb-12 flex flex-col items-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#111827]">
                        Explore por Áreas do Conhecimento
                    </h2>
                    <p className="text-gray-500 text-lg mt-4 max-w-2xl text-center">
                        Encontre materiais específicos para aprofundar sua pesquisa acadêmica ou avançar na sua carreira profissional.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/categories?tag=IA" className="block transition-transform hover:-translate-y-1">
                        <InformationCardIcon icon={<Brain className="text-[#6366F1]" size={28} />} title="Inteligência Artificial" description="12 obras publicadas" />
                    </Link>
                    
                    <Link to="/categories?tag=BLOCKCHAIN" className="block transition-transform hover:-translate-y-1">
                        <InformationCardIcon icon={<Box className="text-[#6366F1]" size={28} />} title="Blockchain" description="8 obras publicadas" />
                    </Link>
                    
                    <Link to="/categories?tag=SEGURANÇA" className="block transition-transform hover:-translate-y-1">
                        <InformationCardIcon icon={<Shield className="text-[#6366F1]" size={28} />} title="Cibersegurança" description="5 obras publicadas" />
                    </Link>
                    
                    <Link to="/categories?tag=ARQUITETURA" className="block transition-transform hover:-translate-y-1">
                        <InformationCardIcon icon={<Server className="text-[#6366F1]" size={28} />} title="Arquit. de Software" description="15 obras publicadas" />
                    </Link>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-32" id="catalogo">

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#111827]">Catálogo de Publicações</h2>
                        <p className="text-gray-500 text-lg mt-1">Lançamentos e mais vendidos</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className='px-5 py-2 rounded-full text-sm font-semibold bg-[#1E1B4B] text-white hover:bg-[#2d2859] transition-colors cursor-pointer'>
                        <Link to='/catalog'>Veja Nosso Catalogo Completo</Link>
                    </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredBooks.map((book) => (
                        <ProductCard
                            key={book.id}
                            book={book}
                            loading="lazy"
                        />
                    ))}
                </div>
            </section>
            
            <Footer />
        </div>
    );
}

export default HomePage;