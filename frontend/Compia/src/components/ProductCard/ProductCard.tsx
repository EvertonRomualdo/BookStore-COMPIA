import { ShoppingCart } from 'lucide-react';

export interface Tag {
  label: string;
  colorClass: string;
}

export interface ProductCardProps {
  title: string;
  author: string;
  imageUrl: string;
  loading: 'eager' | 'lazy';
  price: string;
  oldPrice?: string;
  isNew?: boolean;
  tags: Tag[];
}

export function ProductCard({
  title,
  author,
  imageUrl,
  loading,
  price,
  oldPrice,
  isNew,
  tags,
}: ProductCardProps) {
  return (
    //container
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300">
      
      {/* Book Cover*/}
      <div className="bg-[#F3F4F6] rounded-xl relative p-6 flex justify-center items-center h-56">
        {isNew && (
          <span className="absolute top-3 right-3 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
            Novo
          </span>
        )}
        
        {/* BookImage*/}
        <img 
          src={imageUrl} 
          alt={`Capa do livro ${title}`}
          loading={loading}
          className="w-32 h-44 object-cover shadow-md rounded-r-md border-l-4 border-black/20 transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-wider mt-1">
        {tags.map((tag, index) => (
          <span key={index} className={`px-2 py-1 rounded ${tag.colorClass}`}>
            {tag.label}
          </span>
        ))}
      </div>

      {/* Book Info*/}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 leading-tight text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>
      </div>

      {/* Price and Button*/}
      <div className="mt-auto flex justify-between items-end pt-2">
        <div className="flex flex-col">
          {oldPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">{oldPrice}</span>
          )}
          <span className="text-xl font-bold text-[#6366F1]">{price}</span>
        </div>
        
        <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 text-gray-700 transition-colors">
          <ShoppingCart size={20} />
        </button>
      </div>
      
    </div>
  );
}

export default ProductCard;