import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail, Star } from 'lucide-react';

const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateY: 90 },
    visible: (custom) => ({
        opacity: 1, y: 0, rotateY: 0,
        transition: { duration: 0.5, delay: custom * 0.05, ease: "easeOut" }
    })
};

// ============= FOUNDER CARD =============

const FounderCard = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        setMousePos({ x, y });
    };

    const skills = ["SEO & Growth", "Performance Marketing", "Brand Strategy", "Paid Ads", "Analytics", "Social Media",];

    const socials = [
        { Icon: Linkedin, href: "https://www.linkedin.com/in/akshay-zade-994676210/", color: "#8bc53f" },
        { Icon: Instagram, href: "https://www.instagram.com/azade151/", color: "#8bc53f" },
        { Icon: Mail, href: "mailto:zadeakshay828@gmail.com", color: "#8bc53f" },
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
                                Meet Akshay Zade
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
                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-lg text-primary mb-5 leading-none"
                            >
                                Founder | Digital Marketing & Growth Strategist
                            </motion.p>
                            {/* Bio */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                className="text-white/70 text-lg leading-relaxed mb-6"
                            >
                                Driven by a passion for digital innovation,  helping businesses build meaningful online identities and turn their digital presence into real growth opportunities.{" "}
                                With a focus on smart strategies, creative thinking and measurable performance, he believes every brand deserves marketing that makes a difference .
                            </motion.p>

                            {/* Skills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-nowrap gap-2 justify-center lg:justify-start overflow-x-auto whitespace-nowrap"
                            >
                                {skills.map((skill, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 + i * 0.08 }}
                                        className="px-3 py-1.5 rounded-full text-sm border shrink-0"
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

// ============= FOUNDER SECTION =============

const FounderSection = () => {
    return (

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
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center mt-6 max-w-2xl mx-auto"
                >
                    <motion.p
                        className="text-primary font-semibold"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        — Akshay Zade, Founder
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderSection;