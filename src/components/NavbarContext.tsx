import { createContext, FC, useContext, useState } from "react";

type navbarProviderProps = {
    children: React.ReactNode
}

export const initialNavbarContext = {
    isOpen: false,
    dropdownOpen: false,
    toggle: () => {},
    toggleDropdown: () => {},
    
}


const navbarContext = createContext(initialNavbarContext);

export const NavbarProvider: FC<navbarProviderProps> = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => {
        setOpen(!(isOpen));
    }

    const toggleDropdown = () => {
        setDropdownOpen(!(dropdownOpen));
    }

    return (
        <navbarContext.Provider value={{ isOpen, dropdownOpen, toggle, toggleDropdown }}>
            {children}
        </navbarContext.Provider>
    );
}

export const useNavbarContext = () => {
    const context = useContext(navbarContext);
    return context;
}