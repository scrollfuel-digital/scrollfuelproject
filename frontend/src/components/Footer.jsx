import { Phone, Mail } from 'lucide-react';
import { NavLink, Link } from "react-router-dom";
import { services } from "../data/services.js";
const Footer = () => {
    return (
        <footer className="bg-dark text-white">

            <div className="max-w-6xl mx-auto">

                {/* TOP SECTION */}
                {/* <div className="flex justify-between items-center pl-4 md:pl-0"> */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pl-4 md:pl-0">

                    {/* LOGO */}
                    <div className="flex flex-col ">
                        <NavLink to="/" end className="flex items-center">
                            <img
                                src="/assets/logo1.png"
                                alt="Logo"
                                className="w-44 sm:w-30 lg:w-54"
                            />
                        </NavLink>
                    </div>

                    {/* SOCIAL ICONS */}

                    <div className="flex flex-col items-end  mr-4 mb-4 md:mt-10">
                        <div className="flex items-center">
                            {[
                                { href: "https://www.instagram.com/scrollfuel/", icon: "/assets/logo/instagram3.png" },
                                { href: "https://www.youtube.com/@ScrollfuelOfficial", icon: "/assets/logo/youtube5.png" },
                                { href: "https://www.facebook.com/scrollfuel.nagpur", icon: "/assets/logo/facebook1.png" },
                                { href: "https://www.behance.net/scrollfuel60b4", icon: "/assets/logo/behance1.png" },
                                { href: "https://www.linkedin.com/company/scrollfuel/", icon: "/assets/logo/linkdin1.png" },
                                { href: "https://in.pinterest.com/scrollfuel/_created/", icon: "/assets/logo/pinterest1.png" }
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 flex items-center justify-center"
                                >
                                    <img
                                        src={item.icon}
                                        alt="social icon"
                                        className="w-6 h-6 object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* BOTTOM SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sm pb-5 pl-10 md:pl-0 ">
                    {/* Brand / Address */}
                    <div>
                        <span className="font-semibold text-lg text-white ">Address</span>
                        <p className="text-muted mt-3 font-bold">
                            Bidoba Sahkari Sanstha, Plot no 133, Wardha Road,
                            Near Hotel Center Point, Bante Layout, Sonegaon, Ujwal Nagar,
                            Nagpur-440022 </p>
                        <a href="https://maps.app.goo.gl/oQfiqBwaEo6xyFYYA" target="_blank"
                            className="inline-block mt-4 text-primary hover-text-secondary transition font-bold pb-2" >
                            Find on Map → </a>
                    </div>
                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3">Company</h4>
                        <ul className="space-y-3 text-muted">
                            <li><a href="/" className="hover-text-primary font-bold">Home</a></li>
                            <li><a href="/about" className="hover-text-primary font-bold">About</a></li>
                            <li><a href="/blog" className="hover-text-primary font-bold">Blog</a></li>
                            <li><a href="/portfolio" className="hover-text-primary font-bold">Portfolio</a></li>
                            <li><a href="/career" className="hover-text-primary font-bold">Career</a></li>
                        </ul>
                    </div>
                   
                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3">Services</h4>
                        <ul className="space-y-3 text-muted">
                            {services.slice(0, 4).map((ser) => (
                                <li key={ser.slug}>
                                    <Link
                                        to={`/services/${ser.slug}`}
                                        className="hover-text-primary font-bold"
                                    >
                                        {ser.title}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link
                                    to="/services"
                                    className="hover-text-primary font-bold"
                                >
                                    More...
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3 font-bold">
                            <li className="flex items-center gap-2 text-muted">
                                <Phone size={16} className="text-primary" />

                                <a
                                    href="tel:+918788430110"
                                    className="hover:text-primary"
                                >
                                    +91 8788430110
                                </a>

                                <span>,</span>

                                <a
                                    href="tel:+919699660972"
                                    className="hover:text-primary"
                                >
                                    +91 9699660972
                                </a>
                            </li>

                            <li className="relative pl-7 text-muted font-bold">
                                <Mail size={16} className="absolute left-0 top-1 text-primary" />
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=scrollfuel@gmail.com" target="_blank" rel="noopener noreferrer"
                                    className="hover-text-primary " > scrollfuel@gmail.com </a> </li> <li className="relative pl-7 text-muted">
                                <Mail size={16} className="absolute left-0 top-1 text-primary" />
                                <a href="mailto:scrollfueldigital@gmail.com" className="hover-text-primary" >
                                    scrollfueldigital@gmail.com </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="border-t border-white/10">

                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs font-bold text-muted">

                    © {new Date().getFullYear()} ScrollFuel Digital Marketing Agency. All rights reserved.

                </div>

            </div>

        </footer >
    );
};

export default Footer;
