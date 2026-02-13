import { useScroll, useTransform } from "framer-motion";

export const useScrollFlip = (ref) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "start 20%"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [-90, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return { rotateX, opacity };
};
