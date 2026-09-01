import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../../data/services";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ServiceDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const currentIndex = services.findIndex(
        (service) => service.slug === slug
    );

    const [direction, setDirection] = useState(1);

    if (currentIndex === -1) return null;

    const service = services[currentIndex];

    return (
        <div className="min-h-screen bg-dark text-white pt-28 px-4 pb-12 select-none">
            <div className="w-full max-w-6xl mx-auto">

                {/* ================= SERVICE SLIDER ================= */}
                <div className="relative">

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={service.slug}
                            initial={{
                                opacity: 0,
                                x: direction > 0 ? 80 : -80,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: direction > 0 ? -80 : 80,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: "easeInOut",
                            }}
                            className="
                                w-full
                                grid
                                md:grid-cols-2
                                rounded-3xl
                                overflow-hidden
                                shadow-primary-lg
                                bg-white

                                /* FIXED CARD HEIGHT */
                                md:h-[560px]
                                lg:h-[600px]
                            "
                        >

                            {/* ================= IMAGE ================= */}
                            <div
                                className="
                                    relative
                                    w-full
                                    h-[300px]
                                    md:h-full
                                    overflow-hidden
                                    bg-white
                                "
                            >
                                <motion.img
                                    src={service.illustration}
                                    alt={service.title}
                                    className="
                                        absolute
                                        inset-0
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                    whileHover={{
                                        scale: 1.04,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                />

                                {/* IMAGE OVERLAY */}
                                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                            </div>

                            {/* ================= CONTENT AREA ================= */}
                            <div
                                className="
                                    h-full
                                    min-h-0
                                    w-full

                                    flex
                                    flex-col

                                    px-6
                                    sm:px-8
                                    lg:px-14
                                    py-8
                                    lg:py-10
                                "
                                style={{
                                    background: service.bg,
                                }}
                            >

                                {/* 
                                    ONLY THIS AREA SCROLLS
                                    The slider/card itself does NOT scroll.
                                */}
                                <div
                                    className="
                                        flex-1
                                        min-h-0
                                        overflow-y-auto

                                        pr-2

                                        scrollbar-thin
                                        scrollbar-thumb-black/20
                                        scrollbar-track-transparent

                                        hover:scrollbar-thumb-black/30
                                    "
                                >
                                    <div className="flex flex-col justify-center min-h-full">

                                        {/* ================= TITLE ================= */}
                                        <motion.h2
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay: 0.08,
                                                duration: 0.4,
                                            }}
                                            className="
                                                text-2xl
                                                md:text-3xl
                                                lg:text-4xl
                                                font-bold
                                                leading-tight
                                                mb-5
                                            "
                                            style={{
                                                color: service.text,
                                            }}
                                        >
                                            {service.title}
                                        </motion.h2>

                                        {/* ================= DESCRIPTION ================= */}
                                        <motion.p
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay: 0.14,
                                                duration: 0.4,
                                            }}
                                            className="
                                                text-sm
                                                md:text-base
                                                leading-relaxed
                                                mb-6
                                            "
                                            style={{
                                                color: service.text,
                                            }}
                                        >
                                            {service.description}
                                        </motion.p>

                                        {/* ================= WHAT WE OFFER ================= */}
                                        {service.keywords?.length > 0 && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.4,
                                                }}
                                            >
                                                <h3
                                                    className="
                                                        text-sm
                                                        font-semibold
                                                        mb-3
                                                    "
                                                    style={{
                                                        color: service.text,
                                                    }}
                                                >
                                                    What We Offer
                                                </h3>

                                                <div className="flex flex-wrap gap-2.5">
                                                    {service.keywords.map(
                                                        (keyword, i) => (
                                                            <motion.span
                                                                key={i}
                                                                initial={{
                                                                    opacity: 0,
                                                                    scale: 0.9,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scale: 1,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        0.25 +
                                                                        i * 0.04,
                                                                    duration: 0.3,
                                                                }}
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                    y: -2,
                                                                }}
                                                                className="
                                                                    px-3.5
                                                                    py-2
                                                                    text-xs
                                                                    font-semibold
                                                                    rounded-full
                                                                    cursor-pointer
                                                                    shadow-sm
                                                                "
                                                                style={{
                                                                    background:
                                                                        "rgba(0,0,0,0.10)",
                                                                    color:
                                                                        service.text,
                                                                }}
                                                            >
                                                                {keyword}
                                                            </motion.span>
                                                        )
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ================= CONTENT ================= */}
                                        {service.content && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: 0.35,
                                                    duration: 0.4,
                                                }}
                                                className="
                                                    mt-6
                                                    pt-5
                                                    border-t
                                                "
                                                style={{
                                                    borderColor:
                                                        `${ service.text } 30`,
                                                }}
                                            >
                                                <p
                                                    className="
                                                        text-sm
                                                        md:text-base
                                                        leading-relaxed
                                                        font-medium
                                                    "
                                                    style={{
                                                        color: service.text,
                                                    }}
                                                >
                                                    {service.content}
                                                </p>
                                            </motion.div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* ================= PREVIOUS BUTTON ================= */}
                    <button
                        type="button"
                        aria-label="Previous service"
                        className="
                            absolute
                            left-2
                            md:-left-6
                            top-1/2
                            -translate-y-1/2

                            w-10
                            h-10
                            md:w-12
                            md:h-12

                            rounded-full
                            bg-white
                            text-black
                            shadow-xl

                            flex
                            items-center
                            justify-center

                            hover:scale-110
                            active:scale-95

                            transition-transform
                            duration-200

                            z-30
                        "
                    >
                        
                    </button>

                    {/* ================= NEXT BUTTON ================= */}
                    <button
                        type="button"
                        aria-label="Next service"
                        className="
                            absolute
                            right-2
                            md:-right-6
                            top-1/2
                            -translate-y-1/2

                            w-10
                            h-10
                            md:w-12
                            md:h-12

                            rounded-full
                            bg-white
                            text-black
                            shadow-xl

                            flex
                            items-center
                            justify-center

                            hover:scale-110
                            active:scale-95

                            transition-transform
                            duration-200

                            z-30
                        "
                    >
                        
                    </button>
                </div>



            </div>
        </div>
    );
};

export default ServiceDetails;

