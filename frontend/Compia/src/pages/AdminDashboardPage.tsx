import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, PlusCircle, CheckCircle2, Loader2, Trash2, BookOpen, LogOut, Brain } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { cloudinaryService } from "../service/cloudinaryService";
import { getItem, setItem, STORAGE_KEYS } from "../service/storage";
import { initialBooks } from "../service/books";

export function AdminDashboardPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [catalog, setCatalog] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [oldPrice, setOldPrice] = useState("");
    const [description, setDescription] = useState("");
    const [pages, setPages] = useState("");
    const [language, setLanguage] = useState("Português");
    const [year, setYear] = useState("");
    const [category, setCategory] = useState("IA");
    const [format, setFormat] = useState("FÍSICO");

    useEffect(() => {
        const storedBooks = getItem<any[]>(STORAGE_KEYS.BOOKS) || initialBooks;
        setCatalog(storedBooks);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const getCategoryTag = (cat: string) => {
        switch (cat) {
            case "IA": return { label: "IA", colorClass: "bg-purple-100 text-purple-700" };
            case "ARQUITETURA": return { label: "ARQUITETURA", colorClass: "bg-indigo-100 text-indigo-700" };
            case "SEGURANÇA": return { label: "SEGURANÇA", colorClass: "bg-red-100 text-red-700" };
            case "BLOCKCHAIN": return { label: "BLOCKCHAIN", colorClass: "bg-yellow-100 text-yellow-700" };
            default: return { label: cat, colorClass: "bg-gray-100 text-gray-700" };
        }
    };

    const getFormatTag = (fmt: string) => {
        return fmt === "FÍSICO" 
            ? { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }
            : { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" };
    };

    // --- FUNÇÃO DE ADICIONAR ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!imageFile) {
            alert("Por favor, selecione uma imagem de capa.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const imageUrl = await cloudinaryService.uploadImage(imageFile);

            const newBook = {
                id: Date.now(),
                title, author,
                price: parseFloat(price),
                oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
                isNew: true,
                tags: [getCategoryTag(category), getFormatTag(format)],
                imageUrl: imageUrl,
                description,
                pages: parseInt(pages),
                language,
                year: parseInt(year)
            };

            const updatedCatalog = [newBook, ...catalog]; 
            setItem(STORAGE_KEYS.BOOKS, updatedCatalog);
            setCatalog(updatedCatalog); 

            setSuccessMsg(true);
            setTimeout(() => setSuccessMsg(false), 4000);
            
            setTitle(""); setAuthor(""); setPrice(""); setOldPrice(""); setDescription("");
            setPages(""); setYear(""); setImageFile(null);
            
        } catch (error) {
            alert("Erro ao cadastrar o livro. Verifique sua conexão com o Cloudinary.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- FUNÇÃO DE EXCLUIR ---
    const handleDeleteBook = (id: number, title: string) => {
        const isConfirmed = window.confirm(`Tem certeza que deseja excluir o livro "${title}" do catálogo?`);
        
        if (isConfirmed) {
            const updatedCatalog = catalog.filter(book => book.id !== id);
            setItem(STORAGE_KEYS.BOOKS, updatedCatalog);
            setCatalog(updatedCatalog);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
            
            {/* --- CABEÇALHO RESTRITO DO ADMIN --- */}
            <header className="bg-[#1E1B4B] py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    
                    <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl flex items-center justify-center text-white shadow-sm">
                        <Brain size={24} />
                    </div>
                    
                    <div className="flex items-center hidden sm:flex">
                        <span className="text-white font-extrabold text-2xl tracking-wide uppercase">
                            COMPIA
                        </span>
                        <span className="text-purple-400 font-medium text-lg border-l border-white/20 pl-3 ml-3">
                            Painel Admin
                        </span>
                    </div>

                </div>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white/10 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl transition-all font-semibold text-sm shadow-sm"
                >
                    <LogOut size={18} /> Sair do Sistema
                </button>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
                
                {/* --- SEÇÃO 1: CADASTRO DE LIVROS --- */}
                <section>
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">Gestão de Catálogo</h1>
                        <p className="text-gray-500 mt-2">Cadastre novas obras e gerencie os produtos da Editora Compia.</p>
                    </div>

                    {successMsg && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
                            <CheckCircle2 size={24} />
                            <strong>Sucesso!</strong> O livro foi adicionado ao catálogo e já está disponível na loja.
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Título da Obra *</label>
                                    <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Autor *</label>
                                    <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Preço Atual (R$) *</label>
                                    <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex: 150.00" className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Preço Antigo (R$)</label>
                                    <input type="number" step="0.01" value={oldPrice} onChange={e => setOldPrice(e.target.value)} placeholder="Deixe vazio se não houver desconto" className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Área do Conhecimento *</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600 bg-white">
                                        <option value="IA">Inteligência Artificial</option>
                                        <option value="ARQUITETURA">Arquitetura de Software</option>
                                        <option value="SEGURANÇA">Cibersegurança</option>
                                        <option value="BLOCKCHAIN">Blockchain</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Formato *</label>
                                    <select value={format} onChange={e => setFormat(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600 bg-white">
                                        <option value="FÍSICO">Físico</option>
                                        <option value="E-BOOK">E-book (Digital)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Nº de Páginas *</label>
                                    <input required type="number" value={pages} onChange={e => setPages(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Ano *</label>
                                    <input required type="number" value={year} onChange={e => setYear(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase">Idioma *</label>
                                    <input required type="text" value={language} onChange={e => setLanguage(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 uppercase">Sinopse da Obra *</label>
                                <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-600 resize-none"></textarea>
                            </div>

                            <div className="flex flex-col gap-2 border-2 border-dashed border-gray-300 rounded-xl p-6 items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                                <UploadCloud size={40} className="text-purple-500 mb-2" />
                                <label className="text-sm font-bold text-gray-700 uppercase cursor-pointer text-center">
                                    {imageFile ? imageFile.name : "Clique para enviar a Capa do Livro"}
                                    <input required type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-4 bg-[#1E1B4B] hover:bg-[#3f3899] disabled:bg-gray-400 text-white font-bold rounded-xl transition-all shadow-md flex justify-center items-center gap-2 mt-2"
                            >
                                {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processando Upload...</> : <><PlusCircle size={20} /> Cadastrar Livro</>}
                            </button>

                        </form>
                    </div>
                </section>

                {/* --- SEÇÃO 2: GESTÃO DO CATÁLOGO (LISTAR E EXCLUIR) --- */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen size={28} className="text-purple-600" />
                        <h2 className="text-2xl font-extrabold text-gray-900">Catálogo Atual ({catalog.length})</h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {catalog.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">Nenhum livro cadastrado no sistema.</div>
                        ) : (
                            <div className="flex flex-col divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                                {catalog.map((book) => (
                                    <div key={book.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                                        
                                        <div className="w-16 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden border border-gray-200 flex items-center justify-center">
                                            <img src={book.imageUrl} alt={book.title} className="max-w-full max-h-full object-cover" />
                                        </div>
                                        
                                        <div className="flex-1 flex flex-col text-center sm:text-left">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{book.title}</h3>
                                            <span className="text-sm text-gray-500">{book.author}</span>
                                            
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-1 mt-2">
                                                {book.tags?.map((tag: any, idx: number) => (
                                                    <span key={idx} className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${tag.colorClass}`}>
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                                            <span className="font-extrabold text-purple-700 text-lg">
                                                R$ {book.price.toFixed(2).replace('.', ',')}
                                            </span>
                                            <button 
                                                onClick={() => handleDeleteBook(book.id, book.title)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors text-sm w-full justify-center sm:w-auto"
                                            >
                                                <Trash2 size={16} /> Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboardPage;