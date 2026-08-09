import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, MapPin, QrCode, Truck, Download, Copy, X, Loader2 } from "lucide-react";
import Header from "../components/Header/Header";
import { CartContext } from "../contexts/CartContext";
import { OrderCard } from "../components/OrderCard/OrderCard";
import { downloadEbook } from "../helpers/fileHelper";
import { useAuth } from "../contexts/AuthContext";
import { getItem, setItem, STORAGE_KEYS } from "../service/storage";

export function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useAuth();
    
    const [cep, setCep] = useState("");
    const [cepError, setCepError] = useState(false);
    const [address, setAddress] = useState<{ logradouro: string, localidade: string, uf: string } | null>(null);
    const [shippingCost, setShippingCost] = useState<number>(0.0);
    const [isLoadingCep, setIsLoadingCep] = useState(false);
    
    const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
    
    // Novos Estados para o Modal de Pagamento
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [completedOrder, setCompletedOrder] = useState<any>(null);

    const isDigitalOnly = cartItems.length > 0 && cartItems.every((item: any) => 
        item.tags?.some((tag: any) => tag.label === "E-BOOK" || tag.label === "PDF")
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return; 
        }
        if (cartItems.length === 0 && !isSuccess) {
            navigate("/catalog");
        }
        if (isDigitalOnly) {
            setShippingCost(0.0);
        }
    }, [user, cartItems, navigate, isSuccess, isDigitalOnly]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0.0);
    const total = subtotal + shippingCost;

    const handleCepSearch = async () => {
        const currentCep = cep.replace(/\D/g, '');
        if (currentCep.length !== 8) {
            setCepError(true);
            setAddress(null);
            if (!isDigitalOnly) setShippingCost(0.0);
            return;
        }
        setCepError(false);
        setIsLoadingCep(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${currentCep}/json/`);
            const data = await response.json();
            if (data.erro) {
                setCepError(true);
                setAddress(null);
                if (!isDigitalOnly) setShippingCost(0.0);
            } else {
                setAddress({ logradouro: data.logradouro, localidade: data.localidade, uf: data.uf });
                if (!isDigitalOnly) calculateShipping(data.uf, currentCep);
            }
        } catch (error) {
            console.error("Erro ao buscar CEP", error);
            setCepError(true);
            setAddress(null);
        } finally {
            setIsLoadingCep(false);
        }
    };

    const calculateShipping = (uf: string, cepString: string) => {
        const baseRates: Record<string, number> = { 'PB': 12.45892, 'PE': 18.23411, 'RN': 19.89234, 'CE': 22.10982, 'SP': 35.78912, 'RJ': 38.45129 };
        const baseCost = baseRates[uf] || 45.98123;
        const numericCep = parseFloat(cepString);
        const variation = (numericCep % 999) / 67.123456789; 
        setShippingCost(baseCost + variation);
    };

    // Abre o modal ao invés de finalizar direto
    const handleOpenPayment = () => {
        if (!isDigitalOnly && !address) {
            alert("Por favor, calcule o frete antes de prosseguir.");
            return;
        }
        setShowPaymentModal(true);
    };

    // Função real que processa a aprovação do pagamento
    const confirmPaymentAndCreateOrder = () => {
        setIsProcessing(true);
        
        // Simulando o tempo de comunicação com o Gateway de Pagamento (ex: Mercado Pago)
        setTimeout(() => {
            const orderId = Math.floor(Math.random() * 1000000).toString();
            const firstItem = cartItems[0];
            const extraItemsCount = cartItems.length - 1;
            
            let orderTitle = firstItem.title;
            if (extraItemsCount > 0) {
                orderTitle += ` (e mais ${extraItemsCount} item${extraItemsCount > 1 ? 'ns' : ''})`;
            }
            
            const newOrder = {
                id: orderId,
                userEmail: user?.email,
                title: orderTitle,
                imageUrl: firstItem.imageUrl,
                date: new Date().toLocaleDateString('pt-BR'),
                total: total,
                isDigitalOnly: isDigitalOnly,
                items: cartItems.map((item: any) => ({
                    title: item.title,
                    imageUrl: item.imageUrl,
                    isDigital: item.tags?.some((tag: any) => tag.label === "E-BOOK" || tag.label === "PDF")
                }))
            };
            
            const existingOrders = getItem<any[]>(STORAGE_KEYS.ORDERS) || [];
            setItem(STORAGE_KEYS.ORDERS, [newOrder, ...existingOrders]);
            setCompletedOrder(newOrder);
            setIsProcessing(false);
            setShowPaymentModal(false);
            setIsSuccess(true);
            clearCart(); 
        }, 3000);
    };

    // --- RENDERIZAÇÃO DA TELA DE SUCESSO ---
    if (isSuccess && completedOrder) {
        return (
            <div className="min-h-screen bg-[#F9FAFB]">
                <Header />
                <div className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center">
                    <CheckCircle2 size={80} className="text-green-500 mb-6" />
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Pagamento Aprovado!</h1>
                    <p className="text-gray-500 mb-10 text-center">
                        {completedOrder.isDigitalOnly ? "Seu material digital já está disponível." : "Obrigado por comprar conosco. Seu pedido já está sendo preparado."}
                    </p>
                    
                    <div className="w-full">
                        <OrderCard 
                            orderNumber={completedOrder.id}
                            title={completedOrder.title}
                            imageUrl={completedOrder.imageUrl}
                            date={completedOrder.date}
                            icon={completedOrder.isDigitalOnly ? <Download size={28} /> : <Truck size={28} />}
                            iconBgColor="bg-purple-100"
                            iconTextColor="text-purple-600"
                            statusText={completedOrder.isDigitalOnly ? "Disponível" : "Preparando Envio"}
                            statusBgColor={completedOrder.isDigitalOnly ? "bg-green-100" : "bg-yellow-100"}
                            statusTextColor={completedOrder.isDigitalOnly ? "text-green-700" : "text-yellow-700"}
                            price={`R$ ${completedOrder.total.toFixed(2).replace('.', ',')}`}
                            actionButton={!completedOrder.isDigitalOnly ? {
                                label: "Voltar à Loja",
                                onClick: () => navigate("/catalog")
                            } : undefined}
                            items={completedOrder.items}
                            onDownloadItem={(bookTitle) => downloadEbook(bookTitle)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] relative">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
                
                {/* --- COLUNA ESQUERDA: FRETE E MÉTODO --- */}
                <div className="lg:w-2/3 flex flex-col gap-6">
                    {!isDigitalOnly ? (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MapPin className="text-purple-600"/> Endereço de Entrega
                            </h2>
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Digite seu CEP" 
                                        className={`border rounded-lg px-4 py-3 flex-1 outline-none transition-all ${cepError ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-600' : 'border-gray-300 focus:border-purple-500'}`}
                                        value={cep}
                                        onChange={(e) => { setCep(e.target.value); if (cepError) setCepError(false); }}
                                        maxLength={9}
                                    />
                                    <button 
                                        onClick={handleCepSearch} disabled={isLoadingCep || cep.length < 8}
                                        className="bg-[#1E1B4B] hover:bg-[#3f3899] text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        {isLoadingCep ? "Calculando..." : "Calcular Frete"}
                                    </button>
                                </div>
                                {cepError && <span className="text-red-500 text-sm font-semibold ml-1">Digite um CEP válido.</span>}
                            </div>
                            
                            {address && (
                                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mt-2 animate-in fade-in zoom-in-95">
                                    <p className="font-medium text-gray-800">{address.logradouro}</p>
                                    <p className="text-gray-600">{address.localidade} - {address.uf}</p>
                                    <p className="text-sm text-purple-700 font-bold mt-2">
                                        Frete calculado: R$ {shippingCost.toFixed(2).replace('.', ',')}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-green-50 p-6 rounded-2xl shadow-sm border border-green-200 flex items-center gap-4">
                            <Download size={32} className="text-green-600" />
                            <div>
                                <h2 className="text-lg font-bold text-green-900">Material 100% Digital</h2>
                                <p className="text-green-700 text-sm">Nenhum frete será cobrado. O link para download será liberado após o pagamento.</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CreditCard className="text-purple-600"/> Selecione o Método de Pagamento
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setPaymentMethod("pix")}
                                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === "pix" ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                                <QrCode size={24} />
                                <span className="font-semibold">PIX</span>
                            </button>
                            <button 
                                onClick={() => setPaymentMethod("card")}
                                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === "card" ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                                <CreditCard size={24} />
                                <span className="font-semibold">Cartão de Crédito</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- COLUNA DIREITA: RESUMO --- */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>
                        
                        <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 mb-6 max-h-60 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.quantity}x {item.title}</span>
                                    <span className="font-medium text-gray-800">
                                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Frete</span>
                                <span className={isDigitalOnly ? "font-bold text-green-600" : "font-medium"}>
                                    {isDigitalOnly ? "GRÁTIS" : shippingCost > 0 ? `R$ ${shippingCost.toFixed(2).replace('.', ',')}` : "Calculando..."}
                                </span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-100">
                                <span>Total</span>
                                <span className="text-purple-700">R$ {total.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleOpenPayment}
                            disabled={(!isDigitalOnly && !address)}
                            className="w-full py-4 bg-[#1E1B4B] hover:bg-[#3f3899] disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-xl transition-all shadow-md flex justify-center items-center"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MODAL DE PAGAMENTO (OVERLAY) --- */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                        
                        {/* Header do Modal */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {paymentMethod === 'pix' ? <QrCode className="text-purple-600" /> : <CreditCard className="text-purple-600" />}
                                Pagamento via {paymentMethod === 'pix' ? 'PIX' : 'Cartão'}
                            </h3>
                            <button onClick={() => !isProcessing && setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Corpo do Modal (Scrollable) */}
                        <div className="p-6 overflow-y-auto">
                            
                            <div className="text-center mb-6">
                                <span className="text-sm text-gray-500 uppercase tracking-wider font-bold">Total a pagar</span>
                                <div className="text-4xl font-extrabold text-[#6366F1]">
                                    R$ {total.toFixed(2).replace('.', ',')}
                                </div>
                            </div>

                            {/* UI DO PIX */}
                            {paymentMethod === 'pix' && (
                                <div className="flex flex-col items-center">
                                    <p className="text-sm text-gray-600 text-center mb-6">
                                        Escaneie o QR Code abaixo com o aplicativo do seu banco para concluir o pagamento.
                                    </p>
                                    
                                    {/* QR Code dinâmico da API Pública */}
                                    <div className="p-4 bg-white border-2 border-purple-100 rounded-2xl shadow-sm mb-6">
                                        <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126580014BR.GOV.BCB.PIX0136${user?.email}5204000053039865405${total.toFixed(2)}5802BR5915COMPIA EDITORA6009SAO PAULO62070503***6304FC27`} 
                                            alt="QR Code PIX" 
                                            className="w-48 h-48"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">PIX Copia e Cola</label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                readOnly 
                                                value="00020101021126580014BR.GOV.BCB.PIX..." 
                                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm text-gray-500 outline-none"
                                            />
                                            <button className="p-3 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors">
                                                <Copy size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* UI DO CARTÃO DE CRÉDITO */}
                            {paymentMethod === 'card' && (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">Número do Cartão</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-500 font-mono" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">Nome impresso no cartão</label>
                                        <input type="text" placeholder="CICLANO FULANO DA SILVA" className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-500 uppercase" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">Validade</label>
                                            <input type="text" placeholder="MM/AA" maxLength={5} className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-500 text-center" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-700 uppercase mb-1 block">CVV</label>
                                            <input type="password" placeholder="123" maxLength={4} className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:border-purple-500 text-center" />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer do Modal */}
                        <div className="p-6 border-t border-gray-100 bg-white">
                            <button 
                                onClick={confirmPaymentAndCreateOrder}
                                disabled={isProcessing}
                                className="w-full py-4 bg-[#1E1B4B] hover:bg-[#3f3899] disabled:bg-gray-400 text-white font-bold rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                            >
                                {isProcessing ? <><Loader2 className="animate-spin" size={20} /> Processando Pagamento...</> : "Confirmar Pagamento"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}