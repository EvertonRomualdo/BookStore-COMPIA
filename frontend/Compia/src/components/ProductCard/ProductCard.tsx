import { useContext, useState } from "react";
import { CartContext,type Book } from "../../contexts/CartContext";

interface ProductCardProps {
    book: Book;
}

function ProductCard({ book }: ProductCardProps) {
    const { addToCart } = useContext(CartContext);
    
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(book);       
        setIsAdded(true);      
        
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
            <img src={book.imageUrl} alt={book.title} className="w-32 h-48 object-cover mb-4 rounded shadow-md" />
            <h2 className="text-lg font-semibold text-center text-gray-800">{book.title}</h2>
            
            <span className="text-xl font-bold text-green-600 mb-4">
                R$ {book.price.toFixed(2).replace('.', ',')}
            </span>
            
            <button 
                onClick={handleAddToCart}
                className={`w-full font-semibold py-2 rounded transition-colors text-white ${
                    isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isAdded ? "Adicionado!" : "Adicionar ao Carrinho"}
            </button>
        </div>
    )
}

export default ProductCard;