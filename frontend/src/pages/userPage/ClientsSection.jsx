import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";


const logos = [
    "/assets/ClientLogo/fitBelly.png",
    "/assets/ClientLogo/delight.png",
    "/assets/ClientLogo/maddtowns.png",
    "/assets/ClientLogo/kalinga.png",
    "/assets/ClientLogo/mr.png",
    "/assets/ClientLogo/shrikadareshwar.png",
    "/assets/ClientLogo/aakarbuidcon.png",
    "/assets/ClientLogo/highway.png",
    "/assets/ClientLogo/mnuli.png",
    "/assets/ClientLogo/namokar.png",
    "/assets/ClientLogo/nirmay.png",
    "/assets/ClientLogo/nomads.png",
    "/assets/ClientLogo/lotus.png",
    "/assets/ClientLogo/lecase.png",
    "/assets/ClientLogo/gadewar.png",
    "/assets/ClientLogo/nourish.png",
    "/assets/ClientLogo/propscroll.png",
    "/assets/ClientLogo/rajarha.png",
    "/assets/ClientLogo/houscrol1.png",
    "/assets/ClientLogo/aryanllogo.png",
    "/assets/ClientLogo/ayodhabhumi.png",
    "/assets/ClientLogo/seven.png",
    "/assets/ClientLogo/aakar.png",
    "/assets/ClientLogo/goodwill.png",
    "/assets/ClientLogo/venya.png",
    "/assets/ClientLogo/switch.png",
    "/assets/ClientLogo/axon.png",
    "/assets/ClientLogo/archi.png",
];

const ClientsSection = React.forwardRef((props, ref) => {
    const counterRef = useRef(null);
    const sectionRef = useRef(null);

    const isInView = useInView(counterRef, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = 100;
        const duration = 1200;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[10vh] pt-15 overflow-hidden"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
                <motion.p
                    ref={counterRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-lg sm:text-xl md:text-2xl text-black font-bold"
                >
                    Over{" "}
                    <span className="text-primary font-bold">
                        {count.toLocaleString()}+ Clients
                    </span>{" "}
                    All Over The World
                </motion.p>

                {/* <div className="w-full overflow-hidden backdrop-blur-sm"> */}
                <div className="w-full overflow-hidden">
                    <motion.div
                        animate={{ x: ["0%", "-60%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 80,
                            ease: "linear",
                        }}
                        className="flex w-max gap-15"
                    >
                        {[...logos, ...logos].map((logo, index) => (
                            // <div
                            //     key={index}
                            //     className="flex items-center justify-center w-35 h-35"
                            // >
                            <div
                                key={index}
                                className="
                                        flex items-center justify-center
                                        w-16 h-16        
                                        sm:w-20 sm:h-20  
                                        md:w-24 md:h-24  
                                        lg:w-28 lg:h-28  
                                    "
                            >

                                <img
                                    src={logo}
                                    alt="Client logo"
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
})
export default ClientsSection
