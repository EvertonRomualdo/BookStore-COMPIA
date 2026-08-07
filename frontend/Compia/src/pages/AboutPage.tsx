import Footer from '../components/Footer/Footer';
import Header from "../components/Header/Header";
import InformationCardIcon from "../components/InformationCard/InformationCardIcon";
import { Target, Eye, Gem } from "lucide-react";
import {getImageUrl} from "../helpers/imageHelper.ts";

function AboutPage() {
    return (
        <div className="bg-[#F9FAFB] min-h-screen flex flex-col font-sans overflow-hidden">
            <Header />

            <main className="flex-1 flex flex-col gap-12 py-12 px-6 max-w-7xl mx-auto w-full">

                <div className="flex flex-col items-center justify-center text-center mb-15">
                    <span className="text-[#6366F1] text-xl md:text-2xl font-semibold mb-2">Nossa História</span>
                    <h2 className="text-[#111827] text-4xl md:text-5xl font-bold tracking-tight">Tecnologia com Rigor Acadêmico</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl overflow-hidden shadow-xl mb-15">
                    <img
                        className="w-full md:w-1/2 h-64 md:h-100 object-cover"
                        src={getImageUrl('ufcg.jpg',
                            'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073667/ufcg_q1xzkt.jpg')}
                        alt="Foto da UFCG"
                    />

                    <div className="flex flex-col gap-5 p-8 md:p-12 md:w-1/2 mb-15">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#111827]">Origem nos Corredores da UFCG</h3>
                        <p className="text-gray-600 text-justify leading-relaxed">
                            A COMPIA nasceu do desejo de conectar a excelência da pesquisa produzida
                            na Universidade Federal de Campina Grande com o mercado de tecnologia global.
                            Nossa missão é transformar teses complexas em guias práticos e acessíveis.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 mb-15">
                    <InformationCardIcon
                        icon={<Target size={32} className="text-[#6366F1]" />}
                        title="Missão"
                        description="Transformar conhecimento acadêmico de ponta em material acessível para profissionais do mercado."
                    />
                    <InformationCardIcon
                        icon={<Eye size={32} className="text-[#6366F1]" />}
                        title="Visão"
                        description="Ser a editora referência em Inteligência Artificial e Tecnologia em todo o país."
                    />
                    <InformationCardIcon
                        icon={<Gem size={32} className="text-[#6366F1]" />}
                        title="Valores"
                        description="Rigor científico, inovação contínua, acessibilidade educacional e valorização da pesquisa."
                    />
                </div>

                <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mt-8">
                    <h3 className="text-2xl font-bold text-[#111827] mb-8 text-center">Tecnologias e Infraestrutura</h3>

                    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center shadow-inner border border-gray-200 overflow-hidden p-4">
                                <img src={getImageUrl('railway.png',
                                    'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073990/railway_h9eygp.png')}
                                     alt="Logo Railway" className="w-full h-full object-contain"
                                     loading="lazy"
                                />
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-gray-900 block">Railway</span>
                                <span className="text-sm text-gray-500">Host: Front, Back e Banco</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center shadow-inner border border-gray-200 overflow-hidden p-4">
                                <img src={getImageUrl('java.png',
                                    'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073989/java_defgnj.png')}
                                     alt="Logo Java" className="w-full h-full object-contain"
                                     loading="lazy"
                                />
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-gray-900 block">Java</span>
                                <span className="text-sm text-gray-500">Desenvolvimento Backend</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center shadow-inner border border-gray-200 overflow-hidden p-4">
                                <img src={getImageUrl("react.png",
                                    'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073990/react_hyvmja.png')}
                                     alt="Logo React" className="w-full h-full object-contain"
                                     loading="lazy"
                                />
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-gray-900 block">React</span>
                                <span className="text-sm text-gray-500">Desenvolvimento Frontend</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center shadow-inner border border-gray-200 overflow-hidden p-4">
                                <img src={getImageUrl("cloudinary.png",
                                    'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073247/samples/cloudinary-icon.png')}
                                     alt="Logo Cloudinary" className="w-full h-full object-contain"
                                     loading="lazy"
                                />
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-gray-900 block">Cloudinary</span>
                                <span className="text-sm text-gray-500">CDN de Imagens</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-12 mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-12">Nossa Equipe</h3>

                    <div className="flex flex-col md:flex-row gap-16 md:gap-32 justify-center">

                        <div className="flex flex-col items-center gap-4 text-center max-w-62.5">
                            <a href="https://github.com/EvertonRomualdo" target="_blank" rel="noopener noreferrer" className="w-50 h-50 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 block hover:scale-105 transition-transform duration-300">
                                <img src={getImageUrl('everton.jpeg',
                                    'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073989/everton_nuwjl6.jpg')}
                                     alt="Foto de Everton" className="w-full h-full object-cover object-center"
                                     loading="lazy"
                                />
                            </a>

                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-bold text-gray-900">Everton Daniel</h4>

                                <a
                                    href="https://github.com/EvertonRomualdo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition-colors"
                                >
                                    <img src={getImageUrl('github.png',
                                        'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073989/github_xchjli.png')}
                                         alt="GitHub Logo" className="w-5 h-5 object-contain"
                                         loading="lazy"
                                    />
                                    <span className="font-medium text-sm text-gray-700">@EvertonRomualdo</span>
                                </a>

                                <span className="text-sm text-[#6366F1] font-semibold mt-3 block">DEV Front/Infra</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 text-center max-w-62.5">
                            {/*TODO add erick photo and loading = lazy*/}
                            <a href="https://github.com/erikdionisio" target="_blank" rel="noopener noreferrer" className="w-50 h-50 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 block hover:scale-105 transition-transform duration-300">
                                <img src="" alt="Foto do Colaborador 2" className="w-full h-full object-cover object-center" />

                            </a>

                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-bold text-gray-900">Erick Dionisio</h4>

                                <a
                                    href="https://github.com/erikdionisio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition-colors"
                                >
                                    <img src={getImageUrl('github.png',
                                        'https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073989/github_xchjli.png')}
                                         alt="GitHub Logo" className="w-5 h-5 object-contain"
                                         loading="lazy"
                                    />
                                    <span className="font-medium text-sm text-gray-700">@erikdionisio</span>
                                </a>

                                <span className="text-sm text-[#6366F1] font-semibold mt-3 block">DEV Front/Test</span>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default AboutPage;