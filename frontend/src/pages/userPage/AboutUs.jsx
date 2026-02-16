import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import {
    Target,
    Eye,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Users,
    Megaphone,
    Rocket,
    Zap,
    Globe,
    Lightbulb,
    ArrowRight,
    ArrowDown,
} from 'lucide-react';

// ============= ANIMATION VARIANTS =============

// Advanced text animation
const textReveal = {
    hidden: {
        opacity: 0,
        y: 100,
        rotateX: 90,
    },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            delay: custom * 0.1,
            ease: [0.25, 0.4, 0.25, 1],
        }
    })
};

// Letter-by-letter animation
const letterAnimation = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateY: 90,
    },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: {
            duration: 0.5,
            delay: custom * 0.05,
            ease: "easeOut",
        }
    })
};

// Floating icons
const floatVariants = {
    animate: (custom) => ({
        y: [0, custom.y || -20, 0],
        x: [0, custom.x || 10, 0],
        rotate: [0, custom.rotate || 5, 0],
        transition: {
            duration: custom.duration || 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: custom.delay || 0,
        },
    }),
};

// Card animations - slide from left
const slideFromLeft = {
    hidden: {
        opacity: 0,
        x: -200,
        rotate: -10,
    },
    visible: (custom) => ({
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
            duration: 0.8,
            delay: custom * 0.2,
            ease: [0.25, 0.4, 0.25, 1],
        }
    })
};

// Card animations - slide from right
const slideFromRight = {
    hidden: {
        opacity: 0,
        x: 200,
        rotate: 10,
    },
    visible: (custom) => ({
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
            duration: 0.8,
            delay: custom * 0.2,
            ease: [0.25, 0.4, 0.25, 1],
        }
    })
};

// Standard fade up
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
};

