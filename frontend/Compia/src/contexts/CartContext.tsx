import { createContext, useState, useEffect, type ReactNode } from "react";
import { getItem, setItem, STORAGE_KEYS } from "../service/storage";
import { useAuth } from "./AuthContext";

export interface CartItem {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
    tags?: any[];
}

interface CartContextData {
    cartItems: CartItem[];
    addToCart: (book: any) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const getCartKey = () => user ? `${STORAGE_KEYS.CART}_${user.email}` : STORAGE_KEYS.CART;

    useEffect(() => {
        const guestCart = getItem<CartItem[]>(STORAGE_KEYS.CART) || [];
        
        if (user) {
            const userCartKey = `${STORAGE_KEYS.CART}_${user.email}`;
            const userCart = getItem<CartItem[]>(userCartKey) || [];
            
            if (guestCart.length > 0) {
                const mergedCart = [...userCart];
                guestCart.forEach(guestItem => {
                    const existingItem = mergedCart.find(item => item.id === guestItem.id);
                    if (existingItem) {
                        existingItem.quantity += guestItem.quantity;
                    } else {
                        mergedCart.push(guestItem);
                    }
                });
                
                setCartItems(mergedCart);
                setItem(userCartKey, mergedCart);
                setItem(STORAGE_KEYS.CART, []);
            } else {
                setCartItems(userCart);
            }
        } else {
            setCartItems(guestCart);
        }
    }, [user]);

    const saveCart = (newCart: CartItem[]) => {
        setCartItems(newCart);
        setItem(getCartKey(), newCart);
    };

    function addToCart(book: any) {
        const existingItem = cartItems.find(item => item.id === book.id);
        if (existingItem) {
            const updatedCart = cartItems.map(item => 
                item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCart(updatedCart);
        } else {
            saveCart([...cartItems, { ...book, quantity: 1 }]);
        }
    }

    function removeFromCart(id: number) {
        saveCart(cartItems.filter(item => item.id !== id));
    }

    function clearCart() {
        saveCart([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}