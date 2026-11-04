import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { pageSEO } from "../../data/seoData";
import SEO from "../../components/SEO";
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
            <SEO
                title={pageSEO.about.title}
                description={pageSEO.about.description}
                canonical={pageSEO.about.canonical}
            />
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

                            <h3 className="dark:text-white font-bold">Top Digital Marketing Company in Nagpur</h3>
                        </div>

                        {/* Description (from content doc) */}
                        <motion.div initial="hidden" animate="visible" className="text-center mb-12">
                            <motion.div
                                custom={0}
                                variants={textReveal}
                                className="md:text-lg dark:text-gray-300 max-w-3xl mx-auto leading-relaxed  space-y-4 text-justify"
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


                    {/* Right: Auto Vertical Scrolling Services */}

                    <div
                        ref={scrollRef}
                        className="h-[390px] overflow-y-auto
               scrollbar-hide"
                    >
                        <ul className="divide-y divide-black/10 dark:divide-white/10">

                            {services.map(({ icon: Icon, title, text }, index) => (
                                <li
                                    key={title}
                                    className="group flex gap-5 py-7 px-2 sm:px-4
                           transition-colors duration-300
                           hover:bg-primary/5"
                                >
                                    <span className="shrink-0 w-12 h-12 rounded-xl
                                 flex items-center justify-center
                                 border border-primary/40
                                 text-primary bg-primary/10
                                 group-hover:bg-primary
                                 group-hover:text-black">
                                        <Icon size={22} />
                                    </span>

                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold
                                   leading-snug mb-1.5
                                   group-hover:text-primary">
                                            {title}
                                        </h3>

                                        <p className="text-black/65 dark:text-white/65
                                  leading-relaxed max-w-xl">
                                            {text}
                                        </p>
                                    </div>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </section>

            {/* ============= BEYOND LOCAL + APPROACH (new styling) ============= */}

            <section className="relative overflow-hidden bg-[#f8f9f5] dark:bg-neutral-950 dark:text-white">

                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

                    {/* SECTION LABEL */}
                    <div className="flex items-center gap-3 mb-12">
                        <span className="w-10 h-[2px] bg-primary"></span>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                            Beyond Boundaries
                        </span>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="grid md:grid-cols-12 gap-10 md:gap-16">

                        {/* LEFT CONTENT */}
                        <div className="md:col-span-7">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight mb-8 max-w-3xl">
                                Helping Businesses Grow Beyond Local Markets
                            </h2>

                            <div className="max-w-2xl space-y-5">
                                <p className="text-base md:text-lg leading-[1.9] text-neutral-600 dark:text-neutral-300">
                                    While Nagpur is our home base, our digital marketing solutions are designed to serve businesses beyond our local market. We work to understand each client’s audience, industry, competition, and objectives before recommending a suitable strategy.
                                </p>

                                <p className="text-base md:text-lg leading-[1.9] text-neutral-600 dark:text-neutral-300">
                                    Our focus is on clear communication, relevant solutions, and continuous improvement rather than one-size-fits-all marketing packages.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="md:col-span-5">
                            <div className="relative p-7 md:p-9 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm">

                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                        How We Work
                                    </span>

                                   
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold mb-5">
                                    Our Approach
                                </h3>

                                <p className="text-base md:text-lg leading-[1.9] text-neutral-600 dark:text-neutral-300">
                                    At ScrollFuel, we believe effective digital marketing starts with understanding your business. We focus on practical planning, thoughtful execution, and measurable performance indicators so businesses can make informed decisions about their online growth.
                                </p>

                                <div className="mt-8 h-1 w-16 rounded-full bg-primary"></div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM STATEMENT */}
                <div className="border-t border-neutral-200 dark:border-white/15">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-9 md:py-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                            <p className="text-xl md:text-3xl lg:text-4xl font-semibold leading-snug max-w-4xl">
                                Let’s build your digital presence and grow your business with ScrollFuel.
                            </p>

                            <span className="hidden md:block text-primary text-5xl font-light">
                                ↗
                            </span>

                        </div>
                    </div>
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


            <section className="relative px-6 md:px-12 py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">

                <div className="max-w-7xl mx-auto">

                    {/* MAIN SPLIT LAYOUT */}
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-start">

                        {/* LEFT CONTENT */}
                        <div className="lg:sticky lg:top-28">

                            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-6">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                Why ScrollFuel
                            </span>

                            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.08] mb-6">
                                Why Choose
                                <span className="block text-primary mt-2">
                                    ScrollFuel?
                                </span>
                            </h2>

                            <h3 className="text-xl md:text-2xl font-semibold mb-6 leading-snug">
                                Digital Strategies Built Around Your Business Goals
                            </h3>

                            <p className="text-base md:text-lg leading-relaxed text-black/65 dark:text-white/65 mb-8 text-justify">
                                Choosing the right digital marketing partner is about more than
                                promoting your business online. It is about finding a team that
                                understands your goals, listens to your challenges, and helps
                                you identify the right opportunities for growth.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed text-black/65 dark:text-white/65 mb-10 text-justify">
                                At ScrollFuel, we combine creative thinking, practical strategy,
                                and digital expertise to help businesses strengthen their online
                                presence. Based in Nagpur, Maharashtra, we work with businesses
                                across India and international markets.
                            </p>

                        </div>


                        {/* RIGHT CONTENT - SIX FEATURES */}
                        <div className="relative">

                            <p className="font-semibold text-lg md:text-xl mb-8 leading-relaxed">
                                Here's what makes ScrollFuel a valuable partner for your digital journey:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">

                                {whyChoose.map((item, index) => (

                                    <div
                                        key={item.title}
                                        className="group relative z-0 hover:z-50"
                                    >

                                        {/* FEATURE CARD */}
                                        <div className="
                                relative min-h-[155px] p-6
                                border border-black/10 dark:border-white/10
                                bg-white dark:bg-neutral-900
                                rounded-2xl
                                transition-all duration-300
                                group-hover:border-primary
                                group-hover:shadow-xl
                                group-hover:shadow-primary/10
                                group-hover:-translate-y-1
                                cursor-pointer
                            ">

                                            {/* NUMBER AND ICON */}
                                            <div className="flex items-start justify-between gap-3 mb-5">

                                                <span className="text-sm font-bold text-primary tracking-wider">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <ArrowRight
                                                    size={18}
                                                    className="
                                            text-black/40 dark:text-white/40
                                            transition-all duration-300
                                            group-hover:text-primary
                                            group-hover:rotate-[-45deg]
                                        "
                                                />

                                            </div>

                                            {/* TITLE */}
                                            <h4 className="
                                    text-lg md:text-xl font-semibold leading-snug
                                    transition-colors duration-300
                                    group-hover:text-primary
                                ">
                                                {item.title}
                                            </h4>


                                            {/* POPUP - OPENS ABOVE THE CARD */}
                                            <div className="
                                    absolute z-[9999]
                                    left-0 right-0
                                    bottom-full mb-2
                                    p-5 rounded-xl

                                    bg-white dark:bg-neutral-800
                                    border border-primary/30
                                    shadow-2xl shadow-black/20

                                    opacity-0 invisible
                                    translate-y-2

                                    transition-all duration-300 ease-out

                                    group-hover:opacity-100
                                    group-hover:visible
                                    group-hover:translate-y-0

                                    pointer-events-none
                                ">

                                                <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                                                    {item.text}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>



                        </div>

                    </div>


                    {/* CTA SECTION */}
                    <div className="
            relative mt-24 rounded-3xl overflow-hidden
            bg-neutral-900
            text-white p-8 md:p-14
            grid lg:grid-cols-[1fr_auto]
            gap-8 items-center
        ">

                        {/* BACKGROUND EFFECT */}
                        <div className="
                absolute top-0 right-0
                w-72 h-72
                bg-primary/10
                blur-[100px]
                rounded-full
                pointer-events-none
            "></div>


                        {/* CTA TEXT */}
                        <div className="relative z-10 max-w-2xl">

                            <span className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 block">
                                Let's Build Something Great
                            </span>

                            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                                Let's Grow Your Business Together
                            </h3>

                            <p className="text-base md:text-lg leading-relaxed text-white/70 mb-5">
                                Whether you want to improve your Google visibility, build a
                                professional website, strengthen your brand, or explore new
                                digital marketing opportunities, ScrollFuel is ready to
                                understand your goals and discuss the right next steps.
                            </p>

                            <p className="font-semibold text-white">
                                Have a business goal in mind? Let's talk about our next move.
                            </p>

                        </div>


                        {/* CTA BUTTON */}
                        <div className="relative z-10">

                            <button
                                onClick={() => navigate("/connect-with-us")}
                                className="
                        group inline-flex items-center justify-center gap-3
                        px-8 py-4 rounded-full
                        bg-primary text-black font-semibold
                        hover:bg-secondary
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-primary/20
                        whitespace-nowrap
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-primary
                    "
                            >

                                Let's Discuss Your Goals

                                <ArrowRight
                                    size={18}
                                    className="
                            transition-transform duration-300
                            group-hover:translate-x-1
                        "
                                />

                            </button>

                        </div>

                    </div>

                </div>

            </section>


        </div>
    );
};

export default AboutUsPage;