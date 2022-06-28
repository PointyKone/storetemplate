import { NextPageContext } from "next";
import { createContext, FC, useContext, useMemo, useState } from "react";

type cartProviderProps = {
    children: React.ReactNode
}

export type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export type Cart = Product[];

export const initialCartValues = {
    cart: [{}] as Cart, 
    addToCart: (product: Product) => {},
    removeFromCart: (product: Product) => {},
    clearCart: () => {}
}


const cartContext = createContext(initialCartValues);

export const CartProvider: FC<cartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart>([]);

    const addToCart = (product: Product) => {

        const newCart = [...cart];
        const productIndex = newCart.findIndex(p => p.id === product.id);

        if (cart[productIndex]) {
            newCart.filter(p => p.id === product.id)[0].quantity += 1;
            setCart(newCart)
        } else {  
            setCart([...cart, product])
        }
    }

    const removeFromCart = (product: Product) => {
        const newCart = [...cart];
        const index = newCart.indexOf(product);
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart)
        } else {
            newCart.splice(index, 1);
            setCart(newCart)
        }
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <cartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
          {children}
        </cartContext.Provider>
      );
}

export const useCart = () => {
    const cart = useContext(cartContext);
    return cart;
}