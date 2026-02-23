import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import ClientsSection from "./ClientsSection.jsx";
import About from "../../components/About.jsx";
import Services from "../../components/Services.jsx";
import Testimonials from "../../components/Testimonials.jsx";


/* Slides */
const slides = [
    { type: "video", src: "/assets/video/sfweblanding1.mp4" },
    { type: "video", src: "/assets/video/sflanding2.mp4" },
    { type: "video", src: "/assets/video/sfweb.mp4" },
    { type: "video", src: "/assets/video/sfweblandingpages.mp4" },
];

export default function Home() {
    const heroRef = useRef(null);
    const sectionRefs = useRef([]);
    const [[current, direction], setCurrent] = useState([0, 1]);

    /* Auto Slide */
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    /* Scroll Parallax */
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    /* Slide Animation */
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 1,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({
            x: dir > 0 ? "-100%" : "100%",
            opacity: 1,
        }),
    };

    /* Text Animations */
    const textContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.03 } },
    };

    const letterAnimation = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2 },
        }),
    };

    return (
        <main className="bg-white text-black overflow-hidden">
            {/* ================= HERO ================= */}
            <section
                ref={(el) => {
                    heroRef.current = el;
                    sectionRefs.current[0] = el;
                }}
                className="
          relative w-screen
          overflow-hidden
          bg-black
          aspect-video
          md:aspect-auto md:h-screen pt-75
        "
            >
                {/* SLIDES */}
                <AnimatePresence initial={false} custom={direction}>
                    <motion.video
                        key={current}
                        src={slides[current].src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 1, ease: "easeInOut" }}
                        style={{ y: heroY }}
                        className="
              absolute inset-0
              w-full h-full
              object-contain md:object-cover
              bg-black 
            "
                    />
                </AnimatePresence>

                {/* overlay */}
                {/* <div className="absolute inset-0 bg-black/50 md:bg-black/50 z-10" /> */}

                {/* HERO CONTENT */}
                {/* <motion.div
                    style={{ scale: heroScale }}
                    className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-4"
                > */}
                {/* <motion.div
                    style={{ scale: heroScale }}
                    className="absolute inset-0 z-20 hidden md:flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-4"
                >

                    <motion.h1
                        className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-bold leading-tight mt-4 md:mt-50 text-black md:text-white"
                    >
                        <motion.div
                            variants={textContainer}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap justify-center"
                        >
                            {"Driving Measurable Online Growth"
                                .split("")
                                .map((char, i) => (
                                    <motion.span key={i} variants={letterAnimation}>
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        className="text-xs md:text-lg text-black md:text-white/80 max-w-3xl mt-2 mb-5"
                    >
                        Scrollfuel Digital Marketing Agency helps brands grow online
                        through data-driven SEO, paid ads, and high-performance websites.
                    </motion.p>

                    <motion.button
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        className=" px-3 py-1 sm:px-8 sm:py-3 bg-primary text-black font-semibold rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
                    >
                        Get Started <ArrowRight />
                    </motion.button>
                </motion.div> */}

                {/* DOTS */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrent(([prev]) => [index, index > prev ? 1 : -1])
                            }
                            className={`h-2.5 rounded-full transition-all duration-300 ${current === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/50 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* OTHER SECTIONS */}
            <ClientsSection />
            <Services />
            <About />
            <Testimonials />
        </main>
    );
}
