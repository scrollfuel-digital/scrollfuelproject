import { motion } from "framer-motion";

const FlipSection = ({ children, className = "" }) => {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center"
            style={{ perspective: 1600 }}
        >
            <motion.section
                initial={{
                    rotateX: 90,
                    rotateY: -180,
                    scale: 0.8,
                    opacity: 0,
                }}
                animate={{
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.6,
                    ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                }}
                className={`w-full ${className}`}
            >
                {children}
            </motion.section>
        </div>
    );
};

export default FlipSection;
