
export const illustrationContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
            delayChildren: 1.4,
        },
    },
};

export const illustrationItem = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

