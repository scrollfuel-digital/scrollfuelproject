
import { Phone, Mail } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { servicesData } from "../data/servicesData.js";
import { useState, useEffect } from "react";

const Footer = () => {
    const [dark, setDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    // Watch for theme changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setDark(
                document.documentElement.classList.contains("dark")
            );
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // servicesData is an object, so convert it into an array
    const services = Object.values(servicesData);

    const socialLinks = [
        {
            href: "https://www.instagram.com/scrollfuel/",
            icon: "/assets/logo/instagram_icon.jpg",
            name: "Instagram",
        },
        {
            href: "https://www.youtube.com/@ScrollfuelOfficial",
            icon: "/assets/logo/youtube_icon.jpg",
            name: "YouTube",
        },
        {
            href: "https://www.facebook.com/scrollfuel.nagpur",
            icon: "/assets/logo/facebook_logo.jpg",
            name: "Facebook",
        },
        {
            href: "https://www.behance.net/scrollfuel60b4",
            icon: "/assets/logo/be_logo.jpg",
            name: "Behance",
        },
        {
            href: "https://www.linkedin.com/company/scrollfuel/",
            icon: "/assets/logo/linkedin_icon.jpg",
            name: "LinkedIn",
        },
        {
            href: "https://in.pinterest.com/scrollfuel/_created/",
            icon: "/assets/logo/pinterest_icon.jpg",
            name: "Pinterest",
        },
    ];

    return (
        <footer className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pl-4 md:pl-10">

                    {/* LOGO */}
                    <div className="flex flex-col">
                        <NavLink to="/" end className="flex items-center">
                            <img
                                src={dark ? "/assets/logo1.png" : "/logo2.png"}
                                alt="ScrollFuel Digital Marketing Agency"
                                width={208}
                                height={48}
                                decoding="async"
                                className="w-44 sm:w-44 lg:w-52 pb-4 transition-all duration-300"
                            />
                        </NavLink>
                    </div>

                    {/* SOCIAL ICONS */}
                    <div className="flex flex-col items-end mr-4 mb-4 md:mt-10">
                        <div className="flex items-center flex-wrap">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ScrollFuel on ${item.name}`}
                                    className="w-14 h-14 flex items-center justify-center"
                                >
                                    <img
                                        src={item.icon}
                                        alt=""
                                        width={24}
                                        height={24}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-6 h-6 object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sm pb-5 px-4 md:pl-10 md:pr-6">

                    {/* ADDRESS */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3 text-black dark:text-white">
                            Address
                        </h4>

                        <p className="text-muted mt-3 font-bold">
                            Bidoba Sahkari Sanstha, Plot no 133, Wardha Road,
                            Near Hotel Center Point, Bante Layout, Sonegaon,
                            Ujwal Nagar, Nagpur-440025
                        </p>

                        <a
                            href="https://maps.app.goo.gl/oQfiqBwaEo6xyFYYA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-primary hover-text-secondary transition font-bold pb-2"
                        >
                            Find on Map →
                        </a>
                    </div>

                    {/* COMPANY */}
                    <div className="pl-0 md:pl-10">
                        <h4 className="font-semibold text-lg mb-3 text-black dark:text-white">
                            Company
                        </h4>

                        <ul className="space-y-3 text-muted">
                            <li>
                                <NavLink to="/" end className="hover-text-primary font-bold">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <Link to="/about-us/" className="hover-text-primary font-bold">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/" className="hover-text-primary font-bold">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio/" className="hover-text-primary font-bold">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/career/" className="hover-text-primary font-bold">
                                    Career
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3 text-black dark:text-white">
                            Services
                        </h4>

                        <ul className="space-y-3 text-muted">
                            {services.map((service) => (
                                <li key={service.slug}>
                                    <Link
                                        to={service.path}
                                        className="hover-text-primary font-bold"
                                    >
                                        {service.footer}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-black dark:text-white">
                            Contact
                        </h4>

                        <ul className="space-y-3 font-bold">

                            <li className="flex flex-wrap items-center text-muted">
                                <Phone
                                    size={16}
                                    className="text-primary mr-2 shrink-0"
                                />

                                <a
                                    href="tel:+919699660972"
                                    className="hover:text-primary"
                                >
                                    +91 9699660972
                                </a>

                                <span className="mx-1">,</span>

                                <a
                                    href="tel:+918788430110"
                                    className="hover:text-primary"
                                >
                                    +91 8788430110
                                </a>
                            </li>

                            <li className="relative pl-7 text-muted">
                                <Mail
                                    size={16}
                                    className="absolute left-0 top-1 text-primary"
                                />

                                <a
                                    href="mailto:scrollfuel@gmail.com"
                                    className="hover-text-primary break-words"
                                >
                                    scrollfuel@gmail.com
                                </a>
                            </li>

                            <li className="relative pl-7 text-muted">
                                <Mail
                                    size={16}
                                    className="absolute left-0 top-1 text-primary"
                                />

                                <a
                                    href="mailto:scrollfueldigital@gmail.com"
                                    className="hover-text-primary break-words"
                                >
                                    scrollfueldigital@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-black/10 dark:border-white/10 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs font-bold text-muted">
                    © {new Date().getFullYear()} ScrollFuel Digital Marketing Agency. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
