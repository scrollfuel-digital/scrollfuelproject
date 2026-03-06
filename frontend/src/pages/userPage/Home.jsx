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

    return (
        <main className="bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-500">

            {/* ================= HERO ================= */}
            <section
                ref={(el) => {
                    heroRef.current = el;
                    sectionRefs.current[0] = el;
                }}
                className="relative w-screen overflow-hidden aspect-video md:aspect-auto md:h-screen pt-75"
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
                        className="absolute inset-0 w-full h-full object-contain md:object-cover bg-black"
                    />
                </AnimatePresence>

                {/* SLIDER DOTS */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrent(([prev]) => [index, index > prev ? 1 : -1])
                            }
                            className={`h-2.5 rounded-full transition-all duration-300 ${current === index
                                    ? "w-8 bg-white"
                                    : "w-2.5 bg-white/50 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* ================= SECTIONS ================= */}

            <section className="bg-white dark:bg-black transition-colors duration-500">
                <ClientsSection />
            </section>

            <section className="bg-white dark:bg-black transition-colors duration-500">
                <Services />
            </section>

            <section className="bg-white dark:bg-black transition-colors duration-500">
                <About />
            </section>

            <section className="bg-white dark:bg-black transition-colors duration-500">
                <Testimonials />
            </section>

        </main>
    );
}