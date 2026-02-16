
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../../data/services.js";
import CountUp from "react-countup";

/* ---------------- ANIMATED HERO SECTION ---------------- */
const HeroSection = ({ servicesRef }) => {
    const [showContent, setShowContent] = useState(false);
    // Detect when hero enters screen
    const navigate = useNavigate();
    const heroRef = useRef(null);

    const isInView = useInView(heroRef, { once: true, margin: "-100px" });
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    const handleExplore = () => {
        servicesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const handleContact = () => {
        navigate("/contact");
    };
    return (
        // <div className="relative w-full h-screen overflow-hidden bg-black">
        <div ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black">
            {/* Animated Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Base gradient */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black"
                />

                {/* Animated Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-30"
                    style={{ background: 'var(--color-green)' }}
                />

                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-10 right-10 w-500px h-500px rounded-full blur-3xl opacity-25"
                    style={{ background: 'var(--color-yellow)' }}
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -60, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-20"
                    style={{ background: 'var(--color-green)' }}
                />

                {/* Animated Icons/Shapes - Digital Marketing Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Chart/Graph Icons */}
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-[15%] w-16 h-16 opacity-20"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="40" width="12" height="16" fill="var(--color-green)" rx="2" />
                            <rect x="26" y="28" width="12" height="28" fill="var(--color-yellow)" rx="2" />
                            <rect x="44" y="16" width="12" height="40" fill="var(--color-green)" rx="2" />
                        </svg>
                    </motion.div>

                    {/* Target/Bullseye Icon */}
                    <motion.div
                        animate={{
                            y: [0, 40, 0],
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-[30%] right-[20%] w-20 h-20 opacity-15"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="28" stroke="var(--color-yellow)" strokeWidth="2" />
                            <circle cx="32" cy="32" r="20" stroke="var(--color-yellow)" strokeWidth="2" />
                            <circle cx="32" cy="32" r="12" stroke="var(--color-green)" strokeWidth="2" />
                            <circle cx="32" cy="32" r="6" fill="var(--color-green)" />
                        </svg>
                    </motion.div>

                    {/* Megaphone Icon */}
                    <motion.div
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 20, 0],
                            rotate: [0, -10, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[25%] left-[20%] w-24 h-24 opacity-20"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 24L32 16L32 48L12 40V24Z" fill="var(--color-green)" />
                            <path d="M32 16L52 20V44L32 48V16Z" fill="var(--color-yellow)" />
                            <path d="M8 28H12V36H8L6 32L8 28Z" fill="var(--color-green)" />
                            <circle cx="38" cy="52" r="4" fill="var(--color-yellow)" />
                        </svg>
                    </motion.div>

                    {/* Cursor Click Icon */}
                    <motion.div
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 15, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        className="absolute top-[60%] right-[15%] w-16 h-16 opacity-25"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8L12 44L24 32L32 52L40 48L32 28L48 28L12 8Z" fill="var(--color-yellow)" />
                            <circle cx="48" cy="16" r="6" fill="var(--color-green)">
                                <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </motion.div>

                    {/* Social Media Icon */}
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            rotate: [0, -15, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute bottom-[40%] right-[25%] w-20 h-20 opacity-20"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="8" fill="var(--color-green)" />
                            <circle cx="44" cy="20" r="8" fill="var(--color-yellow)" />
                            <circle cx="32" cy="44" r="8" fill="var(--color-green)" />
                            <line x1="26" y1="24" x2="36" y2="40" stroke="var(--color-yellow)" strokeWidth="2" />
                            <line x1="38" y1="24" x2="28" y2="40" stroke="var(--color-green)" strokeWidth="2" />
                        </svg>
                    </motion.div>

                    {/* Email Icon */}
                    <motion.div
                        animate={{
                            x: [0, 25, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                        }}
                        className="absolute top-[45%] left-[12%] w-18 h-18 opacity-15"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="16" width="48" height="32" rx="4" fill="var(--color-yellow)" opacity="0.8" />
                            <path d="M8 20L32 36L56 20" stroke="var(--color-black)" strokeWidth="2" />
                        </svg>
                    </motion.div>

                    {/* SEO/Search Icon */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-[15%] right-[30%] w-16 h-16 opacity-20"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="26" cy="26" r="16" stroke="var(--color-green)" strokeWidth="3" />
                            <line x1="38" y1="38" x2="54" y2="54" stroke="var(--color-yellow)" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </motion.div>

                    {/* Trending Up Arrow */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute bottom-[15%] left-[35%] w-20 h-20 opacity-25"
                    >
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 56L24 40L32 48L56 8" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="round" />
                            <path d="M42 8H56V22" stroke="var(--color-yellow)" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: Math.random() * 4 + 2,
                                height: Math.random() * 4 + 2,
                                background: i % 2 === 0 ? 'var(--color-green)' : 'var(--color-yellow)',
                            }}
                            animate={{
                                y: [0, -100 - Math.random() * 100],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `
                            linear-gradient(var(--color-green) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-green) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }} />
                </div>
            </div>

            {/* Dark Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-black/30 z-10"
            />

            {/* Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                // className="relative z-20 h-full flex items-center justify-center px-6 "
                className="relative z-20 h-full flex items-start md:items-center justify-center px-6 pt-80 md:pt-0"

            >
                <div className="text-white max-w-5xl w-full mx-auto flex flex-col items-center text-center space-y-7">

                    {/* Subtitle Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="px-6 py-2 border-2 border-primary rounded-full backdrop-blur-sm"
                        style={{ background: 'rgba(139, 197, 63, 0.15)' }}
                    >
                        <span className="text-sm md:text-base font-medium text-primary">
                            Digital Solutions That Drive Results
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
                       transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-6xl font-bold leading-tight"
                    >
                        Our{" "}
                        <span className="relative inline-block">
                            <span className="text-primary">
                                Services
                            </span>
                            <motion.span
                                className="absolute -bottom-3 left-0 right-0 h-2 bg-primary rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: showContent ? 1 : 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            />
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-white/90 text-lg md:text-xl lg:text-xl leading-relaxed max-w-4xl font-light"
                    >
                        At ScrollFuel, we create digital solutions that go beyond visuals.
                        Our work helps brands communicate clearly, connect with the right
                        audience, and deliver measurable results.
                    </motion.p>

                    {/* Stats Row */}
                  
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-wrap gap-8 md:gap-12 justify-center pt-4"
                    >
                        {[
                            { label: "Projects Delivered", end: 100, suffix: "+" },
                            { label: "Happy Clients", end: 150, suffix: "+" },
                            { label: "Success Rate", end: 98, suffix: "%" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.5 }}
                                transition={{ delay: 1.8 + i * 0.1, duration: 0.6 }}
                            >
                                <motion.div
                                    className="text-3xl md:text-5xl font-bold text-secondary"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {isInView && (
                                        <CountUp
                                            start={0}
                                            end={stat.end}
                                            duration={2.5}
                                            suffix={stat.suffix}
                                            enableScrollSpy
                                            scrollSpyOnce
                                        />
                                    )}
                                </motion.div>

                                <div className="text-sm md:text-base text-white/70 mt-1 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
                       transition={{ delay: 1, duration: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 w-full max-w-md"
                    >
                        <motion.button
                            onClick={handleExplore}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(139, 197, 63, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-primary rounded-full font-semibold text-black transition-all duration-300 w-full"
                        >
                            Explore Services
                        </motion.button>

                        <motion.button
                            onClick={handleContact}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 201, 59, 0.2)",
                                borderColor: "var(--color-yellow)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-secondary rounded-full font-semibold text-white transition-all duration-300 backdrop-blur-sm w-full"
                        >
                            Get in Touch
                        </motion.button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showContent ? 1 : 0 }}
                        transition={{ delay: 3.2, duration: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-3 text-white/70 cursor-pointer hover:text-primary transition-colors"
                        >
                            <span className="text-sm font-medium tracking-wider uppercase">Scroll to explore</span>
                            <motion.div
                                className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
                                whileHover={{ borderColor: "var(--color-green)" }}
                            >
                                <motion.div
                                    className="w-1.5 h-3 rounded-full bg-primary"
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div> */}
                </div>
            </motion.div>
        </div>
    );
};

/* ---------------- SERVICE CARD (UNCHANGED) ---------------- */

const ServiceCard = ({ service, onClick }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            layout
            onClick={onClick}
            className="
                bg-white rounded-3xl max-w-6xl w-full
                grid grid-cols-1 lg:grid-cols-2
                overflow-hidden cursor-pointer
                h-[85vh] lg:h-[70vh]
                shadow-2xl
                transition-all duration-500
            "
            whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: "0 25px 50px rgba(139, 197, 63, 0.3)"
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* IMAGE */}
            <div className="relative bg-dark flex items-center justify-center h-56 sm:h-72 lg:h-full overflow-hidden group">
                <motion.img
                    src={service.illustration}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* CONTENT */}
            <div
                className={`
                    px-6 lg:px-14 py-8
                    flex flex-col items-start text-left justify-center
                    gap-4 lg:gap-6
                    transition-all duration-300
                    ${expanded ? "overflow-y-auto" : "overflow-hidden lg:overflow-visible"}
                `}
                style={{ background: service.bg }}
            >
                {/* TITLE */}
                <motion.h2
                    layout
                    className="text-2xl md:text-3xl lg:text-4xl font-bold "
                    style={{ color: service.text }}
                >
                    {service.title}
                </motion.h2>

                {/* DESCRIPTION */}
                <motion.p
                    layout
                    className={`
                        max-w-md text-sm md:text-base leading-relaxed text-start
                        ${!expanded ? "line-clamp-4 lg:line-clamp-none" : ""}
                    `}
                    style={{ color: service.text }}
                >
                    {service.description}
                </motion.p>

                {/* KEYWORDS */}
                <div
                    className={`
                        flex flex-wrap justify-center gap-3 max-w-md
                        ${!expanded ? "max-h-16 overflow-hidden lg:max-h-none lg:overflow-visible" : ""}
                    `}
                >
                    {service.keywords?.map((keyword, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="
                                px-4 py-2 text-xs font-semibold
                                rounded-full
                                text-black
                                transition-all duration-300 cursor-pointer
                                shadow-sm hover:shadow-md
                            "
                            style={{
                                background: 'rgba(0, 0, 0, 0.1)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--color-green)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                                e.currentTarget.style.color = 'black';
                            }}
                        >
                            {keyword}
                        </motion.span>
                    ))}
                </div>

                {/* VIEW MORE BUTTON (mobile only) */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="
                        lg:hidden
                        text-sm font-semibold
                        text-black/70 hover:text-primary
                        transition-colors duration-200
                        flex items-center gap-2
                    "
                >
                    {expanded ? (
                        <>View Less <span>↑</span></>
                    ) : (
                        <>View More <span>↓</span></>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
};

/* ---------------- MAIN SERVICES PAGE ---------------- */

const Services = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const totalCards = services.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });


    return (
        <>
            {/* HERO SECTION */}
            <HeroSection servicesRef={containerRef} />


            {/* SCROLL STACK SECTION */}
            <section
                ref={containerRef}
                className="relative bg-black"
                style={{ height: `${totalCards * 100}vh` }}
            >
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">

                        {/* SERVICE CARDS */}
                        {services.map((service, index) => {
                            const start = index / totalCards;
                            const end = (index + 1) / totalCards;

                            // const y = useTransform(
                            //     scrollYProgress,
                            //     [start, end],
                            //     ["100%", "0%"]
                            // );
                            const y = useTransform(
                                scrollYProgress,
                                [start, end],
                                index === 0 ? ["0%", "0%"] : ["100%", "0%"]
                            );

                            const opacity = useTransform(
                                scrollYProgress,
                                [start - 0.05, start, end],
                                [0, 1, 1]
                            );

                            const scale = useTransform(
                                scrollYProgress,
                                [start, end],
                                [0.85, 1]
                            );

                            const rotateX = useTransform(
                                scrollYProgress,
                                [start, start + 0.1],
                                [5, 0]
                            );

                            const pointer = useTransform(opacity, (v) =>
                                v > 0.6 ? "auto" : "none"
                            );

                            return (
                                <motion.div
                                    key={service.slug}
                                    style={{
                                        y,
                                        opacity,
                                        scale,
                                        rotateX,
                                        pointerEvents: pointer,
                                    }}
                                    className="absolute inset-0 flex items-center justify-center px-6"
                                >
                                    <ServiceCard
                                        service={service}
                                        onClick={() =>
                                            navigate(`/services/${service.slug}`)
                                        }
                                    />
                                </motion.div>
                            );
                        })}

                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;

