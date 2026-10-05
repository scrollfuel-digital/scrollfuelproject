// src/pages/userPage/Servicesfixed.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
    TrendingUp,
    FileText,
    Instagram,
    Palette,
    Code,
    Video,
    ArrowUpRight,
} from "lucide-react";
import { services } from "../../data/services";

const ICONS = { TrendingUp, FileText, Instagram, Palette, Code, Video };

/* ---------- Card ---------- */
const ServiceCard = ({ service }) => {
    const Icon = ICONS[service.icon] ?? TrendingUp;
    const visibleKeywords = service.keywords.slice(0, 3);
    const extra = service.keywords.length - visibleKeywords.length;

    return (
        <Link
            to={`/services/${service.slug}/`}
            aria-label={`${service.title} – view details`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 transition-colors duration-300 hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            style={{ "--accent": service.accent }}
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                    src={service.illustration}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

                <span
                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-black"
                    style={{ background: service.accent }}
                >
                    <Icon size={20} strokeWidth={2.2} />
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="font-serif text-xl font-bold leading-snug text-white sm:text-2xl">
                    {service.h1}
                </h3>

                <p className="text-sm leading-relaxed text-white/70">
                    {service.metaDescription}
                </p>

                <ul className="flex flex-wrap gap-2">
                    {visibleKeywords.map((k) => (
                        <li
                            key={k}
                            className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                        >
                            {k}
                        </li>
                    ))}

                    {extra > 0 && (
                        <li className="rounded-full px-2 py-1 text-xs text-white/50">
                            +{extra} more
                        </li>
                    )}
                </ul>

                <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold"
                    style={{ color: service.accent }}
                >
                    View service

                    <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </span>
            </div>
        </Link>
    );
};

/* ---------- Page ---------- */
const Services = () => {
    const reduce = useReducedMotion();

    useEffect(() => {
        document.title =
            "Digital Marketing Services in Nagpur | ScrollFuel";
        const desc = document.querySelector("meta[name='description']");
        if (desc)
            desc.setAttribute(
                "content",
                "Explore ScrollFuel's digital marketing services in Nagpur: SEO & PPC, content marketing, social media, branding, website development and video production."
            );
    }, []);

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6 md:pb-16 md:pt-40">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                        Digital marketing services that bring you customers
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                        From search and social to branding and websites, ScrollFuel
                        helps Nagpur businesses get found, look credible and turn
                        visitors into leads. Pick a service to see how we work.
                    </p>
                </motion.div>
            </header>

            {/* Cards */}
            <section
                aria-label="Our services"
                className="mx-auto max-w-6xl px-4 pb-24 sm:px-6"
            >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard key={service.slug} service={service} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Services;