import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
    const [isMobile, setIsMobile] = useState(false);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Detect touch device
        const checkMobile = () => {
            setIsMobile(
                "ontouchstart" in window || navigator.maxTouchPoints > 0
            );
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Stop everything on mobile

        const moveCursor = (e) => {
            cursorX.set(e.clientX - 12);
            cursorY.set(e.clientY - 12);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);

        const hoverElements = document.querySelectorAll("a, button, .group");

        hoverElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            hoverElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [cursorX, cursorY, isMobile]);

    if (isMobile) return null; // Hide cursor completely on mobile

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-9999"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    borderColor: isHovering
                        ? "var(--color-green)"
                        : "var(--color-yellow)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
            />

            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-9999"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
                animate={{
                    backgroundColor: isHovering
                        ? "var(--color-green)"
                        : "var(--color-yellow)",
                    scale: isHovering ? 1.5 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
