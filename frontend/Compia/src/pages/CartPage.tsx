import { useContext } from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function CartPage() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const calculateTotal = () => {
        let total = 0.0;
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].price * cartItems[i].quantity;
        }
        return total;
    };

    const finalTotal = calculateTotal();

    return (
        <>
            <Header/>
            <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col items-center py-10'>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Meu Carrinho</h1>
                
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md px-4">
                    
                    <div className="flex flex-col gap-4 mb-6 border-b pb-6">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 my-10">Seu carrinho está vazio.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 p-4 rounded shadow-sm">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <img src={item.imageUrl} alt={item.title} className="w-16 h-24 object-cover rounded" />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                            <p className="text-gray-500">Quantidade: {item.quantity}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                                        <div className="text-xl font-bold text-green-600 mb-2">
                                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                                        >
                                            Remover item
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    <div className="flex justify-between items-center text-2xl font-bold text-gray-800 mb-8">
                        <span>Total:</span>
                        <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <Link 
                            to="/produtos" 
                            className="text-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-colors"
                        >
                            Continuar Comprando
                        </Link>
                        <button 
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
                            disabled={cartItems.length === 0}
                        >
                            Finalizar Compra
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CartPage;