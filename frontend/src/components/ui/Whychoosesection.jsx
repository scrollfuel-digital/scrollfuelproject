import React from 'react';
import { motion } from 'framer-motion';
import { Target, ScanSearch, Lightbulb, ChartNoAxesCombined } from 'lucide-react';

const whyChoose = [
    {
        title: "Strategy Before Spending",
        text: "Smart planning that makes every marketing rupee count.",
        icon: Target
    },
    {
        title: "Clarity Over Complexity",
        text: " Strategies, clear communication and complete transparency.",
        icon: ScanSearch
    },
    {
        title: "Creativity With Purpose",
        text: "Creative ideas that capture attention and inspire action.",
        icon: Lightbulb
    },
    {
        title: "Results You Can Understand",
        text: "Focus on meaningful metrics, enquiries and conversions.",
        icon: ChartNoAxesCombined
    }
];

const WhyChooseSection = () => {
    return (
        <section className="relative px-6 md:px-12 py-20 md:py-28 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto">

                <div className="max-w-3xl mx-auto text-center mb-14">

                    {/* Main Heading */}
                    <span className="
        text-xl md:text-4xl
        font-bold tracking-tight
        text-black dark:text-white
        mb-5 leading-tight
    ">
                        Here's what makes ScrollFuel a{" "}
                        <span className="text-[#8bc53f]">
                            valuable partner for your digital journey.
                        </span>
                    </span>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {whyChoose.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12
                                }}
                                className="group relative rounded-2xl p-[1.5px] overflow-hidden border border-gray-400/20 dark:border-white/10 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(139,197,63,0.22)] hover:bg-gray-50 dark:hover:bg-neutral-800"
                            >

                                {/* Animated Green Border */}
                                <div className="
                            absolute inset-0 rounded-2xl
                            bg-[conic-gradient(from_0deg,transparent_0deg,transparent_260deg,#8bc53f_320deg,#8bc53f_360deg)]
                            opacity-0
                            group-hover:opacity-100
                            group-hover:animate-[spin_2s_linear_infinite]
                            transition-opacity duration-300
                        " />

                                {/* Card */}
                                <div className="
                            relative h-full min-h-[260px]
                            rounded-[15px] p-7
                            bg-white dark:bg-neutral-900
                            border border-gray-100 dark:border-white/5
                            shadow-[0_5px_20px_rgba(0,0,0,0.04)]
                            transition-all duration-500 ease-out
                            group-hover:-translate-y-2
                            group-hover:shadow-[0_15px_40px_rgba(139,197,63,0.22)]
                            group-hover:bg-gray-50
                            dark:group-hover:bg-neutral-800
                        ">

                                    {/* Top Section */}
                                    <div className="flex items-center justify-between mb-8">

                                        {/* Lucide Icon */}
                                        <div className="
                                    w-14 h-14 rounded-2xl
                                    flex items-center justify-center
                                    bg-[#8bc53f]/10
                                    text-[#8bc53f]
                                    border border-[#8bc53f]/20
                                    transition-all duration-500
                                    group-hover:bg-[#8bc53f]
                                    group-hover:text-black
                                    group-hover:scale-110
                                    group-hover:rotate-3
                                    group-hover:shadow-[0_5px_20px_rgba(139,197,63,0.35)]
                                ">
                                            {Icon && (
                                                <Icon
                                                    size={27}
                                                    strokeWidth={1.8}
                                                />
                                            )}
                                        </div>

                                        {/* Number */}
                                        <span className="
                                    text-sm font-bold tracking-widest
                                    text-[#8bc53f]/70
                                    transition-colors duration-300
                                    group-hover:text-[#8bc53f]
                                ">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Heading */}
                                    <h3 className="
                                text-lg md:text-xl font-bold
                                text-black dark:text-white
                                mb-3 leading-snug
                                transition-colors duration-300
                                group-hover:text-[#75ad32]
                            ">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="
                                text-sm md:text-base
                                leading-relaxed
                                text-gray-600 dark:text-gray-400
                            ">
                                        {item.text}
                                    </p>

                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;