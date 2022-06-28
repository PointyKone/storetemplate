import { createContext, FC, useContext, useState } from "react";

type navbarProviderProps = {
    children: React.ReactNode
}

export const initialNavbarContext = {
    pages: [] as typeof navigation,
    dropdownLinks: [] as typeof dropdown,
    isOpen: false,
    dropdownOpen: false,
    toggle: () => {},
    toggleDropdown: () => {},
    
}

const navigation = [
    { name: "Men", href: "/", current: false },
    { name: "Women", href: "/", current: false },
    { name: "Kids", href: "/", current: false },
]

const dropdown = [
    { name: "Your Profile", href: "/", current: false },
    { name: "Settings", href: "/", current: false },
    { name: "Sign Out", href: "/", current: false },
    { name: "Sign In", href: "/login", current: false }
]

const navbarContext = createContext(initialNavbarContext);

export const NavbarProvider: FC<navbarProviderProps> = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const pages = navigation;
    const dropdownLinks = dropdown;

    const toggle = () => {
        setOpen(!(isOpen));
    }

    const toggleDropdown = () => {
        setDropdownOpen(!(dropdownOpen));
    }

    return (
        <navbarContext.Provider value={{ pages, dropdownLinks, isOpen, dropdownOpen, toggle, toggleDropdown }}>
            {children}
        </navbarContext.Provider>
    );
}

export const useNavbarContext = () => {
    const context = useContext(navbarContext);
    return context;
}