const AboutUsPage = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const navigate = useNavigate();

    // Background floating icons
    const backgroundIcons = [
        {
            Icon: Megaphone,
            color: 'text-primary',
            size: 80,
            x: 15,
            y: -20,
            rotate: 10,
            duration: 6,
            delay: 0,
            top: '15%',
            left: '10%',
        },
        {
            Icon: BarChart3,
            color: 'text-secondary',
            size: 100,
            x: -10,
            y: -25,
            rotate: -8,
            duration: 7,
            delay: 0.5,
            top: '12%',
            right: '15%',
        },
        {
            Icon: Target,
            color: 'text-primary',
            size: 90,
            x: 12,
            y: -18,
            rotate: 12,
            duration: 5.5,
            delay: 1,
            bottom: '25%',
            left: '8%',
        },
        {
            Icon: Rocket,
            color: 'text-secondary',
            size: 85,
            x: -12,
            y: -22,
            rotate: -10,
            duration: 6.5,
            delay: 1.5,
            top: '60%',
            right: '12%',
        },
        {
            Icon: Lightbulb,
            color: 'text-primary',
            size: 70,
            x: 10,
            y: -15,
            rotate: 8,
            duration: 7.5,
            delay: 2,
            bottom: '35%',
            right: '25%',
        },
        {
            Icon: Globe,
            color: 'text-secondary',
            size: 75,
            x: -15,
            y: -20,
            rotate: -12,
            duration: 6,
            delay: 2.5,
            top: '40%',
            left: '5%',
        },
    ];

    // Feature cards data
    const featureCards = [
        {
            icon: Zap,
            title: "Performance Driven",
            description: "Strategic execution designed to maximize speed, efficiency, and measurable impact",
            color: "primary",
            direction: "left",
        },
        {
            icon: TrendingUp,
            title: "Growth Focused",
            description: "Data-driven strategies that scale your business exponentially",
            color: "secondary",
            direction: "right",
        },
        {
            icon: ShieldCheck,
            title: "Proven Results",
            description: "Data-backed success metrics with transparent reporting",
            color: "primary",
            direction: "left",
        },
        {
            icon: Users,
            title: "Client-Centric",
            description: "Your success is our benchmark and priority",
            color: "secondary",
            direction: "right",
        },
    ];

    const titleText = "About us";
    const highlightWord = "us";

    return (
        <div className="bg-black text-white overflow-hidden">
            {/* ============= ENHANCED HERO SECTION ============= */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Animated Gradient Background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 0% 0%, rgba(139, 197, 63, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 100%, rgba(255, 201, 59, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 0% 100%, rgba(139, 197, 63, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 0%, rgba(255, 201, 59, 0.15) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,197,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,197,63,0.03)_1px,transparent_1px)] bg-size:[50px_50px]" />

                {/* Floating Icons */}
                <div className="absolute inset-0 overflow-hidden">
                    {backgroundIcons.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`absolute ${item.color} opacity-20`}
                            style={{
                                top: item.top,
                                left: item.left,
                                right: item.right,
                                bottom: item.bottom,
                            }}
                            custom={{
                                x: item.x,
                                y: item.y,
                                rotate: item.rotate,
                                duration: item.duration,
                                delay: item.delay,
                            }}
                            variants={floatVariants}
                            animate="animate"
                        >
                            <item.Icon size={item.size} strokeWidth={1.5} />
                        </motion.div>
                    ))}
                </div>

                {/* Animated Particles */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                backgroundColor: i % 2 === 0 ? '#8bc53f' : '#ffc93b',
                            }}
                            animate={{
                                y: [0, -150, 0],
                                opacity: [0, 0.8, 0],
                                scale: [0, 2, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <motion.div
                    className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center"
                    style={{ y, opacity, scale }}
                >
                    <div className="max-w-6xl mx-auto w-full">
                        {/* Animated Title */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                className="inline-block"
                            >
                                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                                    {titleText.split(' ').map((word, wordIndex) => (
                                        <span key={wordIndex} className="inline-block mr-6">
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

                            {/* Animated Underline */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-1 bg-linear-to-r from-primary via-secondary to-primary mx-auto"
                                style={{ width: '200px', transformOrigin: 'left' }}
                            />
                        </div>

                        {/* Animated Paragraph */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="text-center mb-12"
                        >
                            <motion.p
                                custom={0}
                                variants={textReveal}
                                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4"
                            >
                                Scrollfuel is a
                                growth-focused digital marketing Agency committed to helping businesses succeed online.
                                Our approach combines creativity, technology, and analytics to deliver measurable digital marketing results.
                            </motion.p>

                        </motion.div>

                        {/* CTA Buttons with Advanced Hover Effects */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-wrap justify-center gap-6 mb-20"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 197, 63, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-primary text-black font-semibold rounded-full overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => navigate("/contact")}
                                    className="relative z-10 flex items-center gap-2"
                                >
                                    Get Started
                                    <motion.span
                                        animate={{ y: [0, -6, 0, 6, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowDown size={20} />
                                    </motion.span>
                                </button>

                                <motion.div
                                    className="absolute inset-0 bg-secondary"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>

                        </motion.div>

                        {/* Feature Cards with Scroll Animation */}
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {featureCards.map((card, index) => {
                                const isPrimary = card.color === 'primary';
                                const slideVariant = card.direction === 'left' ? slideFromLeft : slideFromRight;

                                return (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-100px" }}
                                        variants={slideVariant}
                                        whileHover={{
                                            y: -10,
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                        className="group relative"
                                    >
                                        <div className={`relative p-8 rounded-2xl border-2 backdrop-blur-xl bg-black/60 overflow-hidden transition-all duration-500 ${isPrimary ? 'border-primary/30 hover:border-primary' : 'border-secondary/30 hover:border-secondary'
                                            }`}>
                                            {/* Gradient Background on Hover */}
                                            <motion.div
                                                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                                style={{
                                                    background: isPrimary
                                                        ? 'linear-gradient(135deg, rgba(139, 197, 63, 0.1) 0%, transparent 100%)'
                                                        : 'linear-gradient(135deg, rgba(255, 201, 59, 0.1) 0%, transparent 100%)'
                                                }}
                                            />

                                            {/* Animated Border Glow */}
                                            <motion.div
                                                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                                style={{
                                                    boxShadow: isPrimary
                                                        ? '0 0 40px rgba(139, 197, 63, 0.3)'
                                                        : '0 0 40px rgba(255, 201, 59, 0.3)'
                                                }}
                                            />

                                            <div className="relative z-10 flex items-start gap-4">
                                                <motion.div
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                    className={`p-3 rounded-xl ${isPrimary ? 'bg-primary/20' : 'bg-secondary/20'
                                                        }`}
                                                >
                                                    <card.icon
                                                        size={32}
                                                        className={isPrimary ? 'text-primary' : 'text-secondary'}
                                                    />
                                                </motion.div>

                                                <div className="flex-1">
                                                    <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isPrimary ? 'text-white group-hover:text-primary' : 'text-white group-hover:text-secondary'
                                                        }`}>
                                                        {card.title}
                                                    </h3>
                                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                                        {card.description}
                                                    </p>
                                                </div>

                                                {/* Arrow Icon */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
                                                    className={isPrimary ? 'text-primary' : 'text-secondary'}
                                                >
                                                    <ArrowRight size={24} />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
                        <motion.path
                            d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z"
                            fill="#8bc53f"
                            opacity="0.15"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M0,70 Q300,20 600,70 T1200,70 L1200,120 L0,120 Z"
                            fill="#ffc93b"
                            opacity="0.1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                        />
                    </svg>
                </div>
            </section>

            {/* ============= VISION & MISSION SECTION ============= */}
            <section className="py-24 px-6 bg-black relative overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                        {/* Vision Card */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ scale: 1.04 }}
                            className="group relative"
                        >
                            <div className="relative p-10 rounded-3xl border border-primary/30 backdrop-blur-xl bg-white/5 
                            shadow-[0_0_0px_rgba(0,0,0,0)] 
                            transition-all duration-500 
                            group-hover:shadow-[0_0_80px_rgba(139,197,63,0.35)]
                            group-hover:border-primary">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl" />
                                <div className="relative z-10">
                                    <TrendingUp
                                        size={52}
                                        className="text-primary mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
                                    />
                                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 transition-colors duration-500 group-hover:text-primary">
                                        Our Vision
                                    </h2>
                                    <p className="text-white/70 text-lg leading-relaxed transition-colors duration-500 group-hover:text-white">
                                        To lead digital transformation by helping brands scale faster,
                                        dominate their markets, and achieve sustainable online growth
                                        through innovation, data, and strategic marketing.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ scale: 1.04 }}
                            className="group relative"
                        >
                            <div className="relative p-10 rounded-3xl border border-secondary/30 backdrop-blur-xl bg-white/5 
                            transition-all duration-500
                            group-hover:shadow-[0_0_80px_rgba(255,201,59,0.35)]
                            group-hover:border-secondary">
                                <div className="absolute inset-0 bg-linear-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl" />
                                <div className="relative z-10">
                                    <Rocket
                                        size={52}
                                        className="text-secondary mb-6 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6"
                                    />
                                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 transition-colors duration-500 group-hover:text-secondary">
                                        Our Mission
                                    </h2>
                                    <p className="text-white/70 text-lg leading-relaxed transition-colors duration-500 group-hover:text-white">
                                        To lead digital transformation by helping brands scale faster, dominate markets, and achieve sustainable growth through innovation, data, and strategy.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============= VALUES SECTION ============= */}
            <section className="py-20 px-6 bg-black">
                <div className="container mx-auto max-w-7xl">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-semibold text-center mb-16"
                    >
                        Our Digital Marketing <span className="text-primary">Values</span>
                    </motion.h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Performance-Driven",
                                text: "Driving growth with data-led strategies.",
                                color: "primary",
                            },
                            {
                                icon: BarChart3,
                                title: "ROI-Driven Marketing",
                                text: "Every decision is tied to business impact.",
                                color: "secondary",
                            },
                            {
                                icon: TrendingUp,
                                title: "Optimization",
                                text: "We test, learn, and improve constantly.",
                                color: "primary",
                            },
                            {
                                icon: Users,
                                title: "Client-First Growth",
                                text: "Success driven by your outcomes.",
                                color: "secondary",
                            },
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
                                        className={`relative z-10 rounded-2xl backdrop-blur-xl border p-8 text-center transition-all duration-500 overflow-hidden ${isPrimary ? "border-primary" : "border-secondary"
                                            }`}
                                        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                                    >
                                        <div
                                            className={`absolute left-0 w-full z-0 transition-all duration-700 ease-in-out ${index % 2 === 0
                                                ? "bottom-0 h-0 group-hover:h-full"
                                                : "top-0 h-0 group-hover:h-full"
                                                }`}
                                            style={{
                                                backgroundColor: isPrimary ? "#8bc53f" : "#ffc93b",
                                            }}
                                        />

                                        <div className="relative z-10">
                                            <item.icon
                                                size={48}
                                                className={`mx-auto mb-5 transition-all duration-500 ${isPrimary
                                                    ? "text-primary group-hover:text-white group-hover:scale-125"
                                                    : "text-secondary group-hover:text-black group-hover:scale-125"
                                                    }`}
                                            />

                                            <h3
                                                className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isPrimary
                                                    ? "text-primary group-hover:text-white"
                                                    : "text-secondary group-hover:text-black"
                                                    }`}
                                            >
                                                {item.title}
                                            </h3>

                                            <p
                                                className={`transition-colors duration-500 ${isPrimary
                                                    ? "text-white/80 group-hover:text-white"
                                                    : "text-white/80 group-hover:text-black"
                                                    }`}
                                            >
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