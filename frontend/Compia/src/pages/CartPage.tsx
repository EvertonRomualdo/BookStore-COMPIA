import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { CartContext } from "../contexts/CartContext";

export function CartPage() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useContext(CartContext);

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0.0);

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
                <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">Meu Carrinho</h1>

                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10 flex flex-col items-center">
                            <p className="text-gray-500 mb-6 text-lg">Seu carrinho está vazio.</p>
                            <button
                                onClick={() => navigate('/catalog')}
                                className="px-8 py-3 bg-[#1E1B4B] text-white font-semibold rounded-lg hover:bg-[#3f3899] transition-colors shadow-sm"
                            >
                                Explorar Livros
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-4 border border-gray-200 rounded-lg p-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-16 h-24 object-cover rounded shadow-sm border border-gray-100"
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.title}</h3>
                                        
                                        <div className="flex flex-wrap gap-2 my-1.5">
                                            {item.tags?.map((tag: any, index: number) => (
                                                <span 
                                                    key={index} 
                                                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${tag.colorClass}`}
                                                >
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <span className="text-gray-500 text-sm mt-1">Quantidade: {item.quantity}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <span className="font-bold text-green-600 text-xl">
                                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                        >
                                            Remover item
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <>
                            <hr className="border-gray-800 border-t-2 my-2" />
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-slate-800">Total:</h2>
                                <span className="text-2xl font-bold text-slate-800">
                                    R$ {total.toFixed(2).replace('.', ',')}
                                </span>
                            </div>

                            <div className="flex justify-end gap-4 mt-2 flex-col sm:flex-row">
                                <button
                                    onClick={() => navigate('/catalog')}
                                    className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto"
                                >
                                    Continuar Comprando
                                </button>
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="px-8 py-3 bg-[#5A46F3] text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md w-full sm:w-auto"
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default CartPage;