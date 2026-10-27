
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

import { servicesData } from "../../data/servicesData";

const ICONS = {
    TrendingUp,
    FileText,
    Instagram,
    Palette,
    Code,
    Video,
};

// Use servicesData.js as the single source of service information.
const services = Object.values(servicesData);

/* ---------- Card ---------- */
const ServiceCard = ({ service }) => {
    const Icon = ICONS[service.icon] ?? TrendingUp;
    const keywords = service.keywords ?? [];
    const visibleKeywords = keywords.slice(0, 3);
    const extra = keywords.length - visibleKeywords.length;

    return (
        <Link
            to={service.path}
            aria-label={`${service.title} – view details`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 transition-colors duration-300 hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            style={{ "--accent": service.accent ?? "#8bc53f" }}
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                {service.illustration ? (
                    <img
                        src={service.illustration}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Icon size={56} className="text-white/50" />
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

                <span
                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-black"
                    style={{ background: service.accent ?? "#8bc53f" }}
                >
                    <Icon size={20} strokeWidth={2.2} />
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 p-6">
                <h2 className="font-serif text-xl font-bold leading-snug text-white sm:text-2xl">
                    {service.cardTitle ?? service.h1 ?? service.title}
                </h2>

                <p className="text-sm leading-relaxed text-white/70">
                    {service.metaDescription ?? service.description}
                </p>

                {keywords.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {visibleKeywords.map((keyword) => (
                            <li
                                key={keyword}
                                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                            >
                                {keyword}
                            </li>
                        ))}

                        {extra > 0 && (
                            <li className="rounded-full px-2 py-1 text-xs text-white/50">
                                +{extra} more
                            </li>
                        )}
                    </ul>
                )}

                <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold"
                    style={{ color: service.accent ?? "#8bc53f" }}
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
        document.title = "Digital Marketing Services in Nagpur | ScrollFuel";

        const description =
            "Explore ScrollFuel's digital marketing services in Nagpur: SEO and PPC, content marketing, social media marketing, branding, website development, and video production.";

        let meta = document.querySelector('meta[name="description"]');

        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }

        meta.setAttribute("content", description);
    }, []);

    return (
        <main className="min-h-screen dark:bg-black">
            {/* Header */}

            <header className="mx-auto max-w-6xl px-4 pb-12 pt-32 text-center sm:px-6 md:pb-16 md:pt-40">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mx-auto max-w-3xl"
                >
                    <h1 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl">
                        Digital Marketing Services
                    </h1>

                    <p className="mx-auto mt-6 max-w-8xl text-base leading-relaxed text-muted md:text-lg">
                        ScrollFuel helps businesses get found and turn visitors into customers with SEO and PPC, social media, websites, branding, content and video.
                    </p>
                </motion.div>
            </header>


            {/* Cards: data comes only from servicesData.js */}
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
