import Header from '../components/Header/Header';
import { DefaultButton } from '../components/DefaultButton/DefaultButton';
import InformationCardIcon from '../components/InformationCard/InformationCardIcon';
import { Brain, Box, Shield, Server } from 'lucide-react';
import ProductCard from '../components/ProductCard/ProductCard';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router';
import {getImageBookUrl} from "../helpers/imageHelper.ts";

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] overflow-hidden">
        <Header />

        {/* Intro*/}
        <main className="max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
            <div className="flex flex-col items-start gap-6 lg:w-1/2">
                <h1 className="text-6xl lg:text-8xl font-extrabold text-[#111827] leading-[1.1] tracking-tight">
                    Domine o Futuro <br className="hidden lg:block" />
                    com a <span className="text-[#6366F1]">Inteligência <br className="hidden lg:block" /> Artificial</span>
                </h1>
                <p className="text-gray-500 text-xl sm:text-2xl max-w-lg leading-relaxed mt-2">
                    Livros e e-books especializados em IA, Arquitetura de Software e Cibersegurança para estudantes e profissionais que constroem o amanhã.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                    <DefaultButton variant="primary" className="px-8 py-4 text-base rounded-lg shadow-md shadow-purple-200">
                    Explorar Livros <span className="ml-1 font-bold">→</span>
                    </DefaultButton>
                    <DefaultButton variant="secondary" className="px-8 py-4 text-base rounded-lg">
                    Conheça a Editora
                    </DefaultButton>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2"></div>
        </main>

        {/* Explore Section*/}
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
                <InformationCardIcon icon={<Brain className="text-[#6366F1]" size={28} />} title="Inteligência Artificial" description="12 obras publicadas" />
                <InformationCardIcon icon={<Box className="text-[#6366F1]" size={28} />} title="Blockchain" description="8 obras publicadas" />
                <InformationCardIcon icon={<Shield className="text-[#6366F1]" size={28} />} title="Cibersegurança" description="5 obras publicadas" />
                <InformationCardIcon icon={<Server className="text-[#6366F1]" size={28} />} title="Arquit. de Software" description="15 obras publicadas" />
            </div>
        </section>

        {/* Main books disponible */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-32" id="catalogo">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-[#111827]">Catálogo de Publicações</h2>
                    <p className="text-gray-500 text-lg mt-1">Lançamentos e mais vendidos</p>
                </div>
            
                <div className="flex flex-wrap gap-3">
                   <span className='px-5 py-2 rounded-full text-sm font-semibold bg-[#1E1B4B] text-white'><Link to='/register'>Veja Nosso Catalogo Completo</Link></span>
                </div>
            </div>

            {/* Main Books */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
                <ProductCard
                    title="Arquitetura de Software Inteligente"
                    author="Por Dr. Carlos Almeida"
                    imageUrl={getImageBookUrl('arquiteturaSoftware.jpg',
                        'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073824/arquiteturaSoftware_tmvn9d.jpg')}

                    price="R$ 120,00"
                    oldPrice="R$ 150,00"
                    isNew={true}
                    tags={[
                    { label: 'FÍSICO', colorClass: 'bg-blue-50 text-blue-600' },
                    { label: 'IA', colorClass: 'bg-purple-50 text-purple-600' }
                    ]}
                />

                <ProductCard
                    title="Fundamentos de Deep Learning"
                    author="Por Profa. Maria Silva"
                    imageUrl={getImageBookUrl('deepLearning.jpg',
                        'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073824/deepLearning_pjdxov.jpg')}
                    price="R$ 85,00"
                    tags={[
                    { label: 'E-BOOK', colorClass: 'bg-green-50 text-green-600' },
                    { label: 'IA', colorClass: 'bg-purple-50 text-purple-600' }
                    ]}
                />

                <ProductCard
                    title="Cibersegurança e Redes Descentralizadas"
                    author="Por João Pereira"
                    imageUrl={getImageBookUrl('ciberSeguranca.jpg',
                        'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073824/ciberSeguranca_s8op3x.jpg')}
                    price="R$ 140,00"
                    tags={[
                    { label: 'FÍSICO', colorClass: 'bg-blue-50 text-blue-600' },
                    { label: 'SEGURANÇA', colorClass: 'bg-gray-100 text-gray-600' }
                    ]}
                />

                <ProductCard
                    title="Blockchain aplicado ao Mercado"
                    author="Por Ana Costa"
                    imageUrl={getImageBookUrl('blockchain.jpg',
                        'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073824/blockchain_avkeir.jpg')}
                    price="R$ 185,00"
                    tags={[
                    { label: 'KIT FÍSICO+EBOOK', colorClass: 'bg-amber-50 text-amber-600' }
                    ]}
                />

            </div>
        </section>
        
        <Footer />
    </div>
  );
}

export default HomePage;