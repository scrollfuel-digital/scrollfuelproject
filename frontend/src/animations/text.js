export const textContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.035,
        },
    },
};

export const letterAnimation = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            ease: "easeOut",
            duration: 0.4,
        },
    },
};

export const rotateLetterAnimation = {
    hidden: { rotateY: 90, opacity: 0 }, // start rotated
    visible: {
        rotateY: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
        },
    },
};

