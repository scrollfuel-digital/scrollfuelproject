// animations/heroFlip.js
// export const pageFlip = {
//     hidden: {
//         rotateX: -90,
//         opacity: 0,
//         transformOrigin: "center top",
//     },
//     visible: {
//         rotateX: 0,
//         opacity: 1,
//         transition: {
//             duration: 1.4,
//             ease: [0.25, 0.8, 0.25, 1],
//         },
//     },
// };

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

