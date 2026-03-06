import React, { useEffect, useMemo, useState } from "react";

const VISIBLE_CARDS = 3;
const CARD_HEIGHT = 140;
const GAP = 20;

const Testimonials = () => {
    const testimonials = useMemo(
        () => [
            {
                id: 1,
                name: "Anand Dongre",
                text: "They gave our brand a clear identity and strong presence. Simple, clean, and impactful work.",
                img: "./assets/anand.jpg",
                baseBg: "bg-white dark:bg-black",
                border: "border-primary",
                nameColor: "text-black dark:text-white",
                textColor: "text-gray-600 dark:text-gray-400",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
            {
                id: 2,
                name: "Smit Pillewar",
                text: "Strategic execution. Measurable growth. Consistent performance",
                img: "./assets/smit.jpg",
                baseBg: "bg-white dark:bg-black",
                border: "border-primary",
                nameColor: "text-black dark:text-white",
                textColor: "text-gray-600 dark:text-gray-400",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
            {
                id: 3,
                name: "Nilesh Bhoyar",
                text: "Focused strategy. Strong online presence. Consistent performance.",
                img: "./assets/Nilesh.jpg",
                baseBg: "bg-white dark:bg-black",
                border: "border-primary",
                nameColor: "text-black dark:text-white",
                textColor: "text-gray-600 dark:text-gray-400",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
            {
                id: 4,
                name: "Vishal Bisen",
                text: "Optimized campaigns. Qualified leads. Measurable ROI.",
                img: "./assets/vishal.jpg",
                baseBg: "bg-white dark:bg-black",
                border: "border-primary",
                nameColor: "text-black dark:text-white",
                textColor: "text-gray-600 dark:text-gray-400",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
            {
                id: 5,
                name: "Bhavesh Thakre",
                text: "Our social media profiles now reflect a confident and professional brand image.",
                img: "./assets/bhavesh.jpg",
                baseBg: "bg-white dark:bg-black",
                border: "border-primary",
                nameColor: "text-black dark:text-white",
                textColor: "text-gray-600 dark:text-gray-400",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
            {
                id: 6,
                name: "Mayur Choudhary",
                text: "We received regular reports, clear insights, and transparent communication.",
                img: "./assets/Mayur.jpg",
                baseBg: "bg-white dark:bg-black",
                border: "border-primary",
                nameColor: "text-black dark:text-white",
                textColor: "text-gray-600 dark:text-gray-400",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    const extendedTestimonials = useMemo(() => {
        return [...testimonials, ...testimonials.slice(0, VISIBLE_CARDS)];
    }, [testimonials]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (index === testimonials.length) {
            const timeout = setTimeout(() => {
                setAnimate(false);
                setIndex(0);
            }, 700);

            return () => clearTimeout(timeout);
        }

        if (!animate) {
            const timeout2 = setTimeout(() => setAnimate(true), 50);
            return () => clearTimeout(timeout2);
        }
    }, [index, testimonials.length, animate]);

    const translateY = index * (CARD_HEIGHT + GAP);

    const StarRating = ({ rating, isHovered, activeColor }) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 transition-colors duration-300 ${i < rating
                                ? isHovered
                                    ? activeColor
                                    : "text-secondary"
                                : "text-gray-400 dark:text-gray-600"
                            } fill-current`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section className="w-full bg-white text-black dark:bg-black dark:text-white py-20 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

                    {/* LEFT */}
                    <div className="space-y-8">

                        <svg className="w-24 h-24 mb-6 text-secondary" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2" />
                            <path d="M30 45 L40 55 L60 35"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            What Our{" "}
                            <span className="text-secondary">
                                Customers Say
                            </span>
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
                            Relation so in confined smallest children unpacked delicate.
                            Why sir end believe uncivil respect.
                        </p>

                    </div>

                    {/* RIGHT SLIDER */}
                    <div className="relative">

                        <div
                            className="relative overflow-hidden"
                            style={{
                                height: VISIBLE_CARDS * CARD_HEIGHT + (VISIBLE_CARDS - 1) * GAP,
                            }}
                        >

                            <div
                                className={`flex flex-col ${animate ? "transition-transform duration-700 ease-in-out" : ""
                                    }`}
                                style={{
                                    transform: `translateY(-${translateY}px)`,
                                    gap: `${GAP}px`,
                                }}
                            >

                                {extendedTestimonials.map((item, i) => {

                                    const middleIndex = index + 1;
                                    const isActive = i === middleIndex;
                                    const originalIndex = i % testimonials.length;
                                    const isEvenCard = (originalIndex + 1) % 2 === 0;

                                    return (

                                        <div
                                            key={`${item.id}-${i}`}
                                            className={`
                                            group relative overflow-hidden
                                            ${isEvenCard ? "mr-8" : "mr-0"}
                                            ${item.baseBg}
                                            shadow-xl rounded-2xl px-6 py-5 border-2 ${item.border}
                                            flex items-start gap-4
                                            transition-all duration-700
                                            ${isActive ? "scale-105 opacity-100" : "scale-95 opacity-60"}
                                            hover:opacity-100 hover:scale-105
                                            cursor-pointer
                                            `}
                                            style={{ height: CARD_HEIGHT }}
                                            onMouseEnter={() => setHoveredCard(i)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >

                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
                                            />

                                            <div className="flex-1">

                                                <h4 className={`font-bold ${item.nameColor}`}>
                                                    {item.name}
                                                </h4>

                                                <StarRating
                                                    rating={item.rating}
                                                    isHovered={hoveredCard === i}
                                                    activeColor={item.starHoverColor}
                                                />

                                                <p className={`${item.textColor} text-sm mt-1`}>
                                                    {item.text}
                                                </p>

                                            </div>

                                            <div className={`${item.quoteColor} text-3xl`}>
                                                ❝
                                            </div>

                                        </div>

                                    );
                                })}

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;