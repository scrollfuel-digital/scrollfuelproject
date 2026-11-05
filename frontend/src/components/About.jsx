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