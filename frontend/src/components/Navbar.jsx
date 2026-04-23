
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const navLinks = [
        { name: "About Us", path: "/aboutus" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blog" },
        {
            name: "Portfolio",
            path: "/portfolio/social-media-marketing",
            dropdown: [
                { name: "Social Media Marketing", path: "/portfolio/social-media-marketing" },
                { name: "Branding", path: "/portfolio/branding" },
                { name: "Logo Designing", path: "/portfolio/logo-designing" },
                { name: "Video", path: "/portfolio/video" },
                { name: "3D Animation", path: "/portfolio/3d-animation" },
            ],
        },
        { name: "Career", path: "/career" },
    ];

    /* Load Theme */
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
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
        <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-all duration-300">

            {/* NAVBAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">

                {/* LOGO */}
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                    <img
                        src={dark ? "/assets/logo1.png" : "/logo2.png"}
                        alt="logo"
                        className="w-44 lg:w-52 pb-4"
                    />
                </NavLink>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center space-x-10">

                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">

                            {/* MAIN LINK */}
                            <NavLink
                                to={link.path}
                                className="text-sm font-bold uppercase tracking-widest text-black dark:text-white hover:text-primary"
                            >
                                <h4 className="flex items-center gap-1">

                                    {link.name}

                                    {/* ONLY PORTFOLIO ARROW */}
                                    {link.name === "Portfolio" && link.dropdown && (
                                        <ChevronDown
                                            size={16}
                                            className="transition-transform duration-300 group-hover:rotate-180"
                                        />
                                    )}
                                </h4>
                            </NavLink>

                            {/* DROPDOWN */}
                            {link.dropdown && (
                                <div className="absolute top-8 left-0 w-64 backdrop-blur-lg bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 z-50">

                                    {link.dropdown.map((item) => (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-5 py-3 text-sm text-black dark:text-white hover:bg-primary hover:text-white transition-all"
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}

                                </div>
                            )}
                        </div>
                    ))}

                    {/* THEME */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600"
                    >
                        {dark ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {/* CTA */}
                    <NavLink
                        to="/contact"
                        className="px-6 py-2 bg-primary text-black text-xs font-bold uppercase rounded-full"
                    >
                        Start Project
                    </NavLink>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <div className={`fixed top-20 right-0 w-full h-[calc(100vh-5rem)]
                bg-white dark:bg-black flex flex-col items-center justify-center gap-6 transition-all duration-500
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}>

                {navLinks.map((link) => (
                    <div key={link.name} className="w-full text-center">

                        {/* MAIN BUTTON */}
                        <button
                            onClick={() =>
                                link.dropdown
                                    ? setOpenDropdown(openDropdown === link.name ? null : link.name)
                                    : setIsOpen(false)
                            }
                            className="flex items-center justify-center gap-2 text-xl font-semibold text-black dark:text-white"
                        >
                            {link.name}

                            {/* ONLY PORTFOLIO ARROW */}
                            {link.name === "Portfolio" && link.dropdown && (
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-300 ${openDropdown === link.name ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </button>

                        {/* MOBILE DROPDOWN */}
                        {link.dropdown && openDropdown === link.name && (
                            <div className="mt-2 flex flex-col gap-2">
                                {link.dropdown.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => {
                                            setIsOpen(false);
                                            setOpenDropdown(null);
                                        }}
                                        className="text-gray-600 dark:text-gray-300 hover:text-primary"
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* THEME */}
                <button onClick={toggleTheme} className="mt-4">
                    {dark ? "Light Mode" : "Dark Mode"}
                </button>

                {/* CTA */}
                <NavLink
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-6 py-3 bg-primary rounded-full"
                >
                    Start Project
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;