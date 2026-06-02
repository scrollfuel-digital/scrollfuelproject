import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import ClientsSection from "./ClientsSection.jsx";
import About from "../../components/About.jsx";
import Services from "../../components/Services.jsx";
import Testimonials from "../../components/Testimonials.jsx";

/* Slides */
const slides = [
    { type: "video", src: "/assets/video/herosection.mp4" },
   
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
        enter: {
            opacity: 0,
            scale: 1.08,
            y: 40,
        },
        center: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: -30,
        },
    };

    return (
        <main className="bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-500 select-none">

            {/* ================= HERO ================= */}
            <section
                ref={(el) => {
                    heroRef.current = el;
                    sectionRefs.current[0] = el;
                }}
                className="relative w-screen overflow-hidden aspect-video md:aspect-auto md:h-screen pt-75 select-none"
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
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ y: heroY }}
                        className="absolute inset-0 w-full h-full object-cover bg-black select-none pt-20"
                    />
                </AnimatePresence>

                
            </section>
            {/* ================= SECTIONS ================= */}
            <section className="bg-white dark:bg-black transition-colors duration-500 select-none">
                <ClientsSection />
            </section>

            <section className="bg-white dark:bg-black transition-colors duration-500 select-none">
                <Services />
            </section>

            <section className="bg-white dark:bg-black transition-colors duration-500 select-none">
                <About />
            </section>

            <section className="bg-white dark:bg-black transition-colors duration-500 select-none">
                <Testimonials />
            </section>

        </main>
    );
}