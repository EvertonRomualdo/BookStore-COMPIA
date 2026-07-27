import { createContext, useState, type ReactNode } from "react";

export interface Book {
    id: number;
    title: string;
    author: string;
    price: number; 
    imageUrl: string;
}

export interface CartItem extends Book {
    quantity: number;
}

interface CartContextData {
    cartItems: CartItem[];
    addToCart: (book: Book) => void;
    removeFromCart: (id: number) => void; 
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    function addToCart(book: Book) {
        const itemExists = cartItems.find(item => item.id === book.id);
        
        if (itemExists) {
            setCartItems(
                cartItems.map(item => 
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...book, quantity: 1 }]);
        }
    }

    function removeFromCart(id: number) {
        setCartItems(cartItems.filter(item => item.id !== id));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}