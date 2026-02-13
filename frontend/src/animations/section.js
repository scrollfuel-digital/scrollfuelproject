export const sectionFade = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const cardHover = {
    whileHover: {
        y: -8,
        scale: 1.03,
        transition: { duration: 0.3 },
    },
};
