

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dark, setDark] = useState(false);

    const navLinks = [
        { name: "About Us", path: "/aboutus" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blog" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Career", path: "/career" },
    ];

    /* Load Theme on Start */
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDark(false);
        }
    }, []);

    /* Toggle Theme */
    const toggleTheme = () => {
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-300">

            {/* MAIN NAVBAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">

                {/* LOGO */}
                <NavLink to="/" end onClick={() => setIsOpen(false)}>
                    
                    <img
                        src={dark ? "/assets/logo1.png" : "/logo2.png"}
                        alt="Logo"
                        className="w-44 sm:w-44 lg:w-52 pb-4 transition-all duration-300"
                    />
                </NavLink>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center space-x-10">

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-xs font-bold uppercase tracking-widest relative group transition-all
                                ${isActive
                                    ? "text-secondary"
                                    : "text-black dark:text-white hover-text-primary"
                                }`
                            }
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500" />
                        </NavLink>
                    ))}

                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-black transition-colors duration-300"
                    >
                        {dark ? (
                            <Moon size={18} className="text-primary" />
                        ) : (
                            <Sun size={18} className="text-secondary" />
                        )}
                    </button>

                    {/* CTA BUTTON */}
                    <NavLink
                        to="/contact"
                        className="px-6 py-2 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-full hover-bg-secondary transition-all"
                    >
                        Start Project
                    </NavLink>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center bg-black/10 dark:bg-white/10 rounded-full transition-colors duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen
                        ? <X size={22} className="text-black dark:text-white" />
                        : <Menu size={22} className="text-black dark:text-white" />
                    }
                </button>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`fixed top-20 right-0 w-full h-[calc(100vh-5rem)]
                bg-white dark:bg-black
                flex flex-col justify-center items-center gap-6
                transition-all duration-500 ease-in-out
                ${isOpen
                        ? "translate-x-0 opacity-100 pointer-events-auto"
                        : "translate-x-full opacity-0 pointer-events-none"
                    }`}
            >
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `px-8 py-3 rounded-lg text-xl sm:text-2xl font-semibold transition-all
                            ${isActive
                                ? "bg-primary text-white"
                                : "text-black dark:text-white hover-bg-primary"
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}

                {/* MOBILE THEME BUTTON */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-black dark:text-white transition-colors duration-300"
                >
                    {dark ? <Sun size={20} className="text-secondary" /> : <Moon size={20} className="text-gray-700" />}
                    Toggle Theme
                </button>

                {/* MOBILE CTA */}
                <NavLink
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest rounded-full text-sm hover-bg-secondary transition"
                >
                    Start Project
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;