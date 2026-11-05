import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { pageSEO } from "../../data/seoData";
import SEO from "../../components/SEO";
import AboutHero from "../../components/ui/Abouthero";
import FounderSection from "../../components/ui/Foundersection";
import WhyChooseSection from "../../components/ui/Whychoosesection";
import {
    Target,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Users,
    Star,
    Code2,
    Search,
    MapPin,
    MousePointerClick,
    PenLine,
    Share2,
    Palette,
    Eye,
    Sparkles,
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
};

// ============= PAGE =============

const AboutUsPage = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    useEffect(() => {
        // SEO is handled by the <SEO> component below
    }, []);

    const scrollRef = useRef(null);

    useAnimationFrame((time, delta) => {
        const container = scrollRef.current;

        if (!container) return;

        // Scroll speed in pixels per second
        container.scrollTop += (delta / 1000) * 25;

        // Restart smoothly when reaching the bottom
        if (
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 1
        ) {
            container.scrollTop = 0;
        }
    });

    // ---- Services (from content doc) ----
    // const services = [
    //     {
    //         icon: Search,
    //         title: "Search Engine Optimization (SEO)",
    //         text: "Improve organic visibility and help potential customers discover your business online.",
    //     },
    //     {
    //         icon: MapPin,
    //         title: "Local SEO",
    //         text: "Strengthen your presence in local search results and help customers find your business in Nagpur and nearby areas.",
    //     },
    //     {
    //         icon: MousePointerClick,
    //         title: "SEO and PPC Services",
    //         text: "Combine organic search strategies with paid advertising to reach relevant audiences.",
    //     },
    //     {
    //         icon: PenLine,
    //         title: "Content Marketing",
    //         text: "Create useful, audience-focused content that builds trust and supports your marketing goals.",
    //     },
    //     {
    //         icon: Share2,
    //         title: "Social Media Marketing",
    //         text: "Build brand awareness and engage with customers across relevant social platforms.",
    //     },
    //     {
    //         icon: Code2,
    //         title: "Website Development",
    //         text: "Create responsive, user-friendly websites that communicate your brand and support business objectives.",
    //     },
    //     {
    //         icon: Palette,
    //         title: "Branding, Graphic Design, Videography and Photography",
    //         text: "Develop consistent brand visuals and engaging creative content.",
    //     },
    // ];

    /* CREATIVE ICON ILLUSTRATIONS (Vision & Mission) */
    const CreativeIcon = ({ Icon, isHovered, variant = "default" }) => {
        const variants = {
            vision: (
                <div className="relative w-32 h-32">
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                    >
                        <motion.div
                            className="absolute w-28 h-28 rounded-full bg-linear-to-br from-primary/30 to-secondary/30 blur-xl"
                            animate={{
                                scale: isHovered ? [1, 1.3, 1] : 1,
                                opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        <Icon size={48} className="text-primary relative z-10" />

                        {isHovered && (
                            <>
                                <motion.div
                                    className="absolute w-full h-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <Star className="absolute -top-2 left-1/2 -ml-3 text-secondary" size={16} />
                                </motion.div>
                                <motion.div
                                    className="absolute w-full h-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="absolute top-1/2 -right-2 -mt-3 text-primary" size={14} />
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </div>
            ),
            mission: (
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border-2 border-secondary/30"
                                style={{ width: 60 + i * 20, height: 60 + i * 20 }}
                                animate={{
                                    scale: isHovered ? [1, 1.2, 1] : 1,
                                    opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            />
                        ))}

                        <motion.div
                            className="absolute w-16 h-16 bg-linear-to-br from-secondary to-primary rounded-full flex items-center justify-center"
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Icon size={32} className="text-black" />
                        </motion.div>

                        {isHovered && (
                            <motion.div
                                className="absolute w-1 h-8 bg-primary"
                                initial={{ scale: 0, x: -50, y: -50 }}
                                animate={{ scale: [0, 1, 0], x: [-50, 0], y: [-50, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                style={{ transformOrigin: "bottom" }}
                            />
                        )}
                    </div>
                </div>
            ),
        };

        return variants[variant] || <Icon size={48} className="text-primary" />;
    };

    return (
        <div className="bg-white dark:bg-black dark:text-white overflow-hidden ">
            <SEO
                title={pageSEO.about.title}
                description={pageSEO.about.description}
                canonical={pageSEO.about.canonical}
            />

            {/* ============= HERO SECTION ============= */}
            <AboutHero />

            {/* VISION & MISSION */}

            <section className="relative px-6 md:px-12 py-20 md:py-28 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-8 py-2 grid md:grid-cols-2 gap-12">
                    {/* VISION */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        onMouseEnter={() => setHoveredCard("vision")}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="relative perspective-1000"
                        style={{ perspective: "1000px" }}
                    >
                        <motion.div
                            className="relative min-h-87.5"
                            animate={{
                                rotateY: hoveredCard === "vision" ? 5 : 0,
                                rotateX: hoveredCard === "vision" ? -5 : 0,
                            }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <motion.div
                                className="relative px-10 py-6 rounded-3xl overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                                    border: "1px solid rgba(139, 197, 63, 0.2)",
                                }}
                                animate={{
                                    borderColor:
                                        hoveredCard === "vision"
                                            ? "rgba(139, 197, 63, 0.8)"
                                            : "rgba(139, 197, 63, 0.2)",
                                    boxShadow:
                                        hoveredCard === "vision"
                                            ? "0 20px 60px rgba(139, 197, 63, 0.3), inset 0 0 60px rgba(139, 197, 63, 0.1)"
                                            : "0 10px 30px rgba(0, 0, 0, 0.3)",
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: "radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0), transparent)",
                                    }}
                                    animate={{
                                        background:
                                            hoveredCard === "vision"
                                                ? [
                                                    "radial-gradient(circle at 0% 0%, rgba(139, 197, 63, 0.2), transparent)",
                                                    "radial-gradient(circle at 100% 100%, rgba(139, 197, 63, 0.2), transparent)",
                                                    "radial-gradient(circle at 0% 0%, rgba(139, 197, 63, 0.2), transparent)",
                                                ]
                                                : "radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0), transparent)",
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {hoveredCard === "vision" && (
                                    <motion.div
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            background:
                                                "linear-gradient(45deg, transparent 30%, rgba(139, 197, 63, 0.3) 50%, transparent 70%)",
                                        }}
                                        initial={{ x: "-100%", y: "-100%" }}
                                        animate={{ x: "100%", y: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                    />
                                )}

                                <div className="relative z-10">
                                    <motion.div
                                        animate={{
                                            scale: hoveredCard === "vision" ? 1.1 : 1,
                                            rotate: hoveredCard === "vision" ? 360 : 0,
                                        }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <CreativeIcon Icon={Eye} isHovered={hoveredCard === "vision"} variant="vision" />
                                    </motion.div>

                                    <motion.h2
                                        className="text-4xl font-bold mb-6 mt-1"
                                        animate={{
                                            color: hoveredCard === "vision" ? "var(--color-green)" : "#ffffff",
                                            x: hoveredCard === "vision" ? 10 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Our Vision
                                    </motion.h2>

                                    <motion.p
                                        className="text-lg leading-relaxed"
                                        animate={{
                                            color: hoveredCard === "vision" ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                                            x: hoveredCard === "vision" ? 10 : 0,
                                        }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        To become a trusted digital marketing agency delivering sustainable business growth through ethical and performance-driven strategies.
                                    </motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* MISSION */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onMouseEnter={() => setHoveredCard("mission")}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="relative"
                    >
                        <motion.div
                            className="relative min-h-7.5"
                            animate={{ scale: hoveredCard === "mission" ? 1.03 : 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                className="relative px-10 rounded-3xl overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)",
                                    border: "1px solid rgba(255, 201, 59, 0.2)",
                                }}
                                animate={{
                                    borderColor:
                                        hoveredCard === "mission"
                                            ? "rgba(255, 201, 59, 0.8)"
                                            : "rgba(255, 201, 59, 0.2)",
                                    borderRadius: hoveredCard === "mission" ? "30px" : "24px",
                                    boxShadow:
                                        hoveredCard === "mission"
                                            ? "0 20px 60px rgba(255, 201, 59, 0.3), inset 0 0 60px rgba(255, 201, 59, 0.1)"
                                            : "0 10px 30px rgba(0, 0, 0, 0.3)",
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                {hoveredCard === "mission" && (
                                    <>
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-secondary/30 rounded-full"
                                                initial={{ width: 0, height: 0, opacity: 0.6 }}
                                                animate={{ width: 400, height: 400, opacity: 0 }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                                            />
                                        ))}
                                    </>
                                )}

                                <div className="relative z-10">
                                    <motion.div
                                        animate={{ y: hoveredCard === "mission" ? -10 : 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <CreativeIcon Icon={Target} isHovered={hoveredCard === "mission"} variant="mission" />
                                    </motion.div>

                                    <motion.h2
                                        className="text-4xl font-bold mb-6 mt-7"
                                        animate={{
                                            color: hoveredCard === "mission" ? "var(--color-yellow)" : "#ffffff",
                                            y: hoveredCard === "mission" ? -5 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Our Mission
                                    </motion.h2>

                                    <motion.p
                                        className="text-lg leading-relaxed pb-6"
                                        animate={{
                                            color: hoveredCard === "mission" ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                                            y: hoveredCard === "mission" ? -5 : 0,
                                        }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        To lead digital transformation by helping brands scale faster, dominate markets, and achieve sustainable growth through innovation, data, and strategy.
                                    </motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ============= SERVICES ============= */}

             {/* <section className="relative px-6 md:px-12 py-20 md:py-28 bg-white dark:bg-black">

                <div className="
        max-w-7xl mx-auto
        grid grid-cols-1
        lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]
        gap-12 lg:gap-20
    ">
                    <div className="lg:sticky lg:top-28 self-start">

                        <h2 className="
                text-3xl sm:text-4xl md:text-5xl
                font-bold
                leading-[1.15]
                tracking-tight
                text-black dark:text-white
                mb-6
            ">
                            Our Digital Marketing
                            <span className="block text-primary">
                                Services
                            </span>
                        </h2>

                        <div className="
                h-1 w-24 rounded-full
                bg-gradient-to-r
                from-primary to-secondary
                mb-7
            " />

                        <p className="
                text-base md:text-lg
                leading-8
                text-gray-600 dark:text-gray-300
                max-w-md
                text-left
            ">
                            At ScrollFuel, we offer a range of digital solutions
                            designed to strengthen your online presence,
                            connect with the right audience, and support
                            your business at every stage of growth.
                        </p>

                    </div>

                    <div
                        ref={scrollRef}
                        className="
                h-[450px]
                overflow-y-auto
                scrollbar-hide no-scrollbar
                pr-2
            "
                    >

                        <ul className="
                flex flex-col
                divide-y
                divide-gray-200
                dark:divide-white/10
            ">

                            {services.map(({ icon: Icon, title, text }, index) => (

                                <li
                                    key={title}
                                    className="
                            group relative
                            flex items-start
                            gap-5 sm:gap-6
                            py-7 px-3 sm:px-5
                            rounded-xl
                            transition-all duration-300

                            hover:bg-primary/5
                            dark:hover:bg-[#8bc53f]/10
                        "
                                >
                                    <div className="
                            shrink-0
                            w-12 h-12 sm:w-14 sm:h-14
                            rounded-xl
                            flex items-center justify-center

                            border border-[#8bc53f]/40
                            bg-[#8bc53f]/10
                            text-[#75ad32]

                            dark:border-[#8bc53f]/60
                            dark:bg-[#8bc53f]/15
                            dark:text-[#a8e063]

                            transition-all duration-300

                            group-hover:bg-[#8bc53f]
                            group-hover:text-black
                            group-hover:border-[#8bc53f]
                            group-hover:scale-110
                            group-hover:shadow-[0_0_20px_rgba(139,197,63,0.3)]
                        ">
                                        {Icon && (
                                            <Icon
                                                size={25}
                                                strokeWidth={1.8}
                                            />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 pt-1">

                                        <span className="
                                block mb-2
                                text-xs font-bold
                                tracking-[0.15em]
                                text-[#8bc53f]
                            ">
                                            SERVICE {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <h3 className="
                                text-lg sm:text-xl
                                font-bold
                                leading-snug
                                text-gray-900 dark:text-white
                                mb-3
                                transition-colors duration-300
                                group-hover:text-[#75ad32]
                                dark:group-hover:text-[#a8e063]
                            ">
                                            {title}
                                        </h3>

                                        <p className="
                                text-sm sm:text-base
                                leading-7
                                text-gray-600 dark:text-gray-300
                                text-left
                                max-w-xl
                            ">
                                            {text}
                                        </p>

                                    </div>

                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

            </section>  */}

            {/* ============= WHY CHOOSE ============= */}
            <WhyChooseSection />

            {/* ============= FOUNDER SECTION ============= */}
            <FounderSection />

            {/* ============= VALUES SECTION (unchanged) ============= */}
            <section className="py-10 px-6 dark:bg-black">
                <div className="container mx-auto max-w-7xl">
                    <motion.h2
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-semibold text-center mb-16"
                    >
                        Our Digital Marketing <span className="text-primary">Values</span>
                    </motion.h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Performance-Driven", text: "Driving growth with data-led strategies.", color: "primary" },
                            { icon: BarChart3, title: "ROI-Driven Marketing", text: "Every decision is tied to business impact.", color: "secondary" },
                            { icon: TrendingUp, title: "Optimization", text: "We test, learn, and improve constantly.", color: "primary" },
                            { icon: Users, title: "Client-First Growth", text: "Success driven by your outcomes.", color: "secondary" },
                        ].map((item, index) => {
                            const isPrimary = item.color === "primary";
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.12 }}
                                    whileHover={{ y: -10, scale: 1.03 }}
                                    className="relative rounded-2xl p-1px group cursor-pointer overflow-hidden"
                                >
                                    <div
                                        className={`relative z-10 rounded-2xl backdrop-blur-xl border p-8 text-center transition-all duration-500 overflow-hidden ${isPrimary ? "border-primary" : "border-secondary"}`}
                                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                                    >
                                        <div
                                            className={`absolute left-0 w-full z-0 transition-all duration-700 ease-in-out ${index % 2 === 0 ? "bottom-0 h-0 group-hover:h-full" : "top-0 h-0 group-hover:h-full"}`}
                                            style={{ backgroundColor: isPrimary ? "#8bc53f" : "#ffc93b" }}
                                        />
                                        <div className="relative z-10">
                                            <item.icon size={48} className={`mx-auto mb-5 transition-all duration-500 ${isPrimary ? "text-primary group-hover:text-white group-hover:scale-125" : "text-secondary group-hover:text-black group-hover:scale-125"}`} />
                                            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isPrimary ? "text-primary group-hover:text-white" : "text-secondary group-hover:text-black"}`}>
                                                {item.title}
                                            </h3>
                                            <p className={`transition-colors duration-500 ${isPrimary ? "text-white/80 group-hover:text-white" : "text-white/80 group-hover:text-black"}`}>
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUsPage;