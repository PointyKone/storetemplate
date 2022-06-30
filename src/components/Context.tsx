import { createContext, FC, useContext, useMemo, useState } from "react";

type cartProviderProps = {
  children: React.ReactNode;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Cart = Product[];

export const initialValues = {
  cart: [{}] as Cart,
  addToCart: (product: Product) => {},
  removeFromCart: (product: Product) => {},
  clearCart: () => {},
  isOpen: false,
dropdownOpen: false,
toggle: () => {},
toggleDropdown: () => {},
    
};

const Context = createContext(initialValues);

export const Provider: FC<cartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>([]);

  const addToCart = (product: Product) => {
    const newCart = [...cart];
    const productIndex = newCart.findIndex((p) => p.id === product.id);

    if (cart[productIndex]) {
      newCart.filter((p) => p.id === product.id)[0].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (product: Product) => {
    const newCart = [...cart];
    const index = newCart.indexOf(product);
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    } else {
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const [isOpen, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => {
        setOpen(!(isOpen));
    }

    const toggleDropdown = () => {
        setDropdownOpen(!(dropdownOpen));
    }

  return (
    <Context.Provider value={{ cart, addToCart, removeFromCart, clearCart, isOpen, dropdownOpen, toggle, toggleDropdown }}>
      {children}
    </Context.Provider>
  );
};

export const useCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(Context);
  return { cart, addToCart, removeFromCart, clearCart };
};

export const useNavbar = () => {
    const { isOpen, dropdownOpen, toggle, toggleDropdown } = useContext(Context);
    return { isOpen, dropdownOpen, toggle, toggleDropdown };
}
