import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";

import {
    useEffect,
    useRef,
    useState,
    lazy,
    Suspense,
} from "react";


const ClientsSection = lazy(() => import("./ClientsSection.jsx"));
const Services = lazy(() => import("../../components/Services.jsx"));
const About = lazy(() => import("../../components/About.jsx"));
const Testimonials = lazy(() => import("../../components/Testimonials.jsx"));


const SectionLoader = () => (
    <div className="w-full h-40 flex items-center justify-center">
        <div
            className="
                w-8 h-8
                border-4
                border-gray-200
                border-t-black
                dark:border-t-white
                rounded-full
                animate-spin
            "
        />
    </div>
);

/* =========================================================
   HERO VIDEO
========================================================= */

const VIDEO_SRC = "/assets/video/herosection.mp4";

/* =========================================================
   VIDEO SLIDE ANIMATION
========================================================= */

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

/* =========================================================
   HOME COMPONENT
========================================================= */

export default function Home() {
    const heroRef = useRef(null);

    const [current] = useState(0);
    const [videoReady, setVideoReady] = useState(false);
    const [mountVideo, setMountVideo] = useState(false);

    /* =====================================================
       SCROLL PARALLAX
    ===================================================== */

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "25%"]
    );

    /* =====================================================
       DELAY VIDEO MOUNT
       Helps unblock the initial page paint
    ===================================================== */

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setMountVideo(true);
        });

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <main
            className="
                bg-white
                text-black
                dark:bg-black
                dark:text-white
                overflow-hidden
                transition-colors
                duration-500
                select-none 
                sm:pt-10   
                pt-20
            "
        >
            {/* =================================================
                HERO SECTION
            ================================================= */}

            <section
                ref={heroRef}
                className="
                    relative
                    w-full
                    overflow-hidden
                    bg-black
                    select-none

                    /* ==============================
                       MOBILE
                       ============================== */

                    h-[240px]

                    /* ==============================
                       LARGE MOBILE / TABLET
                       ============================== */

                    sm:h-[420px]

                    /* ==============================
                       LAPTOP / DESKTOP
                       ============================== */

                    md:h-screen
                "
            >
                {/* =================================================
                    VIDEO LOADING BACKGROUND
                ================================================= */}

                {!videoReady && (
                    <div
                        className="
                            absolute
                            inset-0
                            bg-black
                        "
                        aria-hidden="true"
                    />
                )}

                {/* =================================================
                    HERO VIDEO
                ================================================= */}

                {mountVideo && (
                    <AnimatePresence initial={false}>
                        <motion.video
                            key={current}
                            src={VIDEO_SRC}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"

                            onCanPlay={() => {
                                setVideoReady(true);
                            }}

                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"

                            transition={{
                                duration: 1.2,
                                ease: [
                                    0.25,
                                    0.46,
                                    0.45,
                                    0.94,
                                ],
                            }}

                            style={{
                                y: heroY,
                            }}

                            className="
                                absolute
                                inset-0

                                w-full
                                h-full

                                object-cover

                                bg-black
                                select-none
                                pointer-events-none
                            "
                        />
                    </AnimatePresence>
                )}
            </section>

            {/* =================================================
                CLIENTS SECTION
            ================================================= */}

            <section
                className="
                    bg-white
                    dark:bg-black
                    transition-colors
                    duration-500
                    select-none
                "
            >
                <Suspense fallback={<SectionLoader />}>
                    <ClientsSection />
                </Suspense>
            </section>

            {/* =================================================
                SERVICES SECTION
            ================================================= */}

            <section
                className="
                    bg-white
                    dark:bg-black
                    transition-colors
                    duration-500
                    select-none
                "
            >
                <Suspense fallback={<SectionLoader />}>
                    <Services />
                </Suspense>
            </section>

            {/* =================================================
                ABOUT SECTION
            ================================================= */}

            <section
                className="
                    bg-white
                    dark:bg-black
                    transition-colors
                    duration-500
                    select-none
                "
            >
                <Suspense fallback={<SectionLoader />}>
                    <About />
                </Suspense>
            </section>

            {/* =================================================
                TESTIMONIALS SECTION
            ================================================= */}

            <section
                className="
                    bg-white
                    dark:bg-black
                    transition-colors
                    duration-500
                    select-none
                "
            >
                <Suspense fallback={<SectionLoader />}>
                    <Testimonials />
                </Suspense>
            </section>
        </main>
    );
}