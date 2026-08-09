import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, MapPin, QrCode, Truck, Download } from "lucide-react";
import Header from "../components/Header/Header";
import { CartContext } from "../contexts/CartContext";
import { OrderCard } from "../components/OrderCard/OrderCard";

// Importando os serviços de storage
import { getItem, setItem, STORAGE_KEYS } from "../service/storage";

export function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    
    const [cep, setCep] = useState("");
    const [cepError, setCepError] = useState(false);
    const [address, setAddress] = useState<{ logradouro: string, localidade: string, uf: string } | null>(null);
    const [shippingCost, setShippingCost] = useState<number>(0.0);
    const [isLoadingCep, setIsLoadingCep] = useState(false);
    
    const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [generatedOrderId, setGeneratedOrderId] = useState("");

   
    const isDigitalOnly = cartItems.length > 0 && cartItems.every((item: any) => 
        item.tags?.some((tag: any) => tag.label === "E-BOOK" || tag.label === "PDF")
    );

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            navigate("/catalog");
        }
        if (isDigitalOnly) {
            setShippingCost(0.0);
        }
    }, [cartItems, navigate, isSuccess, isDigitalOnly]);

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
        const baseRates: Record<string, number> = {
            'PB': 12.45892, 'PE': 18.23411, 'RN': 19.89234, 
            'CE': 22.10982, 'SP': 35.78912, 'RJ': 38.45129,
        };
        const baseCost = baseRates[uf] || 45.98123;
        const numericCep = parseFloat(cepString);
        const variation = (numericCep % 999) / 67.123456789; 
        
        setShippingCost(baseCost + variation);
    };

    const handleCheckout = () => {
        if (!isDigitalOnly && !address) {
            alert("Por favor, calcule o frete antes de finalizar.");
            return;
        }

        setIsProcessing(true);
        setTimeout(() => {
            const orderId = Math.floor(Math.random() * 1000000).toString();
            setGeneratedOrderId(orderId);
            
            const newOrder = {
                id: orderId,
                title: isDigitalOnly ? "E-book(s) - Compia" : "Compra de Livros - Compia",
                date: new Date().toLocaleDateString('pt-BR'),
                total: total,
                isDigitalOnly: isDigitalOnly
            };
            
            const existingOrders = getItem<any[]>(STORAGE_KEYS.ORDERS) || [];
            setItem(STORAGE_KEYS.ORDERS, [newOrder, ...existingOrders]);

            setIsProcessing(false);
            setIsSuccess(true);
            clearCart(); 
        }, 2500);
    };


    const downloadEbook = () => {
        const element = document.createElement("a");
        const file = new Blob(["Lorem ipsum dolor sit amet."], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "ebook-compia.txt";
        document.body.appendChild(element); 
        element.click();
        document.body.removeChild(element);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#F9FAFB]">
                <Header />
                <div className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center">
                    <CheckCircle2 size={80} className="text-green-500 mb-6" />
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Pagamento Aprovado!</h1>
                    <p className="text-gray-500 mb-10">
                        {isDigitalOnly ? "Seu material digital já está disponível." : "Obrigado por comprar conosco. Seu pedido já está sendo preparado."}
                    </p>
                    
                    <div className="w-full">
                        <OrderCard 
                            orderNumber={generatedOrderId}
                            title={isDigitalOnly ? "E-book(s) - Compia" : "Compra de Livros - Compia"}
                            date={new Date().toLocaleDateString('pt-BR')}
                            icon={isDigitalOnly ? <Download size={28} /> : <Truck size={28} />}
                            iconBgColor="bg-purple-100"
                            iconTextColor="text-purple-600"
                            statusText={isDigitalOnly ? "Disponível" : "Preparando Envio"}
                            statusBgColor={isDigitalOnly ? "bg-green-100" : "bg-yellow-100"}
                            statusTextColor={isDigitalOnly ? "text-green-700" : "text-yellow-700"}
                            price={`R$ ${total.toFixed(2).replace('.', ',')}`}
                            actionButton={isDigitalOnly ? {
                                label: "Baixar E-book",
                                onClick: downloadEbook
                            } : {
                                label: "Voltar à Loja",
                                onClick: () => navigate("/catalog")
                            }}
                        />
                    </div>
                    
                    {/* Botão extra para ir para o painel de pedidos caso seja e-book */}
                    {isDigitalOnly && (
                        <button onClick={() => navigate("/account")} className="mt-6 text-[#5A46F3] font-semibold hover:underline">
                            Ver todos os meus pedidos
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
                
                <div className="lg:w-2/3 flex flex-col gap-6">
                    
                    {/* 3. CONDICIONAL DO FRETE: Oculta se for apenas digital */}
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
                                        className={`border rounded-lg px-4 py-3 flex-1 outline-none transition-all ${
                                            cepError 
                                            ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-600' 
                                            : 'border-gray-300 focus:border-purple-500'
                                        }`}
                                        value={cep}
                                        onChange={(e) => {
                                            setCep(e.target.value);
                                            if (cepError) setCepError(false);
                                        }}
                                        maxLength={9}
                                    />
                                    <button 
                                        onClick={handleCepSearch}
                                        disabled={isLoadingCep || cep.length < 8}
                                        className="bg-[#1E1B4B] hover:bg-[#3f3899] text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        {isLoadingCep ? "Calculando..." : "Calcular Frete"}
                                    </button>
                                </div>
                                
                                {cepError && (
                                    <span className="text-red-500 text-sm font-semibold ml-1">
                                        Digite um CEP válido.
                                    </span>
                                )}
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
                            <CreditCard className="text-purple-600"/> Método de Pagamento
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setPaymentMethod("pix")}
                                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                                    paymentMethod === "pix" 
                                    ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm" 
                                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}>
                                <QrCode size={24} />
                                <span className="font-semibold">PIX</span>
                            </button>
                            <button 
                                onClick={() => setPaymentMethod("card")}
                                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                                    paymentMethod === "card" 
                                    ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm" 
                                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}>
                                <CreditCard size={24} />
                                <span className="font-semibold">Cartão de Crédito</span>
                            </button>
                        </div>
                    </div>

                </div>

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
                            onClick={handleCheckout}
                            disabled={(!isDigitalOnly && !address) || isProcessing}
                            className="w-full py-4 bg-[#1E1B4B] hover:bg-[#3f3899] disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-xl transition-all shadow-md flex justify-center items-center"
                        >
                            {isProcessing ? "Processando Pagamento..." : "Finalizar Compra"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}