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
    paragraphs: [
        "Whether you're looking to improve your Google visibility in Nagpur, build a better website, or reach customers across wider markets, ScrollFuel is ready to discuss your goals.",
        "Tell us about your business and what you want to achieve. Let's explore the digital solutions that make sense for you.",
    ],
    button: "Let's Discuss Your Business Goals",
};

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------- */
const WorkCTA = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="bg-white text-black dark:bg-black dark:text-white overflow-hidden relative">
            {/* ============ WORK INTRO ============ */}
            <section className="relative py-20 px-8">
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

                    {/* Divider */}
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

                    {/* Topic chips */}
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
            </section>

            {/* ============ CTA ============ */}
            <section className="relative px-8 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto rounded-3xl p-px"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(139,197,63,0.9), rgba(255,201,59,0.25) 50%, rgba(139,197,63,0.6))",
                    }}
                >
                    <div
                        className="relative overflow-hidden rounded-[calc(1.5rem-1px)] px-8 py-14 md:px-16 md:py-20"
                        style={{ background: "linear-gradient(135deg, #141414 0%, #262626 100%)" }}
                    >
                        {/* Glows */}
                        <span className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
                        <span className="absolute -bottom-28 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

                        {/* Decorative rings */}
                        <div className="hidden lg:block absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                            <svg width="420" height="420" viewBox="0 0 420 420" fill="none" strokeWidth="1.5">
                                <circle cx="210" cy="210" r="200" stroke="var(--color-green)" strokeOpacity="0.25" />
                                <circle cx="210" cy="210" r="150" stroke="var(--color-yellow)" strokeOpacity="0.25" />
                                <circle cx="210" cy="210" r="100" stroke="var(--color-green)" strokeOpacity="0.3" />
                                <circle cx="210" cy="210" r="50" stroke="var(--color-yellow)" strokeOpacity="0.35" />
                                <circle cx="210" cy="210" r="8" fill="var(--color-green)" />
                            </svg>
                        </div>

                        <div className="relative z-10 max-w-3xl">
                            <h2 className="font-serif text-3xl md:text-5xl font-extrabold leading-tight text-white">
                                {CTA.heading}
                            </h2>

                            <span
                                className="block h-1 w-20 rounded-full my-8"
                                style={{ background: "linear-gradient(90deg, var(--color-green), var(--color-yellow))" }}
                            />

                            <div className="space-y-5">
                                {CTA.paragraphs.map((p, i) => (
                                    <p key={i} className="text-lg md:text-xl leading-relaxed text-white/75">
                                        {p}
                                    </p>
                                ))}
                            </div>

                            <Link
                                to={CONTACT_PATH}
                                onClick={() => window.scrollTo({ top: 0, left: 0 })}
                                className="group mt-10 inline-flex items-center gap-3 bg-primary text-black font-bold text-lg px-8 py-4 rounded-full shadow-primary hover-shadow-primary transition-all duration-300 hover:scale-105"
                            >
                                {CTA.button}
                                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
});

WorkCTA.displayName = "WorkCTA";

export default WorkCTA;