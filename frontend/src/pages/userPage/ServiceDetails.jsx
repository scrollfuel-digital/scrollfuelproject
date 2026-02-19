
import { useParams } from "react-router-dom";
import { services } from "../../data/services";
import { motion } from "framer-motion";
import { useState } from "react";

const ServiceDetails = () => {
    const { slug } = useParams();
    const service = services.find((s) => s.slug === slug);
    const [expanded, setExpanded] = useState(false);

    if (!service) return null;

    return (
        <div className="min-h-screen bg-dark text-white pt-28 px-4 flex items-start">
            <div className="w-full max-w-6xl mx-auto">

                {/* MAIN CARD */}
                <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-primary-lg">

                    {/* LEFT IMAGE SECTION */}
                    <div className="relative bg-white flex items-center justify-center p-6">
                        <motion.img
                            src={service.illustration}
                            alt={service.title}
                            className="w-full h-full object-contain"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>

                    {/* RIGHT CONTENT SECTION */}
                    <div
                        className="px-6 lg:px-14 py-10 flex flex-col justify-center gap-5"
                        style={{ background: service.bg }}
                    >
                        {/* TITLE */}
                        <motion.h2
                            layout
                            className="text-2xl md:text-3xl lg:text-4xl font-bold"
                            style={{ color: service.text }}
                        >
                            {service.title}
                        </motion.h2>

                        {/* DESCRIPTION */}
                        <motion.p
                            layout
                            className={`text-sm md:text-base leading-relaxed ${
                                !expanded ? "line-clamp-4 lg:line-clamp-none" : ""
                            }`}
                            style={{ color: service.text }}
                        >
                            {service.description}
                        </motion.p>

                        {/* KEYWORDS */}
                        <div className="flex flex-wrap gap-3">
                            {service.keywords?.map((keyword, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.08 }}
                                    className="px-4 py-2 text-xs font-semibold rounded-full text-black cursor-pointer shadow-sm"
                                    style={{ background: "rgba(0,0,0,0.1)" }}
                                >
                                    {keyword}
                                </motion.span>
                            ))}
                        </div>

                        {/* VIEW MORE BUTTON (Mobile Only) */}
                        <motion.button
                            onClick={() => setExpanded(!expanded)}
                            whileTap={{ scale: 0.95 }}
                            className="lg:hidden text-sm font-semibold text-black/70 hover:text-primary transition-colors duration-200 w-fit"
                        >
                            {expanded ? "View Less ↑" : "View More ↓"}
                        </motion.button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
