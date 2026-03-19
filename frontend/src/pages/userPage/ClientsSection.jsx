// import { motion, useInView, useScroll, useTransform } from "framer-motion";
// import React, { useRef, useEffect, useState } from "react";

// const logos = [
//     "/assets/ClientLogo/aakar-modified.png",
//     "/assets/ClientLogo/fitBelly.png",
//     "/assets/ClientLogo/delight.png",
//     "/assets/ClientLogo/maddtowns.png",
//     "/assets/ClientLogo/kalinga-modified.png",
//     "/assets/ClientLogo/mr.png",
//     "/assets/ClientLogo/shrikadareshwar.png",
//     "/assets/ClientLogo/aakarbuidcon.png",
//     "/assets/ClientLogo/highway.png",
//     "/assets/ClientLogo/mnuli.png",
//     "/assets/ClientLogo/namokar.png",
//     "/assets/ClientLogo/nirmay.png",
//     "/assets/ClientLogo/nomads.png",
//     "/assets/ClientLogo/lotus.png",
//     "/assets/ClientLogo/lecase.png",
//     "/assets/ClientLogo/gadewar.png",
//     "/assets/ClientLogo/nourish.png",
//     "/assets/ClientLogo/propscroll.png",
//     "/assets/ClientLogo/rajarha.png",
//     "/assets/ClientLogo/houscrol1.png",
//     "/assets/ClientLogo/aryanllogo.png",
//     "/assets/ClientLogo/ayodhabhumi.png",
//     "/assets/ClientLogo/seven.png",
//     "/assets/ClientLogo/aakar.png",
//     "/assets/ClientLogo/goodwill.png",
//     "/assets/ClientLogo/venya.png",
//     "/assets/ClientLogo/switch.png",
//     "/assets/ClientLogo/axon.png",
//     "/assets/ClientLogo/archi.png",
// ];


// const ClientsSection = React.forwardRef((props, ref) => {
//     const counterRef = useRef(null);
//     const sectionRef = useRef(null);
//     const isInView = useInView(counterRef, { once: true });
//     const [count, setCount] = useState(0);
//     const [isDark, setIsDark] = useState(false);
//     const [isCountingDone, setIsCountingDone] = useState(false);
//     useEffect(() => {
//         const check = () => setIsDark(document.documentElement.classList.contains("dark"));
//         check();
//         const observer = new MutationObserver(check);
//         observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
//         return () => observer.disconnect();
//     }, []);

//     useEffect(() => {
//         if (!isInView) return;
//         let current = 0;
//         const end = 78;
//         const duration = 1500;
//         const stepTime = duration / end;

//         setIsCountingDone(false);

//         const timer = setInterval(() => {
//             current += 1;
//             setCount(current);

//             if (current >= end) {
//                 clearInterval(timer);
//                 setIsCountingDone(true);
//             }
//         }, stepTime);

//         return () => clearInterval(timer);
//     }, [isInView]);

//     const bg = isDark ? "0,0,0" : "255,255,255";
//     const fadeLeft = `linear-gradient(to right,  rgb(${bg}) 0%, rgba(${bg},0) 100%)`;
//     const fadeRight = `linear-gradient(to left,   rgb(${bg}) 0%, rgba(${bg},0) 100%)`;

//     const MarqueeRow = ({ logosList, duration = 90 }) => {
//         return (
//             <div className="w-full overflow-hidden relative">
//                 {/* Fade edges */}
//                 <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 z-10 pointer-events-none" style={{ background: fadeLeft }} />
//                 <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 z-10 pointer-events-none" style={{ background: fadeRight }} />
//                 <motion.div

//                     transition={{
//                         repeat: Infinity,
//                         ease: "linear",
//                         duration
//                     }}
//                     className="flex w-max min-w-full gap-4 sm:gap-5 items-center py-2 px-2"
//                 >
//                     {[...logosList, ...logosList].map((logo, i) => (
//                         <div
//                             key={i}
//                             className="
//                 flex items-center justify-center flex-shrink-0
//                 w-20 h-20 sm:w-28 sm:h-28
//                 rounded-2xl
//                 border border-black/[0.07]
//             "
//                         >
//                             <img
//                                 src={logo}
//                                 alt="Client logo"
//                                 className="w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-80 hover:opacity-100"
//                             />
//                         </div>
//                     ))}
//                 </motion.div>
//             </div>
//         );
//     };
//     return (
//         <section
//             ref={sectionRef}
//             className="relative overflow-hidden bg-white dark:bg-black"
//         >

//             {/* Top accent bar */}
//             <motion.div
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
//                 viewport={{ once: true }}
//                 className="absolute top-0 left-0 right-0 h-px origin-left"
//                 style={{ background: "linear-gradient(90deg, transparent, #8bc53f, transparent)" }}
//             />

//             {/* Glow orb */}
//             <motion.div

//                 aria-hidden
//                 className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none z-0"
//             >
//                 <div className="w-full h-full" style={{ background: "radial-gradient(ellipse, rgba(139,197,63,0.12) 0%, transparent 70%)" }} />
//             </motion.div>

//             {/* Main content */}
//             <div className="relative z-10 flex flex-col items-center gap-6">
//                 {/* Headline + counter */}
//                 <motion.div
//                     ref={counterRef}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.1 }}
//                     viewport={{ once: true }}
//                     className="text-center px-4"
//                 >
//                     <h4 className="font-serif text-2xl pt-5 sm:text-4xl md:text-4xl font-bold text-black dark:text-white leading-tight tracking-tight">
//                         Over{" "}
//                         <span className="relative inline-block">
//                             <span className="relative z-10 text-primary">
//                                 {count.toLocaleString()}+
//                             </span>
//                             <motion.svg
//                                 className="absolute -bottom-2 left-0 w-full"
//                                 viewBox="0 0 200 10"
//                                 fill="none"
//                                 preserveAspectRatio="none"
//                             >
//                                 <motion.path
//                                     d="M0 5 Q25 0 50 5 Q75 10 100 5 Q125 0 150 5 Q175 10 200 5"
//                                     stroke="#8bc53f"
//                                     strokeWidth="2.5"
//                                     strokeLinecap="round"
//                                     fill="none"
//                                     initial={{ pathLength: 0, opacity: 0 }}
//                                     whileInView={{ pathLength: 1, opacity: 1 }}
//                                     transition={{ duration: 0.9, delay: 1 }}
//                                     viewport={{ once: true }}
//                                 />
//                             </motion.svg>
//                         </span>{" "}
//                         <span>Clients</span>
//                     </h4>
//                     <p className="mt-3 text-sm sm:text-base text-[#8d8c8c] font-medium tracking-wide">
//                         Brands that trust us to grow their digital presence
//                     </p>
//                 </motion.div>

//                 <MarqueeRow logosList={logos} duration={25} />

//             </div>

//         </section>
//     );
// });

// ClientsSection.displayName = "ClientsSection";
// export default ClientsSection;

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
                <div className="absolute inset-0 dark:bg-white" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 py">
                <motion.p
                    ref={counterRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-lg sm:text-xl md:text-2xl dark:text-black font-bold"
                >
                    <h4>
                        Over{" "}
                        <span className="text-primary font-bold">
                            {count.toLocaleString()}+ Clients
                        </span>{" "}
                        All Over The World
                    </h4>
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
                        className="flex w-max gap-55"
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