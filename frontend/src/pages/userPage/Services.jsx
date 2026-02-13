import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../../data/services.js";

/* ---------------- INTRO ---------------- */

const ContactCard = () => {
    return (
        <div className="text-white max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold">
                Our <span className="text-primary">Services</span>
            </h1>

            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                At ScrollFuel, we create digital solutions that go beyond visuals.
                Our work helps brands communicate clearly, connect with the right
                audience, and deliver measurable results. Whether you’re building
                something new or strengthening an existing presence, we support
                your growth at every stage.
            </p>
        </div>
    );
};

/* ---------------- SERVICE CARD ---------------- */

const ServiceCard = ({ service, onClick }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            layout
            onClick={onClick}
            className="
                bg-white rounded-3xl max-w-6xl w-full
                grid grid-cols-1 lg:grid-cols-2
                overflow-hidden cursor-pointer
                h-[85vh] lg:h-[70vh]
            "
        >
            {/* IMAGE */}
            <div className="bg-black flex items-center justify-center h-56 sm:h-72 lg:h-full">
                <img
                    src={service.illustration}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* CONTENT */}
            <div
                className={`
                    px-6 lg:px-4 py-8
                    flex flex-col items-center text-center
                    gap-4 lg:gap-6
                    transition-all duration-300
                    ${expanded ? "overflow-y-auto" : "overflow-hidden lg:overflow-visible"}
                `}
                style={{ background: service.bg }}
            >
                {/* TITLE */}
                <motion.h2
                    layout
                    className="text-2xl md:text-3xl lg:text-4xl font-bold "
                    style={{ color: service.text }}
                >
                    {service.title}
                </motion.h2>

                {/* DESCRIPTION */}
                <motion.p
                    layout
                    className={`
                        max-w-md text-sm md:text-base leading-relaxed
                        ${!expanded ? "line-clamp-4 lg:line-clamp-none" : ""}
                    `}
                    style={{ color: service.text }}
                >
                    {service.description}
                </motion.p>

                {/* KEYWORDS */}
                <div
                    className={`
                        flex flex-wrap justify-center gap-3 max-w-md
                        ${!expanded ? "max-h-16 overflow-hidden lg:max-h-none lg:overflow-visible" : ""}
                    `}
                >
                    {service.keywords?.map((keyword, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="
                                px-4 py-1 text-xs
                                bg-black/10 rounded
                                text-black
                                hover:bg-black hover:text-white
                                transition
                            "
                        >
                            {keyword}
                        </motion.span>
                    ))}
                </div>

                {/* VIEW MORE BUTTON (mobile only) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                    }}
                    className="
                        lg:hidden
                        text-sm font-semibold
                        text-black/70 hover:text-black
                        transition
                    "
                >
                    {expanded ? "View Less ↑" : "View More ↓"}
                </button>
            </div>
        </motion.div>
    );
};

/* ---------------- MAIN SERVICES PAGE ---------------- */

const Services = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const totalCards = services.length + 1;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={containerRef}
            className="relative bg-black"
            style={{ height: `${totalCards * 80}vh` }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">

                    {/* INTRO */}
                    <motion.div
                        style={{
                            y: useTransform(
                                scrollYProgress,
                                [0, 1 / totalCards],
                                ["0%", "-70%"]
                            ),
                        }}
                        className="absolute inset-0 flex items-center justify-center px-6"
                    >
                        <ContactCard />
                    </motion.div>

                    {/* SERVICE CARDS */}
                    {services.map((service, index) => {
                        const start = (index + 1) / totalCards;
                        const end = (index + 2) / totalCards;

                        const y = useTransform(
                            scrollYProgress,
                            [start, end],
                            ["10%", "0%"]
                        );

                        const opacity = useTransform(
                            scrollYProgress,
                            [start - 0.02, start],
                            [0, 1]
                        );

                        const pointer = useTransform(opacity, (v) =>
                            v < 0.5 ? "none" : "auto"
                        );

                        return (
                            <motion.div
                                key={service.slug}
                                style={{
                                    y,
                                    opacity,
                                    pointerEvents: pointer,
                                }}
                                className="absolute inset-0 flex items-center justify-center px-6"
                            >
                                <ServiceCard
                                    service={service}
                                    onClick={() =>
                                        navigate(`/services/${service.slug}`)
                                    }
                                />
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default Services;
