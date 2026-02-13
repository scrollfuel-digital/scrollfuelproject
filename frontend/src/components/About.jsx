import { motion, useMotionValue, useTransform } from "framer-motion";
import {
    Target,
    Eye,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Users,
    Sparkles,
    Zap,
    Star,
    Heart,
    Award,
    Rocket
} from "lucide-react";
import React, { useState } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
};

/* CREATIVE ICON ILLUSTRATIONS */
const CreativeIcon = ({ Icon, isHovered, variant = "default" }) => {
    const variants = {
        vision: (
            <div className="relative w-32 h-32">
                {/* Animated eye with pupil */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        scale: isHovered ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                >
                    {/* Outer eye glow */}
                    <motion.div
                        className="absolute w-28 h-28 rounded-full bg-linear-to-br from-primary/30 to-secondary/30 blur-xl"
                        animate={{
                            scale: isHovered ? [1, 1.3, 1] : 1,
                            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Eye icon with orbiting stars */}
                    <Icon size={48} className="text-primary relative z-10" />

                    {/* Orbiting elements */}
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
                {/* Target with animated rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Pulsing rings */}
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

                    {/* Center target */}
                    <motion.div
                        className="absolute w-16 h-16 bg-linear-to-br from-secondary to-primary rounded-full flex items-center justify-center"
                        animate={{
                            rotate: isHovered ? 360 : 0,
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Icon size={32} className="text-black" />
                    </motion.div>

                    {/* Flying arrows */}
                    {isHovered && (
                        <>
                            <motion.div
                                className="absolute w-1 h-8 bg-primary"
                                initial={{ scale: 0, x: -50, y: -50 }}
                                animate={{
                                    scale: [0, 1, 0],
                                    x: [-50, 0],
                                    y: [-50, 0],
                                }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                style={{ transformOrigin: 'bottom' }}
                            />
                        </>
                    )}
                </div>
            </div>
        ),
        value1: (
            <div className="relative w-20 h-20">
                {/* Shield with pulse */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl"
                    animate={{
                        rotate: isHovered ? [0, 5, -5, 0] : 0,
                        scale: isHovered ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className="absolute inset-2 flex items-center justify-center"
                    animate={{
                        y: isHovered ? [0, -5, 0] : 0,
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <Icon size={36} className="text-primary" />
                </motion.div>

                {/* Checkmark particles */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute -top-1 right-0 text-secondary text-xs"
                            animate={{
                                opacity: [0, 1, 0],
                                y: [0, -15],
                                x: [0, 5],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ✓
                        </motion.div>
                    </>
                )}
            </div>
        ),
        value2: (
            <div className="relative w-20 h-20">
                {/* Chart with animated bars */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={36} className="text-primary relative z-10" />

                    {/* Animated background bars */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-1 bg-secondary"
                        animate={{
                            height: isHovered ? ['20%', '80%', '40%'] : '20%',
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-2 w-1 bg-primary"
                        animate={{
                            height: isHovered ? ['40%', '60%', '90%'] : '40%',
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-2 w-1 bg-secondary"
                        animate={{
                            height: isHovered ? ['60%', '40%', '70%'] : '60%',
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-1 bg-primary"
                        animate={{
                            height: isHovered ? ['30%', '90%', '50%'] : '30%',
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    />
                </div>
            </div>
        ),
        value3: (
            <div className="relative w-20 h-20">
                {/* Rocket launch animation */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        y: isHovered ? [0, -10, 0] : 0,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon size={36} className="text-primary" />
                </motion.div>

                {/* Smoke trail */}
                {isHovered && (
                    <>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute bottom-2 left-1/2 -ml-2 w-4 h-4 bg-white/20 rounded-full blur-sm"
                                animate={{
                                    y: [0, 30],
                                    opacity: [0.5, 0],
                                    scale: [0.5, 1.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.3
                                }}
                            />
                        ))}
                    </>
                )}
            </div>
        ),
        value4: (
            <div className="relative w-20 h-20">
                {/* People network */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={36} className="text-primary" />

                    {/* Connection dots */}
                    {isHovered && (
                        <>
                            <motion.div
                                className="absolute top-2 left-2 w-2 h-2 bg-secondary rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                                className="absolute bottom-2 left-1/2 -ml-1 w-2 h-2 bg-secondary rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />

                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-30">
                                <motion.line
                                    x1="20%" y1="20%" x2="50%" y2="50%"
                                    stroke="var(--color-green)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.line
                                    x1="80%" y1="20%" x2="50%" y2="50%"
                                    stroke="var(--color-yellow)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                />
                            </svg>
                        </>
                    )}
                </div>
            </div>
        ),
    };

    return variants[variant] || <Icon size={48} className="text-primary" />;
};

/* FLOATING PARTICLES BACKGROUND */
const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                }}
                animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                }}
                transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                }}
            />
        ))}
    </div>
);

const AboutUs = React.forwardRef((props, ref) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredValue, setHoveredValue] = useState(null);

    return (
        <section ref={ref} className="bg-black text-white overflow-hidden relative">
            {/* HERO SECTION WITH UNIQUE ANIMATION */}
            <div className="relative min-h-[70vh] flex items-center">
                {/* Dynamic gradient background */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0.15), transparent 70%)',
                    }}
                    animate={{
                        background: [
                            'radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0.15), transparent 70%)',
                            'radial-gradient(circle at 60% 40%, rgba(255, 201, 59, 0.15), transparent 70%)',
                            'radial-gradient(circle at 40% 60%, rgba(139, 197, 63, 0.15), transparent 70%)',
                            'radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0.15), transparent 70%)',
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <FloatingParticles />

                <div className="text-white max-w-5xl w-full mx-auto px-8 flex flex-col items-center text-center space-y-8 relative z-10">

                    {/* TITLE CONTAINER */}
                    <motion.div
                        initial={{ opacity: 0, y: 80, rotateX: 80 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
                        className="relative"
                        style={{ perspective: 1200 }}
                    >
                        <div className="hidden lg:block absolute left-20 top-10 opacity-30">
                            <svg width="200" height="200" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary" />
                                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                            </svg>
                        </div>
                        {/* Floating subtle motion */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                        // transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <motion.h1
                                className="text-6xl md:text-7xl font-bold leading-tight"
                                animate={{
                                    textShadow: [
                                        "0 0 15px rgba(139,197,63,0.5)",
                                        "0 0 35px rgba(255,201,59,0.6)",
                                        "0 0 15px rgba(139,197,63,0.5)",
                                    ],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                About{" "}
                                <motion.span
                                    className="text-primary inline-block"
                                    animate={{ scale: [1, 1.1, 1] }}
                                // transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Us
                                </motion.span>
                            </motion.h1>
                        </motion.div>

                        {/* Animated underline */}
                        <motion.div className="absolute -bottom-5 left-0 right-0 h-0.5 overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-transparent via-primary to-transparent"
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "100%" }}
                                transition={{ duration: 2, delay: 0.6 }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* DESCRIPTION */}
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="text-white/70 text-lg leading-relaxed max-w-3xl" > Scrollfuel is a growth-focused digital marketing Agency committed to helping businesses succeed online. Our approach combines creativity, technology, and analytics to deliver measurable digital marketing results. We help brands win online through strategy, creativity, and performance-driven execution. </motion.p>

                </div>

            </div>

            {/* VISION & MISSION - UNIQUE CARD DESIGNS */}
            <div className="max-w-7xl mx-auto px-8 py-2 grid md:grid-cols-2 gap-12">
                {/* VISION - Flip Card Design */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    onMouseEnter={() => setHoveredCard('vision')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative perspective-1000"
                    style={{ perspective: '1000px' }}
                >
                    <motion.div
                        className="relative min-h-87.5"
                        animate={{
                            rotateY: hoveredCard === 'vision' ? 5 : 0,
                            rotateX: hoveredCard === 'vision' ? -5 : 0,
                        }}
                        transition={{ duration: 0.6 }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Card with skew effect */}
                        <motion.div
                            className="relative px-10 py-6 rounded-3xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                border: '1px solid rgba(139, 197, 63, 0.2)',
                            }}
                            animate={{
                                borderColor: hoveredCard === 'vision'
                                    ? 'rgba(139, 197, 63, 0.8)'
                                    : 'rgba(139, 197, 63, 0.2)',
                                boxShadow: hoveredCard === 'vision'
                                    ? '0 20px 60px rgba(139, 197, 63, 0.3), inset 0 0 60px rgba(139, 197, 63, 0.1)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.3)',
                            }}
                            transition={{ duration: 0.4 }}
                        >

                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0), transparent)',
                                }}
                                animate={{
                                    background: hoveredCard === 'vision'
                                        ? [
                                            'radial-gradient(circle at 0% 0%, rgba(139, 197, 63, 0.2), transparent)',
                                            'radial-gradient(circle at 100% 100%, rgba(139, 197, 63, 0.2), transparent)',
                                            'radial-gradient(circle at 0% 0%, rgba(139, 197, 63, 0.2), transparent)',
                                        ]
                                        : 'radial-gradient(circle at 50% 50%, rgba(139, 197, 63, 0), transparent)',
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            {hoveredCard === 'vision' && (
                                <motion.div
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        background: 'linear-gradient(45deg, transparent 30%, rgba(139, 197, 63, 0.3) 50%, transparent 70%)',
                                    }}
                                    initial={{ x: '-100%', y: '-100%' }}
                                    animate={{ x: '100%', y: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                />
                            )}

                            <div className="relative z-10">
                                <motion.div
                                    animate={{
                                        scale: hoveredCard === 'vision' ? 1.1 : 1,
                                        rotate: hoveredCard === 'vision' ? 360 : 0,
                                    }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <CreativeIcon Icon={Eye} isHovered={hoveredCard === 'vision'} variant="vision" />
                                </motion.div>

                                <motion.h2
                                    className="text-4xl font-bold mb-6 mt-1"
                                    animate={{
                                        color: hoveredCard === 'vision' ? 'var(--color-green)' : '#ffffff',
                                        x: hoveredCard === 'vision' ? 10 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Our Vision
                                </motion.h2>

                                <motion.p
                                    className="text-lg leading-relaxed"
                                    animate={{
                                        color: hoveredCard === 'vision' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                        x: hoveredCard === 'vision' ? 10 : 0,
                                    }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    To become a trusted digital marketing agency delivering sustainable business growth through ethical and performance-driven strategies.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* MISSION - Morphing Card Design */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    onMouseEnter={() => setHoveredCard('mission')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative"
                >
                    <motion.div
                        className="relative min-h-7.5"
                        animate={{
                            scale: hoveredCard === 'mission' ? 1.03 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className="relative px-10 rounded-3xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
                                border: '1px solid rgba(255, 201, 59, 0.2)',
                            }}
                            animate={{
                                borderColor: hoveredCard === 'mission'
                                    ? 'rgba(255, 201, 59, 0.8)'
                                    : 'rgba(255, 201, 59, 0.2)',
                                borderRadius: hoveredCard === 'mission' ? '30px' : '24px',
                                boxShadow: hoveredCard === 'mission'
                                    ? '0 20px 60px rgba(255, 201, 59, 0.3), inset 0 0 60px rgba(255, 201, 59, 0.1)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.3)',
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Ripple effect */}
                            {hoveredCard === 'mission' && (
                                <>
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-secondary/30 rounded-full"
                                            initial={{ width: 0, height: 0, opacity: 0.6 }}
                                            animate={{
                                                width: 400,
                                                height: 400,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.6,
                                            }}
                                        />
                                    ))}
                                </>
                            )}

                            <div className="relative z-10">
                                <motion.div
                                    animate={{
                                        y: hoveredCard === 'mission' ? -10 : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CreativeIcon Icon={Target} isHovered={hoveredCard === 'mission'} variant="mission" />
                                </motion.div>

                                <motion.h2
                                    className="text-4xl font-bold mb-6 mt-7"
                                    animate={{
                                        color: hoveredCard === 'mission' ? 'var(--color-yellow)' : '#ffffff',
                                        y: hoveredCard === 'mission' ? -5 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Our Mission
                                </motion.h2>

                                <motion.p
                                    className="text-lg leading-relaxed pb-6"
                                    animate={{
                                        color: hoveredCard === 'mission' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                        y: hoveredCard === 'mission' ? -5 : 0,
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

            {/* VALUES SECTION - CREATIVE CARD DESIGNS */}
            <div className="max-w-7xl mx-auto px-8 py-20 relative">
                <FloatingParticles />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    {/* <motion.h2
                        className="text-5xl font-bold mb-4"
                        animate={{
                            backgroundImage: [
                                'linear-gradient(45deg, #8bc53f 0%, #ffc93b 100%)',
                                'linear-gradient(45deg, #ffc93b 0%, #8bc53f 100%)',
                                'linear-gradient(45deg, #8bc53f 0%, #ffc93b 100%)',
                            ],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Our Digital Marketing Values
                    </motion.h2> */}
                    <motion.h2
                        className="text-5xl font-bold mb-4 leading-tight pt-1"
                        animate={{
                            backgroundImage: [
                                'linear-gradient(45deg, #8bc53f 0%, #ffc93b 100%)',
                                'linear-gradient(45deg, #ffc93b 0%, #8bc53f 100%)',
                                'linear-gradient(45deg, #8bc53f 0%, #ffc93b 100%)',
                            ],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Our Digital Marketing Values
                    </motion.h2>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <motion.div
                            className="w-20 h-0.5 bg-primary"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                        />
                        <Rocket className="text-secondary" size={24} />
                        <motion.div
                            className="w-20 h-0.5 bg-secondary"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                        />
                    </div>
                </motion.div>

                {/* Value cards with unique designs */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Transparency & Accountability",
                            text: "Clear communication and honest reporting.",
                            variant: "value1",
                            color: "primary"
                        },
                        {
                            icon: BarChart3,
                            title: "ROI-Driven Marketing",
                            text: "Every decision is tied to business impact.",
                            variant: "value2",
                            color: "secondary"
                        },
                        {
                            icon: TrendingUp,
                            title: "Continuous Optimization",
                            text: "We test, learn, and improve constantly.",
                            variant: "value3",
                            color: "primary"
                        },
                        {
                            icon: Users,
                            title: "Client-First Growth",
                            text: "Your success is our benchmark.",
                            variant: "value4",
                            color: "secondary"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, rotateX: -30 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 100
                            }}
                            onMouseEnter={() => setHoveredValue(index)}
                            onMouseLeave={() => setHoveredValue(null)}
                            className="relative"
                            style={{ perspective: '1000px' }}
                        >
                            <motion.div
                                className="relative min-h-85 rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden cursor-pointer"
                                style={{
                                    background: index % 2 === 0
                                        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                                        : 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
                                }}
                                animate={{
                                    y: hoveredValue === index ? -15 : 0,
                                    rotateY: hoveredValue === index ? 10 : 0,
                                    rotateX: hoveredValue === index ? -10 : 0,
                                    boxShadow: hoveredValue === index
                                        ? item.color === 'primary'
                                            ? '0 25px 50px rgba(139, 197, 63, 0.4), inset 0 0 50px rgba(139, 197, 63, 0.1)'
                                            : '0 25px 50px rgba(255, 201, 59, 0.4), inset 0 0 50px rgba(255, 201, 59, 0.1)'
                                        : '0 10px 30px rgba(0, 0, 0, 0.3)',
                                }}
                                transition={{ duration: 0.5 }}

                            >
                                {/* Animated border */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl"
                                    style={{
                                        border: '2px solid',
                                        borderColor: item.color === 'primary'
                                            ? 'rgba(139, 197, 63, 0.2)'
                                            : 'rgba(255, 201, 59, 0.2)',
                                    }}
                                    animate={{
                                        borderColor: hoveredValue === index
                                            ? item.color === 'primary'
                                                ? 'rgba(139, 197, 63, 0.8)'
                                                : 'rgba(255, 201, 59, 0.8)'
                                            : item.color === 'primary'
                                                ? 'rgba(139, 197, 63, 0.2)'
                                                : 'rgba(255, 201, 59, 0.2)',
                                    }}
                                />

                                {/* Corner decorations */}
                                <motion.div
                                    className="absolute top-0 right-0 w-16 h-16"
                                    style={{
                                        background: item.color === 'primary'
                                            ? 'linear-gradient(135deg, rgba(139, 197, 63, 0.2) 0%, transparent 100%)'
                                            : 'linear-gradient(135deg, rgba(255, 201, 59, 0.2) 0%, transparent 100%)',
                                        borderTopRightRadius: '1rem',
                                    }}
                                    animate={{
                                        opacity: hoveredValue === index ? 0.8 : 0.3,
                                    }}
                                />

                                {/* Particle burst effect */}
                                {hoveredValue === index && (
                                    <>
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={`absolute w-1 h-1 ${item.color === 'primary' ? 'bg-primary' : 'bg-secondary'} rounded-full`}
                                                style={{
                                                    top: '50%',
                                                    left: '50%',
                                                }}
                                                animate={{
                                                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                                                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                                                    opacity: [1, 0],
                                                    scale: [0, 1.5],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                }}
                                            />
                                        ))}
                                    </>
                                )}

                                <div className="relative z-10 flex flex-col items-center h-full">
                                    <CreativeIcon
                                        Icon={item.icon}
                                        isHovered={hoveredValue === index}
                                        variant={item.variant}
                                    />

                                    <motion.h3
                                        className="text-xl font-bold mb-4 mt-6 min-h-14 flex items-center"
                                        animate={{
                                            color: hoveredValue === index
                                                ? item.color === 'primary' ? 'var(--color-green)' : 'var(--color-yellow)'
                                                : '#ffffff',
                                            scale: hoveredValue === index ? 1.05 : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-base leading-relaxed"
                                        animate={{
                                            color: hoveredValue === index ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.text}
                                    </motion.p>

                                    {/* Hover indicator */}
                                    <motion.div
                                        className="mt-auto pt-6"
                                        animate={{
                                            opacity: hoveredValue === index ? 1 : 0,
                                        }}
                                    >
                                        <div className={`w-12 h-1 ${item.color === 'primary' ? 'bg-primary' : 'bg-secondary'} rounded-full`} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

AboutUs.displayName = 'AboutUs';

export default AboutUs;
