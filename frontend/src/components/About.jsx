import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Target,
    Eye,
    TrendingUp,
    Layers,
    MapPin,
    MessageCircle,
    Sparkles,
    Star,
    Rocket,
    ArrowRight,
} from "lucide-react";
import React, { useState } from "react";

/* Change this if your About page route is different */
const ABOUT_PATH = "/about-us/";

/* ------------------------------------------------------------------
   CONTENT
------------------------------------------------------------------- */
const HERO = {
    h1Start: "About",
    h1Accent: "ScrollFuel",
    h2: "Your Digital Growth Partner in Nagpur and Beyond",
    cta: "Know More About Us",
};

const WHY_CHOOSE = {
    heading: "Why Choose ScrollFuel?",
    items: [
        {
            icon: Target,
            title: "Business-Focused Approach",
            text: "We consider your goals and audience before recommending the right digital marketing activities.",
            color: "primary",
        },
        {
            icon: Layers,
            title: "Connected Digital Services",
            text: "From SEO and content to social media and website development, we help bring your digital presence together.",
            color: "secondary",
        },
        {
            icon: MapPin,
            title: "Local Understanding, Wider Reach",
            text: "As a digital marketing company in Nagpur, we understand the importance of local visibility while supporting businesses targeting wider markets.",
            color: "primary",
        },
        {
            icon: MessageCircle,
            title: "Clear Communication",
            text: "We aim to explain our recommendations, priorities, and next steps clearly.",
            color: "secondary",
        },
        {
            icon: TrendingUp,
            title: "Continuous Improvement",
            text: "We focus on reviewing performance and identifying opportunities to improve your online presence over time.",
            color: "primary",
        },
    ],
};

const COLORS = {
    primary: {
        solid: "var(--color-green)",
        soft: "rgba(139, 197, 63, 0.15)",
        border: "rgba(139, 197, 63, 0.25)",
        borderStrong: "rgba(139, 197, 63, 0.85)",
        glow: "0 25px 60px rgba(139, 197, 63, 0.3), inset 0 0 60px rgba(139, 197, 63, 0.08)",
        tile: "linear-gradient(135deg, rgba(139,197,63,0.25), rgba(255,201,59,0.12))",
    },
    secondary: {
        solid: "var(--color-yellow)",
        soft: "rgba(255, 201, 59, 0.15)",
        border: "rgba(255, 201, 59, 0.25)",
        borderStrong: "rgba(255, 201, 59, 0.85)",
        glow: "0 25px 60px rgba(255, 201, 59, 0.3), inset 0 0 60px rgba(255, 201, 59, 0.08)",
        tile: "linear-gradient(135deg, rgba(255,201,59,0.25), rgba(139,197,63,0.12))",
    },
};

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

