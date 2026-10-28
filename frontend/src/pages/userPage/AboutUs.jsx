import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { pageSEO } from "../../data/seoData";
import {
    Target,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Users,
    Megaphone,
    Rocket,
    Globe,
    Lightbulb,
    ArrowRight,
    ArrowDown,
    Linkedin,
    Instagram,
    Mail,
    Star,
    Code2,
    Search,
    MapPin,
    MousePointerClick,
    PenLine,
    Share2,
    Palette
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

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
};

// ============= FOUNDER CARD COMPONENT (unchanged) =============

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
        { Icon: Linkedin, href: "#", color: "#8bc53f" },
        { Icon: Instagram, href: "#", color: "#8bc53f" },
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
                                    style={{
                                        background: 'conic-gradient(from 0deg, #8bc53f, #ffc93b, #8bc53f)',
                                        padding: '2px'
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                >
                                    <div className="w-full h-full rounded-full bg-black" />
                                </motion.div>

                                {/* Pulse ring */}
                                <motion.div
                                    className="absolute -inset-6 rounded-full border border-primary/30"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />

                                {/* Avatar */}
                                <div
                                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-black"
                                    style={{
                                        background: 'linear-gradient(135deg, #8bc53f22, #ffc93b22)'
                                    }}
                                >
                                    {/* Founder Image */}
                                    <img
                                        src="/assets/founderimage.jpeg" // 👉 Put image inside public folder
                                        alt="Akshay Zade"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            const fallback = e.target.nextSibling;
                                            if (fallback) fallback.style.display = "flex";
                                        }}
                                    />

                                    {/* Fallback Initials */}
                                    <div
                                        className="w-full h-full items-center justify-center hidden"
                                        style={{
                                            background: 'linear-gradient(135deg, #0a1a0a 0%, #1a2a0a 50%, #0a1a0a 100%)'
                                        }}
                                    >
                                        <motion.div
                                            className="text-5xl font-black"
                                            style={{ color: '#8bc53f', fontFamily: 'serif' }}
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        >
                                            AZ
                                        </motion.div>
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
                                        whileHover={{
                                            scale: 1.2,
                                            y: -4,
                                            backgroundColor: color
                                        }}
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
                                style={{
                                    borderColor: 'rgba(255,201,59,0.4)',
                                    color: '#ffc93b',
                                    backgroundColor: 'rgba(255,201,59,0.08)'
                                }}
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
                                ))}{" "}
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

                            {/* Underline */}
                            <motion.div
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="h-0.5 mb-6 rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, #8bc53f, #ffc93b, transparent)',
                                    width: '200px'
                                }}
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
                                transforming brands from zero to market leaders.
                            </motion.p>

                            {/* Skills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap gap-2 justify-center lg:justify-start"
                            >
                                {skills.map((skill, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 + i * 0.08 }}
                                        className="px-3 py-1.5 rounded-full text-sm border"
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

// ============= PAGE =============

const AboutUsPage = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const navigate = useNavigate();

    useEffect(() => {
        const seo = pageSEO.about;

        document.title = seo.title;

        let description = document.querySelector(
            'meta[name="description"]'
        );

        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }

        description.setAttribute("content", seo.description);

        let canonical = document.querySelector(
            'link[rel="canonical"]'
        );

        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }

        canonical.setAttribute("href", seo.canonical);
    }, []);


    const backgroundIcons = [
        { Icon: Megaphone, color: 'text-primary', size: 80, x: 15, y: -20, rotate: 10, duration: 6, delay: 0, top: '15%', left: '10%' },
        { Icon: BarChart3, color: 'text-secondary', size: 100, x: -10, y: -25, rotate: -8, duration: 7, delay: 0.5, top: '12%', right: '15%' },
        { Icon: Target, color: 'text-primary', size: 90, x: 12, y: -18, rotate: 12, duration: 5.5, delay: 1, bottom: '25%', left: '8%' },
        { Icon: Rocket, color: 'text-secondary', size: 85, x: -12, y: -22, rotate: -10, duration: 6.5, delay: 1.5, top: '60%', right: '12%' },
        { Icon: Lightbulb, color: 'text-primary', size: 70, x: 10, y: -15, rotate: 8, duration: 7.5, delay: 2, bottom: '35%', right: '25%' },
        { Icon: Globe, color: 'text-secondary', size: 75, x: -15, y: -20, rotate: -12, duration: 6, delay: 2.5, top: '40%', left: '5%' },
    ];

    const titleText = "About Us";
    const highlightWord = "Us";

    // ---- Services (from content doc) ----
    const services = [
        {
            icon: Search,
            title: "Search Engine Optimization (SEO)",
            text: "Improve organic visibility and help potential customers discover your business online.",
        },
        {
            icon: MapPin,
            title: "Local SEO",
            text: "Strengthen your presence in local search results and help customers find your business in Nagpur and nearby areas.",
        },
        {
            icon: MousePointerClick,
            title: "SEO and PPC Services",
            text: "Combine organic search strategies with paid advertising to reach relevant audiences.",
        },
        {
            icon: PenLine,
            title: "Content Marketing",
            text: "Create useful, audience-focused content that builds trust and supports your marketing goals.",
        },
        {
            icon: Share2,
            title: "Social Media Marketing",
            text: "Build brand awareness and engage with customers across relevant social platforms.",
        },
        {
            icon: Code2,
            title: "Website Development",
            text: "Create responsive, user-friendly websites that communicate your brand and support business objectives.",
        },
        {
            icon: Palette,
            title: "Branding, Graphic Design, Videography and Photography",
            text: "Develop consistent brand visuals and engaging creative content.",
        },
    ];

    // ---- Why choose (from content doc) ----
    const whyChoose = [
        {
            title: "Strategies Tailored to Your Business",
            text: "Every business has different needs. We focus on your audience, industry, and objectives to recommend digital marketing solutions that fit your requirements.",
        },
        {
            title: "A Focus on Search Visibility",
            text: "From SEO and Local SEO to AEO and GEO, we help businesses work towards better visibility across relevant search experiences and connect with people looking for their products or services.",
        },
        {
            title: "Creative Ideas With a Clear Purpose",
            text: "Our approach brings together content marketing, social media, website development, branding, and visual storytelling to create a consistent online presence for your business.",
        },
        {
            title: "Local Understanding, Wider Reach",
            text: "As a digital marketing company in Nagpur, we understand the importance of reaching the right local audience. Our services can also support businesses looking to expand their reach beyond their city and target broader markets.",
        },
        {
            title: "Clear Communication and Practical Recommendations",
            text: "We believe good partnerships begin with honest conversations. We aim to explain our recommendations clearly, help you understand the work involved, and focus on meaningful performance indicators.",
        },
        {
            title: "A Long-Term Approach to Digital Growth",
            text: "Sustainable online growth takes time, consistency, and continuous improvement. We focus on building a strong digital foundation that can evolve as your business and customer needs change.",
        },
    ];

    return (
        <div className="bg-white dark:bg-black dark:text-white overflow-hidden ">
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
                            className={`absolute ${item.color} opacity-50`}
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
                                <h1 className="text-3xl md:text-5xl font-bold mb-6">
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

                            <h3 className="text-white font-bold">Top Digital Marketing Company in Nagpur</h3>
                        </div>

                        {/* Description (from content doc) */}
                        <motion.div initial="hidden" animate="visible" className="text-center mb-12">
                            <motion.div
                                custom={0}
                                variants={textReveal}
                                className="md:text-lg dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-start space-y-4"
                            >
                                <p>
                                    <b>ScrollFuel</b> is a digital marketing company in Nagpur helping businesses build a stronger online presence through creative strategies, data-driven decisions, and practical digital solutions. Based in Nagpur, Maharashtra, we work with businesses that want to improve their visibility, connect with the right audience, and grow in an increasingly competitive digital world.
                                </p>
                                <p>
                                    We understand that every business has different goals. Whether you are a local business looking to reach more customers in Nagpur or a company targeting audiences across India and international markets, our approach is built around your business needs.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-wrap justify-center gap-6 mb-20"
                        >
                            <motion.button
                                onClick={() => navigate("/connect-with-us")}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 197, 63, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-primary text-black font-semibold rounded-full overflow-hidden transition-all duration-300 flex items-center gap-2"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <motion.span
                                        animate={{ y: [0, -6, 0, 6, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowDown size={20} />
                                    </motion.span>
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


            {/* ============= SERVICES (new styling) ============= */}
            <section className="px-6 md:px-12 py-20 md:py-28 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20">

                    {/* Left: sticky intro */}
                    <div className="lg:sticky lg:top-28 self-start">
                        <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
                            Our Digital Marketing Services
                        </h2>
                        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-secondary mb-6" />
                        <p className="text-lg leading-relaxed text-black/70 dark:text-white/70 max-w-md">
                            At ScrollFuel, we offer a range of digital solutions to support businesses at different stages of growth, including:
                        </p>
                    </div>

                    {/* Right: service rows */}
                    <ul className="divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
                        {services.map(({ icon: Icon, title, text }) => (
                            <li
                                key={title}
                                className="group flex gap-5 py-7 px-2 sm:px-4 transition-colors duration-300 hover:bg-primary/5"
                            >
                                <span className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/40 text-primary bg-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:text-black">
                                    <Icon size={22} />
                                </span>
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold leading-snug mb-1.5 transition-colors duration-300 group-hover:text-primary">
                                        {title}
                                    </h3>
                                    <p className="text-black/65 dark:text-white/65 leading-relaxed max-w-xl">
                                        {text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ============= BEYOND LOCAL + APPROACH (new styling) ============= */}
            <section className="bg-primary text-black">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24 grid md:grid-cols-2 gap-12 md:gap-0">

                    <div className="md:pr-12 lg:pr-20">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                            Helping Businesses Grow Beyond Local Markets
                        </h2>
                        <p className="text-lg leading-relaxed text-black/80 mb-4">
                            While Nagpur is our home base, our digital marketing solutions are designed to serve businesses beyond our local market. We work to understand each client’s audience, industry, competition, and objectives before recommending a suitable strategy.
                        </p>
                        <p className="text-lg leading-relaxed text-black/80">
                            Our focus is on clear communication, relevant solutions, and continuous improvement rather than one-size-fits-all marketing packages.
                        </p>
                    </div>

                    <div className="md:pl-12 lg:pl-20 md:border-l-2 md:border-black/25">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                            Our Approach
                        </h2>
                        <p className="text-lg leading-relaxed text-black/80">
                            At ScrollFuel, we believe effective digital marketing starts with understanding your business. We focus on practical planning, thoughtful execution, and measurable performance indicators so businesses can make informed decisions about their online growth.
                        </p>
                    </div>
                </div>

                <div className="border-t-2 border-black/25">
                    <p className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-xl md:text-3xl font-semibold leading-snug">
                        Let’s build your digital presence and grow your business with ScrollFuel.
                    </p>
                </div>
            </section>

            {/* ============= FOUNDER SECTION (unchanged) ============= */}
            <section className="py-10 px-6 bg-white text-black dark:bg-black relative overflow-hidden">
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
                                    className="inline-block dark:text-gray-300"
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
                            {"Fuel".split('').map((char, i) => (
                                <motion.span key={i} custom={26 + i} variants={letterAnimation} className="inline-block dark:text-white">
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="dark:text-white text-lg max-w-2xl mx-auto"
                        >
                            Driven by passion, powered by data — meet the Founder shaping the future of digital growth.
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

            {/* ============= WHY CHOOSE SCROLLFUEL (new styling) ============= */}
            <section className="px-6 md:px-12 py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
                <div className="max-w-7xl mx-auto">

                    <div className="max-w-3xl mb-14">
                        <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-4">
                            Why Choose ScrollFuel?
                        </h2>
                        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                            Digital Strategies Built Around Your Business Goals
                        </h3>
                        <div className="space-y-4 text-lg leading-relaxed text-black/70 dark:text-white/70">
                            <p>
                                Choosing the right digital marketing partner is about more than promoting your business online. It is about finding a team that understands your goals, listens to your challenges, and helps you identify the right opportunities for growth.
                            </p>
                            <p>
                                At ScrollFuel, we combine creative thinking, practical strategy, and digital expertise to help businesses strengthen their online presence. Based in Nagpur, Maharashtra, we work with businesses looking to improve local visibility as well as reach customers across India and international markets.
                            </p>
                        </div>
                    </div>

                    <p className="font-semibold text-lg md:text-xl mb-8 border-l-4 border-secondary pl-4">
                        Here’s what makes ScrollFuel a valuable partner for your digital journey:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                        {whyChoose.map((item) => (
                            <div key={item.title} className="group border-t-2 border-black/15 dark:border-white/15 pt-6 relative">
                                <span className="absolute -top-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                                <h4 className="text-xl font-semibold leading-snug mb-3 transition-colors duration-300 group-hover:text-primary">
                                    {item.title}
                                </h4>
                                <p className="text-black/65 dark:text-white/65 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA block */}
                    <div className="mt-20 rounded-3xl border border-primary/40 bg-white dark:bg-black p-8 md:p-14 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                                Let’s Grow Your Business Together
                            </h3>
                            <p className="text-lg leading-relaxed text-black/70 dark:text-white/70 mb-4">
                                Whether you want to improve your Google visibility, build a professional website, strengthen your brand, or explore new digital marketing opportunities, ScrollFuel is ready to understand your goals and discuss the right next steps.
                            </p>
                            <p className="font-semibold text-lg">
                                Have a business goal in mind? Let’s talk about how ScrollFuel can help you move forward.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/connect-with-us")}
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-semibold transition-colors duration-300 hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Let’s Discuss Your Business Goals
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;