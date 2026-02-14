import React, { useEffect, useMemo, useState } from "react";

const VISIBLE_CARDS = 3;
const CARD_HEIGHT = 140;
const GAP = 20;

const Testimonials = () => {
    const testimonials = useMemo(
        () => [
            {
                id: 1,
                name: "Mehwish",
                text: "They gave our brand a clear identity and strong presence. Simple, clean, and impactful work.",
                img: "./assets/testicon.jpeg",
                baseBg: "bg-black",
                border: "border-primary",
                nameColor: "text-white",
                textColor: "text-muted",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 5,
                starHoverColor: "text-secondary"
            },
            {
                id: 2,
                name: "Elizabeth Jeff",
                text: "Strategic execution. Measurable growth. Consistent performance",
                img: "./assets/behance3.png",
                baseBg: "bg-black",
                border: "border-primary",
                nameColor: "text-white",
                textColor: "text-muted",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 3,
                starHoverColor: "text-secondary"
            },
            {
                id: 3,
                name: "Emily Thomas",
                text: "Focused strategy. Strong online presence. Consistent performance.",
                img: "./assets/guide.png",
                baseBg: "bg-black",
                border: "border-primary",
                nameColor: "text-white",
                textColor: "text-muted",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 1,
                starHoverColor: "text-secondary"
            },
            {
                id: 4,
                name: "Ayesha Khan",
                text: "Optimized campaigns. Qualified leads. Measurable ROI.",
                img: "./assets/testicon.jpeg",
                baseBg: "bg-black",
                border: "border-primary",
                nameColor: "text-white",
                textColor: "text-muted",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 2,
                starHoverColor: "text-secondary"
            },
            {
                id: 5,
                name: "Sarah Ali",
                text: " Our social media profiles now reflect a confident and professional brand image.",
                img: "./assets/guide.png",
                baseBg: "bg-black",
                border: "border-primary",
                nameColor: "text-white",
                textColor: "text-muted",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 3,
                starHoverColor: "text-secondary"
            },
            {
                id: 6,
                name: "Sar Ali",
                text: "We received regular reports, clear insights, and transparent communication.",
                img: "./assets/image1.jpg",
                baseBg: "bg-black",
                border: "border-primary",
                 nameColor: "text-white",
                textColor: "text-muted",
                quoteColor: "text-primary",
                imgBorder: "border-secondary",
                hoverBg: "bg-primary",
                rating: 4,
                starHoverColor: "text-secondary"
            },
        ],
        []
    );

    const [index, setIndex] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Extended list for smooth looping
    const extendedTestimonials = useMemo(() => {
        return [
            ...testimonials,
            ...testimonials.slice(0, VISIBLE_CARDS),
        ];
    }, [testimonials]);

    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Reset without animation after last card
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

    // Star rating component
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
                            : "text-muted"
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
        <section className="w-full bg-black py-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                    {/* LEFT CONTENT */}
                    <div className="space-y-8">
                        {/* Illustration SVG */}
                        <div className="relative">
                            <svg
                                className="w-24 h-24 mb-6 text-secondary"
                                viewBox="0 0 100 100"
                                fill="none"
                            >
                                <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2" />
                                <path
                                    d="M30 45 L40 55 L60 35"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
                                What Our{" "}
                                <span className="text-secondary">
                                    Customers Say
                                </span>
                            </h2>
                        </div>

                        <p className="text-muted text-lg leading-relaxed max-w-xl">
                            Relation so in confined smallest children unpacked delicate. Why sir
                            end believe uncivil respect. Always get adieus nature day course for
                            common.
                        </p>


                        {/* Decorative illustration */}
                        <div className="hidden lg:block absolute -left-20 bottom-0 opacity-30">
                            <svg width="200" height="200" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary" />
                                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT SLIDER */}
                    <div className="relative">
                        {/* Visible window */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                height: VISIBLE_CARDS * CARD_HEIGHT + (VISIBLE_CARDS - 1) * GAP,
                            }}
                        >
                            {/* Gradient overlays for fade effect */}
                            {/* <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-black to-transparent z-20 pointer-events-none"></div> */}
                            {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black to-transparent z-20 pointer-events-none"></div> */}

                            <div
                                className={`flex flex-col ${animate ? "transition-transform duration-700 ease-in-out" : ""}`}
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
                                                ${item.baseBg} shadow-2xl rounded-2xl px-6 py-5 border-2 ${item.border}
                                                flex items-start gap-4
                                                transition-all duration-700 ease-out
                                                ${isActive ? "scale-105 opacity-100 shadow-xl" : "scale-95 opacity-60"}
                                                hover:opacity-100 hover:scale-105
                                                cursor-pointer
                                                ${animate ? "animate-slide-in-right" : ""}
                                            `}
                                            style={{
                                                height: CARD_HEIGHT,
                                                animation: animate ? `slideInRight 0.7s ease-out ${i * 0.1}s both` : 'none',
                                            }}
                                            onMouseEnter={() => setHoveredCard(i)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >
                                            {/* Hover overlay with gradient */}
                                            <div
                                                className={`
                                                    absolute inset-0 translate-x-full group-hover:translate-x-0
                                                    transition-transform duration-500 ease-out
                                                    ${item.hoverBg}
                                                `}
                                            />

                                            {/* Shimmer effect on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10 flex items-start gap-4 w-full">
                                                {/* Avatar with ring animation */}
                                                <div className="relative">
                                                    <div className={`absolute inset-0 rounded-full ${item.imgBorder} border-2 animate-pulse group-hover:animate-ping`}></div>
                                                    <img
                                                        src={item.img}
                                                        alt={item.name}
                                                        className={`
                                                            relative w-16 h-16 rounded-full object-cover border-3 ${item.imgBorder}
                                                            transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                                                        `}
                                                    />
                                                    {/* Online indicator */}
                                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary border-2 border-white rounded-full group-hover:animate-bounce"></div>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4
                                                            className={`
                                                                font-bold ${item.nameColor}
                                                                ${isEvenCard ? "text-xl" : "text-lg"}
                                                                group-hover:text-white transition-colors duration-300
                                                            `}
                                                        >
                                                            {item.name}
                                                        </h4>
                                                    </div>

                                                    {/* Star rating */}
                                                    <div className="mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">
                                                        <StarRating
                                                            rating={item.rating}
                                                            isHovered={hoveredCard === i}
                                                            activeColor={item.starHoverColor}
                                                        />

                                                    </div>

                                                    <p
                                                        className={`
                                                            leading-relaxed
                                                            text-[25px] md:text-xs
                                                            line-clamp-2
                                                            ${item.textColor}
                                                            group-hover:text-white transition-colors duration-300
                                                        `}
                                                    >
                                                        {item.text}
                                                    </p>
                                                </div>

                                                {/* Quote icon with animation */}
                                                <div
                                                    className={`
                                                        ${item.quoteColor} text-3xl font-bold
                                                        group-hover:text-white transition-all duration-300
                                                        group-hover:scale-125 group-hover:rotate-12
                                                    `}
                                                >
                                                    ❝
                                                </div>
                                            </div>

                                            {/* Bottom decorative line */}
                                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-primary via-secondary to-primary group-hover:w-full transition-all duration-500"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Scroll indicator */}
                        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                            {testimonials.map((_, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
                                        ${i === index % testimonials.length
                                            ? "bg-secondary h-8"
                                            : "bg-muted hover:bg-primary"
                                        }
                                    `}
                                    onClick={() => setIndex(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;