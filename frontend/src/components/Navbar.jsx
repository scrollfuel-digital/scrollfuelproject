import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "About Us", path: "/aboutus" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blog" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Career", path: "/career" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-9999 bg-black/90 backdrop-blur-xl">
            {/* Main Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">

                {/* Logo */}
                <NavLink to="/" end onClick={() => setIsOpen(false)}>
                    <img
                        src="/assets/logo1.png"
                        alt="Logo"
                        className="w-44 sm:w-44 lg:w-52 pb-4"
                    />
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-10">

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-xs font-bold uppercase tracking-widest relative group transition-all
                ${isActive
                                    ? "text-(--color-yellow)"
                                    : "text-white/60 hover:text-(--color-green)"
                                }`
                            }
                        >
                            {link.name}

                            <span className="absolute -bottom-2 left-0 h-0.5 bg-(--color-green) w-0 group-hover:w-full transition-all duration-500" />
                        </NavLink>
                    ))}

                    {/* CTA */}
                    <NavLink
                        to="/contact"
                        className="px-6 py-2 bg-(--color-green) text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-[var(--color-yellow) transition-all"
                    >
                        Start Project
                    </NavLink>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* ================= MOBILE MENU ================= */}
            <div
                className={`fixed top-20 right-0 w-full h-[calc(100vh-5rem)]
        bg-black/95 backdrop-blur-lg
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
                                ? "bg-(--color-green) text-white"
                                : "text-white hover:bg-(--color-green)/20"
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}

                {/* Mobile CTA */}
                <NavLink
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-6 py-3 bg-(--color-green) text-black font-bold uppercase tracking-widest rounded-full text-sm hover:bg-(--color-yellow) transition"
                >
                    Start Project
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