/* ------------------------------------------------------------------
   WHY CHOOSE SHOWCASE  (selector list + large display panel)
------------------------------------------------------------------- */
const WhyShowcase = ({ items }) => {
    const [active, setActive] = useState(0);
    const item = items[active];
    const c = COLORS[item.color];
    const Icon = item.icon;

    return (
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-stretch">
            {/* SELECTOR LIST */}
            <div role="tablist" aria-orientation="vertical" className="lg:col-span-2 flex flex-col gap-2">
                {items.map((it, i) => {
                    const isActive = i === active;
                    const ItIcon = it.icon;
                    const ic = COLORS[it.color];
                    return (
                        <button
                            key={it.title}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls="why-panel"
                            onClick={() => setActive(i)}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            className="relative text-left flex items-center gap-4 rounded-2xl px-5 py-4 cursor-pointer transition-colors duration-300 hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="why-active"
                                    className="absolute inset-0 rounded-2xl"
                                    style={{ background: ic.soft, border: `1px solid ${ic.border}` }}
                                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                />
                            )}
                            <span
                                className="relative z-10 w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300"
                                style={{
                                    background: isActive ? ic.tile : "transparent",
                                    border: `1px solid ${isActive ? ic.border : "rgba(128,128,128,0.3)"}`,
                                }}
                            >
                                <ItIcon
                                    size={22}
                                    style={{ color: isActive ? ic.solid : "currentColor" }}
                                    className={isActive ? "" : "opacity-60"}
                                />
                            </span>
                            <span
                                className={`relative z-10 font-semibold text-lg leading-snug transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-70"
                                    }`}
                            >
                                {it.title}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* DISPLAY PANEL */}
            <div
                id="why-panel"
                role="tabpanel"
                aria-live="polite"
                className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-80 lg:min-h-105 p-8 md:p-12 flex transition-[border-color,box-shadow] duration-500"
                style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    border: `1px solid ${c.border}`,
                    boxShadow: c.glow,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.3 }}
                        className="relative flex-1 flex flex-col justify-center"
                    >
                        {/* colour wash + watermark */}
                        <span
                            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                            style={{ background: c.soft }}
                        />
                        <Icon
                            size={260}
                            strokeWidth={0.75}
                            className="absolute -right-16 -bottom-16 opacity-[0.06] pointer-events-none"
                            style={{ color: c.solid }}
                        />

                        {/* icon with rings */}
                        <div className="relative w-24 h-24 mt-7 ml-7 mb-12 shrink-0">
                            <span className="absolute -inset-4 rounded-full border opacity-50" style={{ borderColor: c.border }} />
                            <span className="absolute -inset-7 rounded-full border opacity-25" style={{ borderColor: c.border }} />
                            <div
                                className="absolute inset-0 rounded-full flex items-center justify-center"
                                style={{ background: c.tile, border: `1px solid ${c.borderStrong}` }}
                            >
                                <Icon size={40} style={{ color: c.solid }} />
                            </div>
                        </div>

                        <h3 className="relative font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                            {item.title}
                        </h3>

                        <span
                            className="relative block h-1 w-20 rounded-full my-6"
                            style={{ background: "linear-gradient(90deg, var(--color-green), var(--color-yellow))" }}
                        />

                        <p className="relative text-lg md:text-xl leading-relaxed text-white/75 max-w-xl">
                            {item.text}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------
   ABOUT US
------------------------------------------------------------------- */
const AboutUs = React.forwardRef((props, ref) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    return (
        <section
            ref={ref}
            className="bg-white text-black dark:bg-black dark:text-white overflow-hidden relative "
            style={{
                WebkitUserSelect: "none",
                userSelect: "none",
                WebkitTouchCallout: "none",
            }}
        >
            {/* HERO SECTION */}
            <div className="relative min-h-[70vh] flex items-center py-20">
                <div
                    className="absolute inset-0 -z-10"
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0.15), transparent 70%)" }}
                />

                <div className="max-w-5xl w-full mx-auto px-8 flex flex-col items-center text-center space-y-8 relative z-10">
                    {/* H1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 80, rotateX: 80 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
                        className="relative"
                        style={{ perspective: 1200 }}
                    >
                        <div className="hidden lg:block absolute -left-48 top-0 opacity-30">
                            <svg width="200" height="200" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary" />
                                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                            </svg>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            {HERO.h1Start}{" "}
                            <span className="text-primary inline-block">{HERO.h1Accent}</span>
                        </h1>

                        <motion.div className="absolute -bottom-3 left-0 right-0 h-0.5 overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-transparent via-primary to-transparent"
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "100%" }}
                                transition={{ duration: 2, delay: 0.6 }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* H2 */}
                    <motion.h2
                        initial={{ opacity: 0, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="font-serif text-2xl md:text-4xl font-semibold leading-snug max-w-3xl"
                    >
                        {HERO.h2}
                    </motion.h2>

                    {/* DESCRIPTION - single paragraph in a gradient-bordered panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full max-w-5xl p-px text-justify"
                        
                    >
                        <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-white dark:bg-neutral-950 px-6 py-8 md:px-12 md:py-10">
                            {/* soft glows */}
                            <span className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                            <span className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

                            <p className="relative text-lg md:text-xl leading-8 md:leading-9 text-black/75 dark:text-white/75">
                                At ScrollFuel, we believe digital marketing works best when it starts with understanding your business. Based in{" "}
                                <strong className="font-bold text-primary">Nagpur</strong>, we help businesses explore practical digital solutions based on their goals, audience, and industry. Whether you want to improve your{" "}
                                <strong className="font-semibold text-black dark:text-white">local search presence</strong>, build a{" "}
                                <strong className="font-semibold text-black dark:text-white">professional website</strong>, or reach customers in{" "}
                                <strong className="font-semibold text-black dark:text-white">new markets</strong>, our focus is on helping you create a stronger and more consistent digital presence.
                            </p>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Link
                            to={ABOUT_PATH}
                            onClick={() => window.scrollTo({ top: 0, left: 0 })}
                            className="group inline-flex items-center gap-3 bg-primary text-black font-bold text-lg px-8 py-3.5 rounded-full shadow-primary hover-shadow-primary transition-all duration-300 hover:scale-105"
                        >
                            {HERO.cta}
                            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* VISION & MISSION */}
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

            {/* WHY CHOOSE SCROLLFUEL */}
            <div className="max-w-7xl mx-auto px-8 py-20 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-extrabold leading-tight">
                        {WHY_CHOOSE.heading}
                    </h2>

                    <div className="flex items-center justify-center gap-4 mt-8" aria-hidden="true">
                        <motion.div
                            className="w-20 h-0.5 bg-primary origin-right"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                        <Rocket className="text-secondary" size={24} />
                        <motion.div
                            className="w-20 h-0.5 bg-secondary origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </motion.div>

                <WhyShowcase items={WHY_CHOOSE.items} />
            </div>
        </section>
    );
});

AboutUs.displayName = "AboutUs";

export default AboutUs;