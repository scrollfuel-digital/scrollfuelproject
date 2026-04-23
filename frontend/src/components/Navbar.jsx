import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setPortfolioOpen(false);
  }, [location]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

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

  const close = () => {
    setIsOpen(false);
    setPortfolioOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black border-b border-black/5 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" onClick={close} className="shrink-0">
            <img
              src={dark ? "/assets/logo1.png" : "/logo2.png"}
              alt="ScrollFuel"
              className="w-36 sm:w-44 lg:w-52 pb-3"
            />
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors duration-200
                    ${isActive ? "text-primary" : "text-black dark:text-white hover:text-primary"}`
                  }
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </NavLink>

                {link.dropdown && (
                  <div className="absolute top-8 left-0 w-60 bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible scale-95 group-hover:scale-100 transition-all duration-300 z-50 overflow-hidden">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-5 py-3 text-sm font-medium transition-all duration-150
                          ${isActive ? "bg-primary text-white" : "text-black dark:text-white hover:bg-primary hover:text-secondary"}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/20 hover:border-primary transition-colors"
            >
              {dark ? <Moon size={16} className="text-white" /> : <Sun size={16} />}
            </button>

            <NavLink
              to="/contact"
              className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity"
            >
              Start Project
            </NavLink>
          </div>

          {/* MOBILE — theme + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/20"
            >
              {dark ? <Moon size={16} className="text-white" /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} className="dark:text-white" /> : <Menu size={20} className="dark:text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={close}
      />

      {/* MOBILE DRAWER */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-[80vw] max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col transition-transform duration-400 ease-out lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* drawer header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100 dark:border-white/10 shrink-0">
          <NavLink to="/" onClick={close}>
            <img
              src={dark ? "/assets/logo1.png" : "/logo2.png"}
              alt="ScrollFuel"
              className="w-32 pb-2"
            />
          </NavLink>
          <button
            onClick={close}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10"
          >
            <X size={18} className="dark:text-white" />
          </button>
        </div>

        {/* drawer links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                <>
                  {/* Portfolio accordion trigger */}
                  <button
                    onClick={() => setPortfolioOpen(!portfolioOpen)}
                    className="w-full flex items-center justify-between py-3.5 text-base font-bold uppercase tracking-widest text-black dark:text-white border-b border-gray-100 dark:border-white/10"
                  >
                    {link.name}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 text-primary ${portfolioOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* accordion items */}
                  <div className={`overflow-hidden transition-all duration-300 ${portfolioOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 py-2 flex flex-col gap-1">
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={close}
                          className={({ isActive }) =>
                            `flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-150
                            ${isActive ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary"}`
                          }
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  onClick={close}
                  className={({ isActive }) =>
                    `flex items-center py-3.5 text-base font-bold uppercase tracking-widest border-b border-gray-100 dark:border-white/10 transition-colors duration-150
                    ${isActive ? "text-primary" : "text-black dark:text-white hover:text-primary"}`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* drawer footer */}
        <div className="px-6 py-6 border-t border-gray-100 dark:border-white/10 flex flex-col gap-3 shrink-0">
          <NavLink
            to="/contact"
            onClick={close}
            className="w-full py-3.5 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-2xl text-center hover:opacity-90 transition-opacity"
          >
            Start Project
          </NavLink>
          <button
            onClick={toggleTheme}
            className="w-full py-3 rounded-2xl border border-gray-200 dark:border-white/15 text-sm font-semibold text-black dark:text-white flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all"
          >
            {dark ? <Moon size={15} /> : <Sun size={15} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
