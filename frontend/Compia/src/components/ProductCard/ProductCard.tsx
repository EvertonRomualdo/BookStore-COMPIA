import { ShoppingCart } from 'lucide-react';
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";


export interface Tag {
  label: string;
  colorClass: string;
}


export interface ProductCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    oldPrice?: number;
    isNew?: boolean;
    tags?: Tag[];
  };
  loading?: 'eager' | 'lazy';
}

export function ProductCard({ book, loading = 'lazy' }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(book);       
    setIsAdded(true);      
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300">
      
      {/* Book Cover */}
      <div className="bg-[#F3F4F6] rounded-xl relative p-6 flex justify-center items-center h-56">
        {book.isNew && (
          <span className="absolute top-3 right-3 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
            Novo
          </span>
        )}
        
        <img 
          src={book.imageUrl} 
          alt={`Capa do livro ${book.title}`}
          loading={loading}
          className="w-32 h-44 object-cover shadow-md rounded-r-md border-l-4 border-black/20 transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-wider mt-1">
        {book.tags?.map((tag, index) => (
          <span key={index} className={`px-2 py-1 rounded ${tag.colorClass}`}>
            {tag.label}
          </span>
        ))}
      </div>

      {/* Book Info */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 leading-tight text-lg mb-1">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </div>

      {/* Price and Button */}
      <div className="mt-auto flex justify-between items-end pt-2">
        <div className="flex flex-col">
          {book.oldPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">
                {/* Formatação apenas visual */}
                R$ {book.oldPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
          <span className="text-xl font-bold text-[#6366F1]">
              {/* Formatação apenas visual */}
              R$ {book.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className={`${isAdded ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} p-3 rounded-full transition-colors`}
          title={isAdded ? "Adicionado!" : "Adicionar ao carrinho"}
        >
          <ShoppingCart size={20} />
        </button>
      </div>
      
    </div>
  );
}

export default ProductCard;