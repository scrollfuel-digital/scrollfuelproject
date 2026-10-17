import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Infinite looping slider logic shared by Blog and BlogDetails.
 *
 * - Renders `clones` extra cards before and after the real list.
 * - Only loops when there are more items than visible cards.
 * - The track must use overflow-x-hidden (NOT scroll-smooth).
 */
export default function useLoopSlider(total, visible = 3, gap = 24) {
    const [current, setCurrent] = useState(0);
    const trackRef = useRef(null);
    const busy = useRef(false);

    const canLoop = total > visible;
    const clones = canLoop ? visible : 0;

    const scrollToIndex = useCallback(
        (index, smooth = true) => {
            const el = trackRef.current;
            if (!el) return;
            const cardW = (el.clientWidth - gap * (visible - 1)) / visible;
            el.scrollTo({
                left: index * (cardW + gap),
                behavior: smooth ? "smooth" : "instant",
            });
        },
        [visible, gap]
    );

    // Start on the first REAL card (not on a clone)
    useEffect(() => {
        if (!canLoop) return;
        setCurrent(0);
        scrollToIndex(clones, false);
    }, [canLoop, clones, total, scrollToIndex]);

    // Keep position correct on resize
    useEffect(() => {
        if (!canLoop) return undefined;
        const onResize = () => scrollToIndex(clones + current, false);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [canLoop, clones, current, scrollToIndex]);

    const goTo = useCallback(
        (target) => {
            if (!canLoop || busy.current) return;
            busy.current = true;

            const real = (target + total) % total;
            scrollToIndex(clones + target, true);
            setCurrent(real);

            setTimeout(() => {
                // If we landed on a clone, silently jump to the matching real card
                if (target < 0 || target >= total) {
                    scrollToIndex(clones + real, false);
                }
                busy.current = false;
            }, 480);
        },
        [canLoop, total, clones, scrollToIndex]
    );

    const next = useCallback(() => goTo(current + 1), [goTo, current]);
    const prev = useCallback(() => goTo(current - 1), [goTo, current]);

    return { trackRef, current, canLoop, clones, next, prev, goTo };
}