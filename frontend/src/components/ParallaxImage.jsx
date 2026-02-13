import { motion } from "framer-motion";
import { useRef } from "react";
import { useParallax } from "../animations/parallax";

const ParallaxImage = ({ src, alt, className }) => {
    const ref = useRef(null);
    const y = useParallax(ref, 100);

    return (
        <motion.img
            ref={ref}
            src={src}
            alt={alt}
            style={{ y }}
            className={className}
        />
    );
};

export default ParallaxImage;
