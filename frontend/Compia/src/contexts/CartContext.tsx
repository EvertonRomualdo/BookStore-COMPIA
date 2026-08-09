import { createContext, useState, useEffect, type ReactNode } from "react";

export interface Book {
    id: number;
    title: string;
    author: string;
    price: number; 
    imageUrl: string;
    oldPrice?: number;
    isNew?: boolean;
}

export interface CartItem extends Book {
    quantity: number;
}

interface CartContextData {
    cartItems: CartItem[];
    addToCart: (book: Book) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void; 
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
    
    
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('cartDB');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    
    useEffect(() => {
        localStorage.setItem('cartDB', JSON.stringify(cartItems));
    }, [cartItems]);

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

    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}