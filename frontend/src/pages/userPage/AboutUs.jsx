

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
    Linkedin,
    Twitter,
    Instagram,
    Mail,
    Star,
    Award,
    Briefcase,
    Code2,
} from 'lucide-react';

// ============= ANIMATION VARIANTS =============

const textReveal = {
    hidden: { opacity: 0, y: 100, rotateX: 90 },
    visible: (custom) => ({
        opacity: 1, y: 0, rotateX: 0,
        transition: { duration: 0.8, delay: custom * 0.1, ease: [0.25, 0.4, 0.25, 1] }
    })
};

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

const slideFromLeft = {
    hidden: { opacity: 0, x: -200, rotate: -10 },
    visible: (custom) => ({
        opacity: 1, x: 0, rotate: 0,
        transition: { duration: 0.8, delay: custom * 0.2, ease: [0.25, 0.4, 0.25, 1] }
    })
};

const slideFromRight = {
    hidden: { opacity: 0, x: 200, rotate: 10 },
    visible: (custom) => ({
        opacity: 1, x: 0, rotate: 0,
        transition: { duration: 0.8, delay: custom * 0.2, ease: [0.25, 0.4, 0.25, 1] }
    })
};

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
};

// ============= FOUNDER CARD COMPONENT =============

const FounderCard = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        setMousePos({ x, y });
    };

    const skills = ["Performance Marketing", "SEO & Growth", "Brand Strategy", "Analytics & Data", "Social Media", "Paid Ads"];

    const socials = [
        { Icon: Linkedin, href: "#", color: "#0077B5" },
        { Icon: Instagram, href: "#", color: "#E1306C" },
        { Icon: Mail, href: "#", color: "#8bc53f" },
    ];

    return (
        <div className="relative max-w-5xl mx-auto">
            {/* Glowing orbs background */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #8bc53f, transparent)' }} />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #ffc93b, transparent)' }} />

            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
                animate={{
                    rotateY: isHovered ? mousePos.x * 0.5 : 0,
                    rotateX: isHovered ? mousePos.y * 0.5 : 0,
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="relative rounded-3xl border border-white/10 backdrop-blur-2xl overflow-hidden"
                whileHover={{ borderColor: 'rgba(139,197,63,0.4)' }}
            // transition={{ duration: 0.3 }}
            >
                {/* Card Background */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(139,197,63,0.05) 0%, rgba(0,0,0,0.8) 50%, rgba(255,201,59,0.05) 100%)' }} />

                {/* Animated grid lines */}
                <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'linear-gradient(rgba(139,197,63,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,197,63,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 p-8 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">

                        {/* LEFT: Avatar & Social */}
                        <div className="flex flex-col items-center gap-6 shrink-0">
                            {/* Avatar container */}
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Rotating ring */}
                                <motion.div
                                    className="absolute -inset-3 rounded-full"
                                    style={{ background: 'conic-gradient(from 0deg, #8bc53f, #ffc93b, #8bc53f)', padding: '2px' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                >
                                    <div className="w-full h-full rounded-full bg-black" />
                                </motion.div>

                                {/* Second pulse ring */}
                                <motion.div
                                    className="absolute -inset-6 rounded-full border border-primary/30"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />

                                {/* Avatar */}
                                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-black"
                                    style={{ background: 'linear-gradient(135deg, #8bc53f22, #ffc93b22)' }}>
                                    {/* Initials fallback with premium design */}
                                    <div className="w-full h-full flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #0a1a0a 0%, #1a2a0a 50%, #0a1a0a 100%)' }}>
                                        <div className="text-center">
                                            <motion.div
                                                className="text-5xl font-black"
                                                style={{ color: '#8bc53f', fontFamily: 'serif', lineHeight: 1 }}
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                            >
                                                AZ
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                              
                            </motion.div>

                            {/* Social Links */}
                            <div className="flex gap-3 mt-20">
                                {socials.map(({ Icon, href, color }, i) => (
                                    <motion.a
                                        key={i}
                                        href={href}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                        whileHover={{ scale: 1.2, y: -4, backgroundColor: color }}
                                        className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300"
                                        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                ))}
                            </div>

                        </div>

                        {/* RIGHT: Info */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Tag */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
                                style={{ borderColor: 'rgba(255,201,59,0.4)', color: '#ffc93b', backgroundColor: 'rgba(255,201,59,0.08)' }}
                            >
                                <Star size={12} fill="currentColor" />
                                Founder
                            </motion.div>

                            {/* Name */}
                            <motion.h3
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black mb-2 leading-none"
                            >
                                {"Akshay".split('').map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterAnimation}
                                        className="inline-block text-white"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                                {" "}
                                {"Zade".split('').map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        custom={6 + i}
                                        variants={letterAnimation}
                                        className="inline-block text-primary"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.h3>

                            {/* Animated underline */}
                            <motion.div
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                                className="h-0.5 mb-6 rounded-full"
                                style={{ background: 'linear-gradient(90deg, #8bc53f, #ffc93b, transparent)', width: '200px' }}
                            />

                            {/* Bio */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                className="text-white/70 text-lg leading-relaxed mb-6"
                            >
                                A visionary digital marketer and growth hacker with over{" "}
                                <span className="text-primary font-semibold">5+ years</span> of experience
                                transforming brands from zero to market leaders. Akshay co-founded Scrollfuel with
                                a mission to make{" "}
                                <span className="text-secondary font-semibold">data-driven marketing</span>{" "}
                                accessible to every ambitious business, combining strategic creativity with
                                relentless performance optimization.
                            </motion.p>

                            {/* Skills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="flex flex-wrap gap-2 justify-center lg:justify-start"
                            >
                                {skills.map((skill, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
                                        whileHover={{
                                            scale: 1.08,
                                            backgroundColor: 'rgba(139,197,63,0.2)',
                                            borderColor: 'rgba(139,197,63,0.7)',
                                            color: '#8bc53f'
                                        }}
                                        className="px-3 py-1.5 rounded-full text-sm border transition-all duration-300 cursor-default"
                                        style={{
                                            borderColor: 'rgba(255,255,255,0.1)',
                                            backgroundColor: 'rgba(255,255,255,0.04)',
                                            color: 'rgba(255,255,255,0.6)'
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative bar */}
                <motion.div
                    className="h-1 w-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #8bc53f, #ffc93b, #8bc53f, transparent)' }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>
        </div>
    );
};

const AboutUsPage = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const navigate = useNavigate();

    const backgroundIcons = [
        { Icon: Megaphone, color: 'text-primary', size: 80, x: 15, y: -20, rotate: 10, duration: 6, delay: 0, top: '15%', left: '10%' },
        { Icon: BarChart3, color: 'text-secondary', size: 100, x: -10, y: -25, rotate: -8, duration: 7, delay: 0.5, top: '12%', right: '15%' },
        { Icon: Target, color: 'text-primary', size: 90, x: 12, y: -18, rotate: 12, duration: 5.5, delay: 1, bottom: '25%', left: '8%' },
        { Icon: Rocket, color: 'text-secondary', size: 85, x: -12, y: -22, rotate: -10, duration: 6.5, delay: 1.5, top: '60%', right: '12%' },
        { Icon: Lightbulb, color: 'text-primary', size: 70, x: 10, y: -15, rotate: 8, duration: 7.5, delay: 2, bottom: '35%', right: '25%' },
        { Icon: Globe, color: 'text-secondary', size: 75, x: -15, y: -20, rotate: -12, duration: 6, delay: 2.5, top: '40%', left: '5%' },
    ];

    const featureCards = [
        { icon: Zap, title: "Performance Driven", description: "Strategic execution designed to maximize speed, efficiency, and measurable impact", color: "primary", direction: "left" },
        { icon: TrendingUp, title: "Growth Focused", description: "Data-driven strategies that scale your business exponentially", color: "secondary", direction: "right" },
        { icon: ShieldCheck, title: "Proven Results", description: "Data-backed success metrics with transparent reporting", color: "primary", direction: "left" },
        { icon: Users, title: "Client-Centric", description: "Your success is our benchmark and priority", color: "secondary", direction: "right" },
    ];

    const titleText = "About us";
    const highlightWord = "us";

    return (
        <div className="bg-black text-white overflow-hidden">
            {/* ============= HERO SECTION ============= */}
            <section className="relative min-h-screen overflow-hidden">
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
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,197,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,197,63,0.03)_1px,transparent_1px)] bg-size:[50px_50px]" />

                <div className="absolute inset-0 overflow-hidden">
                    {backgroundIcons.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`absolute ${item.color} opacity-20`}
                            style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                            custom={{ x: item.x, y: item.y, rotate: item.rotate, duration: item.duration, delay: item.delay }}
                            variants={floatVariants}
                            animate="animate"
                        >
                            <item.Icon size={item.size} strokeWidth={1.5} />
                        </motion.div>
                    ))}
                </div>

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
                            animate={{ y: [0, -150, 0], opacity: [0, 0.8, 0], scale: [0, 2, 0] }}
                            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5, ease: 'easeInOut' }}
                        />
                    ))}
                </div>

                <motion.div
                    className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center"
                    style={{ y, opacity, scale }}
                >
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="text-center mb-8">
                            <motion.div initial="hidden" animate="visible" className="inline-block">
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
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-1 bg-linear-to-r from-primary via-secondary to-primary mx-auto"
                                style={{ width: '200px', transformOrigin: 'left' }}
                            />
                        </div>

                        <motion.div initial="hidden" animate="visible" className="text-center mb-12">
                            <motion.p
                                custom={0}
                                variants={textReveal}
                                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4"
                            >
                                Scrollfuel is a growth-focused digital marketing Agency committed to helping businesses succeed online.
                                Our approach combines creativity, technology, and analytics to deliver measurable digital marketing results.
                            </motion.p>
                        </motion.div>

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
                                <button onClick={() => navigate("/contact")} className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <motion.span animate={{ y: [0, -6, 0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
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

                    </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
                        <motion.path d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z" fill="#8bc53f" opacity="0.15"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
                        <motion.path d="M0,70 Q300,20 600,70 T1200,70 L1200,120 L0,120 Z" fill="#ffc93b" opacity="0.1"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }} />
                    </svg>
                </div>
            </section>


            {/* ============= FOUNDER SECTION ============= */}
            <section className="py-10 px-6 bg-black relative overflow-hidden">
                {/* Section background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(139,197,63,0.04) 0%, transparent 70%)' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Floating particles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${10 + Math.random() * 80}%`,
                                backgroundColor: i % 2 === 0 ? '#8bc53f' : '#ffc93b',
                            }}
                            animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                        />
                    ))}
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        {/* <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
                            style={{ borderColor: 'rgba(139,197,63,0.4)', color: '#8bc53f', backgroundColor: 'rgba(139,197,63,0.08)' }}
                        >
                            <Users size={12} />
                            Meet The Team
                        </motion.div> */}

                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black mb-4"
                        >
                            {"The Mind Behind ".split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterAnimation}
                                    className="inline-block text-white"
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                            <br />
                            {"Scroll".split('').map((char, i) => (
                                <motion.span key={i} custom={20 + i} variants={letterAnimation} className="inline-block text-primary">
                                    {char}
                                </motion.span>
                            ))}
                            {"fuel".split('').map((char, i) => (
                                <motion.span key={i} custom={26 + i} variants={letterAnimation} className="inline-block text-white">
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-white/50 text-lg max-w-2xl mx-auto"
                        >
                            Driven by passion, powered by data — meet the co-founder shaping the future of digital growth.
                        </motion.p>

                        {/* Animated divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                            className="h-px max-w-xs mx-auto mt-6"
                            style={{ background: 'linear-gradient(90deg, transparent, #8bc53f, #ffc93b, #8bc53f, transparent)' }}
                        />
                    </div>

                    {/* Founder Card */}
                    <FounderCard />

                    {/* Bottom quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center mt-16 max-w-2xl mx-auto"
                    >
                        {/* <div className="text-4xl text-primary/40 font-serif leading-none mb-2">"</div> */}
                        {/* <p className="text-white/60 text-xl italic leading-relaxed">
                            Every brand has a story worth telling. At Scrollfuel, we make sure the world hears it — loud, clear, and at scale.
                        </p> */}
                        {/* <div className="text-4xl text-primary/40 font-serif leading-none mt-2 text-right">"</div> */}
                        <motion.p
                            className="text-primary font-semibold mt-4"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            — Akshay Zade, Founder
                        </motion.p>
                    </motion.div>
                </div>
            </section>
            {/* ============= VISION & MISSION SECTION ============= */}
            {/* <section className="py-24 px-6 bg-black relative overflow-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            transition={{ duration: 0.8 }} whileHover={{ scale: 1.04 }} className="group relative"
                        >
                            <div className="relative p-10 rounded-3xl border border-primary/30 backdrop-blur-xl bg-white/5 shadow-[0_0_0px_rgba(0,0,0,0)] transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(139,197,63,0.35)] group-hover:border-primary">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl" />
                                <div className="relative z-10">
                                    <TrendingUp size={52} className="text-primary mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />
                                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 transition-colors duration-500 group-hover:text-primary">Our Vision</h2>
                                    <p className="text-white/70 text-lg leading-relaxed transition-colors duration-500 group-hover:text-white">
                                        To lead digital transformation by helping brands scale faster, dominate their markets, and achieve sustainable online growth through innovation, data, and strategic marketing.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }} whileHover={{ scale: 1.04 }} className="group relative"
                        >
                            <div className="relative p-10 rounded-3xl border border-secondary/30 backdrop-blur-xl bg-white/5 transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(255,201,59,0.35)] group-hover:border-secondary">
                                <div className="absolute inset-0 bg-linear-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl" />
                                <div className="relative z-10">
                                    <Rocket size={52} className="text-secondary mb-6 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6" />
                                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 transition-colors duration-500 group-hover:text-secondary">Our Mission</h2>
                                    <p className="text-white/70 text-lg leading-relaxed transition-colors duration-500 group-hover:text-white">
                                        To lead digital transformation by helping brands scale faster, dominate markets, and achieve sustainable growth through innovation, data, and strategy.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section> */}


            {/* ============= VALUES SECTION ============= */}
            <section className="py-10 px-6 bg-black">
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