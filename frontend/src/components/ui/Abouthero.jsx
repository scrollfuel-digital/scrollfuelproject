import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import {
    Target,
    BarChart3,
    Megaphone,
    Rocket,
    Globe,
    Lightbulb,
    ArrowRight,
    Code2,
    Search,
    MapPin,
    MousePointerClick,
    PenLine,
    Share2,
} from 'lucide-react';

const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateY: 90 },
    visible: (custom) => ({
        opacity: 1, y: 0, rotateY: 0,
        transition: { duration: 0.5, delay: custom * 0.05, ease: "easeOut" }
    })
};

const floatVariants = {
    animate: (custom) => ({
        y: [0, custom.y || -20, 0],
        x: [0, custom.x || 10, 0],
        rotate: [0, custom.rotate || 5, 0],
        transition: { duration: custom.duration || 6, repeat: Infinity, ease: 'easeInOut', delay: custom.delay || 0 },
    }),
};

const backgroundIcons = [
    { Icon: Megaphone, color: 'text-primary', size: 80, x: 15, y: -20, rotate: 10, duration: 6, delay: 0, top: '15%', left: '10%' },
    { Icon: BarChart3, color: 'text-secondary', size: 100, x: -10, y: -25, rotate: -8, duration: 7, delay: 0.5, top: '12%', right: '15%' },
    { Icon: Target, color: 'text-primary', size: 90, x: 12, y: -18, rotate: 12, duration: 5.5, delay: 1, bottom: '25%', left: '8%' },
    { Icon: Rocket, color: 'text-secondary', size: 85, x: -12, y: -22, rotate: -10, duration: 6.5, delay: 1.5, top: '60%', right: '12%' },
    { Icon: Lightbulb, color: 'text-primary', size: 70, x: 10, y: -15, rotate: 8, duration: 7.5, delay: 2, bottom: '35%', right: '25%' },
    { Icon: Globe, color: 'text-secondary', size: 75, x: -15, y: -20, rotate: -12, duration: 6, delay: 2.5, top: '40%', left: '5%' },
];

const heroServices = [
    { icon: Share2, label: "Social Media Marketing" },
    { icon: Code2, label: "Website Development" },
    { icon: Search, label: "Branding, Graphic Design" },
    { icon: MousePointerClick, label: "SEO & PPC" },
    { icon: MapPin, label: "Videography and Photography" },
    { icon: PenLine, label: "Content Marketing" },

];

const titleText = "About Us";
const highlightWord = "Us";

const AboutHero = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Stable particles (no re-randomising on re-render)
    const particles = useMemo(
        () =>
            [...Array(14)].map((_, i) => ({
                size: Math.random() * 4 + 2,
                top: Math.random() * 100,
                left: Math.random() * 100,
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 5,
                color: i % 2 === 0 ? '#8bc53f' : '#ffc93b',
            })),
        []
    );

    return (
        <section className="relative min-h-screen overflow-hidden flex items-center">

            {/* Soft animated background glow */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'radial-gradient(circle at 0% 0%, rgba(139, 197, 63, 0.14) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, rgba(255, 201, 59, 0.14) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 100%, rgba(139, 197, 63, 0.14) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 0%, rgba(255, 201, 59, 0.14) 0%, transparent 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Faint grid */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--color-green) 1px, transparent 1px), linear-gradient(90deg, var(--color-green) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                }}
            />

            {/* Floating background icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                {backgroundIcons.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`absolute ${item.color} opacity-[0.12]`}
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                        custom={{ x: item.x, y: item.y, rotate: item.rotate, duration: item.duration, delay: item.delay }}
                        variants={floatVariants}
                        animate="animate"
                    >
                        <item.Icon size={item.size} strokeWidth={1.5} />
                    </motion.div>
                ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                            backgroundColor: p.color,
                        }}
                        animate={{ y: [0, -120, 0], opacity: [0, 0.7, 0], scale: [0, 1.8, 0] }}
                        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 lg:pt-32"
                style={{ y, opacity }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-14 lg:gap-20 items-center">

                    {/* LEFT */}
                    <div className="text-left">

                        <motion.div initial="hidden" animate="visible">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-black dark:text-white">
                                {titleText.split(' ').map((word, wordIndex) => (
                                    <span key={wordIndex} className="inline-block mr-4 md:mr-6">
                                        {word.split('').map((letter, letterIndex) => (
                                            <motion.span
                                                key={letterIndex}
                                                custom={wordIndex * 5 + letterIndex}
                                                variants={letterAnimation}
                                                className={word === highlightWord ? 'text-primary inline-block' : 'inline-block'}
                                            >
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </span>
                                ))}
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1 w-40 mt-6 mb-10 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, var(--color-green), var(--color-yellow), transparent)',
                                transformOrigin: 'left',
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-xl space-y-6 text-base md:text-lg leading-8 text-gray-700 dark:text-gray-300 text-left"
                        >
                            <p>
                                <span className="font-semibold text-black dark:text-white">ScrollFuel</span> is a top
                                digital marketing company in Nagpur helping businesses build a stronger online
                                presence through creative strategies, data-driven decisions, and practical digital
                                solutions.
                            </p>

                            <p>
                                Based in Nagpur, Maharashtra, we work with businesses that want to improve their
                                visibility, connect with the right audience, and grow in an increasingly competitive
                                digital world.
                            </p>

                            <p>
                                We understand that every business has different goals. Whether you are a local
                                business looking to reach more customers in Nagpur or a company targeting audiences
                                across India and international markets, our approach is built around your business
                                needs.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="mt-10 flex flex-wrap items-center gap-4"
                        >
                            <motion.button
                                onClick={() => navigate("/connect-with-us")}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="group relative px-8 py-4 bg-primary text-black font-semibold rounded-full overflow-hidden flex items-center gap-2 shadow-primary hover-shadow-primary transition-shadow duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-secondary"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* RIGHT: What we do */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                        className="relative w-full max-w-md mx-auto lg:max-w-none"
                    >
                        <div
                            className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-25 pointer-events-none"
                            style={{ background: 'radial-gradient(circle at 30% 20%, var(--color-green), transparent 60%), radial-gradient(circle at 80% 90%, var(--color-yellow), transparent 55%)' }}
                        />

                        <div className="absolute -top-6 -right-4 z-20 hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center bg-secondary text-black shadow-lg animate-float">
                            <Megaphone size={26} strokeWidth={1.8} />
                        </div>
                        <div
                            className="absolute -bottom-6 -left-4 z-20 hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center bg-primary text-black shadow-lg animate-float"
                            style={{ animationDelay: '1.2s' }}
                        >
                            <BarChart3 size={26} strokeWidth={1.8} />
                        </div>

                        <div className="relative z-10 rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-1">What we do</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-6">
                                Everything your business needs to be found, trusted and chosen online.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {heroServices.map(({ icon: Icon, label }, i) => (
                                    <motion.li
                                        key={label}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                                        className="group flex items-center gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 px-3.5 py-3 transition-colors duration-300 hover-border-primary"
                                    >
                                        <span className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[#8bc53f]/15 text-[#75ad32] dark:text-[#a8e063] transition-colors duration-300 group-hover:bg-[#8bc53f] group-hover:text-black">
                                            <Icon size={18} strokeWidth={1.9} />
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                                            {label}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin size={16} className="text-primary shrink-0" />
                                Based in Nagpur, Maharashtra. Serving India and international markets.
                            </div>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
};

export default AboutHero;