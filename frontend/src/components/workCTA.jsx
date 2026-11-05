import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Search, Palette, Megaphone } from "lucide-react";

/* Change this if your contact page route is different */
const CONTACT_PATH = "/connect-with-us/";

/* ------------------------------------------------------------------
   CONTENT
------------------------------------------------------------------- */
const WORK = {
    heading: "Building Better Digital Experiences for Businesses",
    description:
        "Explore our work, client experiences, and digital projects that reflect our approach to website development, SEO, branding, and digital marketing.",
    topics: [
        { icon: Globe, label: "Website Development", color: "var(--color-green)" },
        { icon: Search, label: "SEO", color: "var(--color-yellow)" },
        { icon: Palette, label: "Branding", color: "var(--color-green)" },
        { icon: Megaphone, label: "Digital Marketing", color: "var(--color-yellow)" },
    ],
};

const CTA = {
    heading: "Ready to Grow Your Business Online?",

    button: "Let's Discuss Your Business Goals",
};

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------- */
const WorkCTA = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="bg-white text-black dark:bg-black dark:text-white overflow-hidden relative">
            {/* ============ WORK INTRO ============ */}
            {/* <section className="relative py-20 px-8">
                <div
                    className="absolute inset-0 -z-0 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(139, 197, 63, 0.12), transparent 65%)" }}
                />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                        className="font-serif text-3xl md:text-5xl font-extrabold leading-tight"
                    >
                        {WORK.heading}
                    </motion.h2>

                  
                    <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
                        <motion.span
                            className="h-0.5 w-16 md:w-24 origin-right"
                            style={{ background: "linear-gradient(90deg, transparent, var(--color-green))" }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <motion.span
                            className="w-3 h-3 rotate-45"
                            style={{ background: "linear-gradient(135deg, var(--color-green), var(--color-yellow))" }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.8 }}
                        />
                        <motion.span
                            className="h-0.5 w-16 md:w-24 origin-left"
                            style={{ background: "linear-gradient(90deg, var(--color-yellow), transparent)" }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-black/70 dark:text-white/70"
                    >
                        {WORK.description}
                    </motion.p>

                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-3"
                    >
                        {WORK.topics.map(({ icon: Icon, label, color }) => (
                            <li
                                key={label}
                                className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/3 dark:bg-white/5 px-5 py-2.5 text-base font-semibold"
                            >
                                <Icon size={18} style={{ color }} />
                                {label}
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </section> */}

           
            {/* ============ SIMPLE CTA ============ */}
            <section className="relative px-6 md:px-12 pb-20">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="
            max-w-6xl mx-auto
            rounded-2xl
            px-8 py-12 md:px-14 md:py-14
            bg-gray-50 dark:bg-neutral-900
            border border-gray-200 dark:border-white/10
            text-center
        "
                >

                    {/* Heading */}
                    <h2 className="
            text-2xl md:text-4xl
            font-bold
            leading-tight
            text-black dark:text-white
        ">
                        {CTA.heading}
                    </h2>

                    {/* Accent Line */}
                    <div className="
            w-16 h-1
            rounded-full
            bg-primary
            mx-auto my-6
        " />

                    {/* Button */}
                    <Link
                        to={CONTACT_PATH}
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
                        className="
                inline-flex items-center gap-2
                px-7 py-3.5
                rounded-full
                bg-primary
                text-black
                text-base font-semibold
                transition-all duration-300
                hover:bg-secondary
                hover:shadow-lg
                hover:shadow-primary/20
            "
                    >
                        {CTA.button}

                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>

                </motion.div>

            </section>
            
        </div>
    );
});

WorkCTA.displayName = "WorkCTA";

export default WorkCTA;