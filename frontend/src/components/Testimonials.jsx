import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";

const testimonials = [
    {
        id: 1,
        initials: "AD",
        name: "Anand Dongre",
        text: "Clear brand identity. Strong presence. Simple, impactful work.",
        img: "./assets/anand.jpg",
        rating: 5,
    },
    {
        id: 2,
        initials: "SP",
        name: "Smit Pillewar",
        text: "Strategic execution with measurable, consistent growth.",
        img: "./assets/smit.jpg",
        rating: 5,
    },
    {
        id: 3,
        initials: "NB",
        name: "Nilesh Bhoyar",
        text: "Focused strategy. Strong online presence. Consistent performance.",
        img: "./assets/Nilesh.jpg",
        rating: 5,
    },
    {
        id: 4,
        initials: "VB",
        name: "Vishal Bisen",
        text: "Optimized campaigns. Qualified leads. Measurable ROI.",
        img: "./assets/vishal.jpg",
        rating: 5,
    },
    {
        id: 5,
        initials: "BT",
        name: "Bhavesh Thakre",
        text: "Our social media profiles now reflect a confident and professional brand image.",
        img: "./assets/bhavesh.jpg",
        rating: 5,
    }
];

const StarIcon = ({ filled }) => (
    <svg
        className="w-[14px] h-[14px]"
        viewBox="0 0 20 20"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
    >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
);

const TestimonialCard = ({ item }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="
      min-w-[280px] max-w-[280px] shrink-0
      rounded-2xl p-5
      bg-white dark:bg-black
      border border-gray-200 dark:border-gray-800
      transition-all duration-300
      hover:-translate-y-1
      hover:border-primary
      hover:shadow-primary
      group
    "
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="
          w-11 h-11 rounded-full overflow-hidden
          border border-gray-200 dark:border-gray-700
          group-hover:border-primary transition-colors
        ">
                    {!imgError ? (
                        <img
                            src={item.img}
                            alt={item.name}
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-sm">
                            {item.initials}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-sm font-semibold text-black dark:text-white group-hover:text-primary transition-colors">
                        {item.name}
                    </p>

                    <div className="flex gap-[3px] mt-1 text-secondary">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < item.rating} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-3xl leading-none text-gray-200 group-hover:text-primary transition-colors">
                "
            </div>

            <p className="text-sm leading-relaxed text-muted group-hover:text-dark dark:group-hover:text-white transition-colors">
                {item.text}
            </p>
        </div>
    );
};

const CARD_WIDTH = 280;
const CARD_GAP = 14;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_SCROLL_SPEED = 0.6;
const AUTO_SCROLL_INTERVAL = 16;
const RESUME_DELAY = 3000;

const Testimonials = () => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const dragStart = useRef({ x: 0, scrollLeft: 0 });
    const autoScrollRef = useRef(null);
    const accumulatorRef = useRef(0);
    const resumeTimerRef = useRef(null);

    const loopedItems = useMemo(
        () => [...testimonials, ...testimonials, ...testimonials],
        []
    );

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollLeft = testimonials.length * CARD_STEP;
    }, []);

    const pauseWithResume = useCallback(() => {
        setIsPaused(true);
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
    }, []);

    const cancelResume = useCallback(() => {
        clearTimeout(resumeTimerRef.current);
        setIsPaused(true);
    }, []);

    const resumeNow = useCallback(() => {
        clearTimeout(resumeTimerRef.current);
        setIsPaused(false);
    }, []);

    const updateActiveDot = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const midOffset = testimonials.length * CARD_STEP;
        const relativeScroll = el.scrollLeft - midOffset;

        const idx =
            ((Math.round(relativeScroll / CARD_STEP) % testimonials.length) +
                testimonials.length) %
            testimonials.length;

        setActiveIndex(idx);
    }, []);

    const loopReset = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        const setWidth = testimonials.length * CARD_STEP;

        if (el.scrollLeft >= setWidth * 2) {
            el.scrollLeft -= setWidth;
        } else if (el.scrollLeft <= 0) {
            el.scrollLeft += setWidth;
        }
    }, []);

    useEffect(() => {
        const tick = () => {
            if (!isPaused && !isDragging) {
                const el = scrollRef.current;
                if (el) {
                    accumulatorRef.current += AUTO_SCROLL_SPEED;
                    if (accumulatorRef.current >= 1) {
                        const px = Math.floor(accumulatorRef.current);
                        el.scrollLeft += px;
                        accumulatorRef.current -= px;
                        loopReset();
                        updateActiveDot();
                    }
                }
            }
            autoScrollRef.current = setTimeout(tick, AUTO_SCROLL_INTERVAL);
        };

        autoScrollRef.current = setTimeout(tick, AUTO_SCROLL_INTERVAL);
        return () => clearTimeout(autoScrollRef.current);
    }, [isPaused, isDragging, loopReset, updateActiveDot]);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        pauseWithResume();
        el.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-white dark:bg-black py-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-black dark:text-white">
                            What our <span className="text-primary">clients say</span>
                        </h2>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll(-1)}
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white transition hover:bg-primary hover:text-white hover:border-primary hover:scale-105"
                        >
                            ‹
                        </button>

                        <button
                            onClick={() => scroll(1)}
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white transition hover:bg-primary hover:text-white hover:border-primary hover:scale-105"
                        >
                            ›
                        </button>
                    </div>
                </div>
          
                <div
                    ref={scrollRef}
                    onMouseEnter={cancelResume}
                    onMouseLeave={resumeNow}
                    className="
    flex gap-3 overflow-x-auto pb-2 
    cursor-grab select-none
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  "
                >
                    {loopedItems.map((item, i) => (
                        <TestimonialCard key={`${item.id}-${i}`} item={item} />
                    ))}
                </div>

                <div className="flex justify-center items-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-[6px] rounded-full transition-all duration-300 ${activeIndex === i
                                ? "w-6 bg-primary"
                                : "w-[6px] bg-gray-300 dark:bg-gray-700"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;