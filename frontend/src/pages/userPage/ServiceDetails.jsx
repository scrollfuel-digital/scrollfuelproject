// src/pages/userPage/ServiceDetails.jsx

import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { services, getServiceBySlug } from "../../data/services";
import SEO from "../../components/SEO";
import { serviceSEO } from "../../data/seoData";


/* =========================================================
   Renders **bold** text as <strong>
========================================================= */

const RichText = ({ text }) =>
    text
        .split(/\*\*(.+?)\*\*/g)
        .map((part, i) =>
            i % 2 ? (
                <strong
                    key={i}
                    className="font-semibold text-white"
                >
                    {part}
                </strong>
            ) : (
                part
            )
        );


/* =========================================================
   Service Details Page
========================================================= */

const ServiceDetails = () => {
    const { slug } = useParams();

    /* ---------------------------------------------
       Get service information
    --------------------------------------------- */
    const service = getServiceBySlug(slug);


    /* ---------------------------------------------
       Get SEO information based on slug
    --------------------------------------------- */
    const seo = serviceSEO[slug];


    /* ---------------------------------------------
       Redirect if service doesn't exist
    --------------------------------------------- */
    if (!service) {
        return <Navigate to="/services" replace />;
    }


    /* ---------------------------------------------
       Previous / Next service
    --------------------------------------------- */
    const index = services.findIndex(
        (s) => s.slug === slug
    );

    const prev =
        services[
        (index - 1 + services.length) %
        services.length
        ];

    const next =
        services[
        (index + 1) % services.length
        ];


    /* ---------------------------------------------
       Other services
    --------------------------------------------- */
    const others = services.filter(
        (s) => s.slug !== slug
    );


    return (
        <>
            {/* =================================================
                PAGE SEO
            ================================================= */}

            <SEO
                title={
                    seo?.title ||
                    service.metaTitle ||
                    "Services | ScrollFuel"
                }

                description={
                    seo?.description ||
                    service.metaDescription ||
                    "Explore digital marketing services from ScrollFuel."
                }

                canonical={
                    seo?.canonical ||
                    service.canonical ||
                    `https://scrollfuel.in/services/${slug}`
                }
            />


            {/* =================================================
                MAIN PAGE
            ================================================= */}

            <main
                className="min-h-screen bg-black text-white"
                style={{
                    "--accent": service.accent,
                }}
            >

                <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">


                    {/* =================================================
                        BREADCRUMB
                    ================================================= */}

                    <nav
                        aria-label="Breadcrumb"
                        className="mb-8 text-sm text-white/60"
                    >
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
                        >
                            <ArrowLeft size={16} />

                            All services
                        </Link>
                    </nav>


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <header className="grid items-center gap-8 md:grid-cols-2 md:gap-12">

                        <div>

                            {/* H1 */}
                            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                                {seo?.h1 || service.h1}
                            </h1>

                            {/* Page introduction */}
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                                {seo?.description ||
                                    service.metaDescription ||
                                    "Explore digital marketing services from ScrollFuel."}
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                <Link
                                    to="/nagpurs-best-digital-marketing-company/"
                                    className="rounded-full px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                                    style={{
                                        background: service.accent,
                                    }}
                                >
                                    Get a free consultation
                                </Link>

                            </div>

                        </div>


                        {/* SERVICE IMAGE */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">

                            <img
                                src={service.illustration}
                                alt={
                                    seo?.h1 ||
                                    service.h1 ||
                                    service.title
                                }
                                className="aspect-[4/3] w-full object-cover"
                            />

                        </div>

                    </header>


                    {/* =================================================
                        CONTENT + SIDEBAR
                    ================================================= */}

                    <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">


                        {/* =================================================
                            MAIN CONTENT
                        ================================================= */}

                        <article className="max-w-3xl">

                            <div className="space-y-5 text-base leading-[1.85] text-white/75">

                                {service.content.map(
                                    (p, i) => (
                                        <p key={i}>
                                            <RichText
                                                text={p}
                                            />
                                        </p>
                                    )
                                )}

                            </div>


                            {/* =================================================
                                WHAT WE OFFER
                            ================================================= */}

                            <section className="mt-12 border-t border-white/10 pt-10">

                                <h2 className="mb-5 font-serif text-xl font-bold sm:text-2xl">
                                    What we offer
                                </h2>


                                <ul className="grid gap-3 sm:grid-cols-2">

                                    {service.keywords.map(
                                        (k) => (
                                            <li
                                                key={k}
                                                className="flex items-start gap-3 text-sm text-white/80"
                                            >

                                                <Check
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-[var(--accent)]"
                                                />

                                                {k}

                                            </li>
                                        )
                                    )}

                                </ul>

                            </section>

                        </article>


                        {/* =================================================
                            SIDEBAR
                        ================================================= */}

                        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">


                            {/* ---------------------------------------------
                                CTA CARD
                            --------------------------------------------- */}

                            <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">

                                <h2 className="font-serif text-lg font-bold">
                                    Ready to get started?
                                </h2>


                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    Tell us about your business and goals.
                                    We will suggest the right plan.
                                </p>


                                <Link
                                    to="/nagpurs-best-digital-marketing-company/"
                                    className="mt-5 block rounded-full py-3 text-center text-sm font-semibold text-black transition-opacity hover:opacity-90"
                                    style={{
                                        background:
                                            service.accent,
                                    }}
                                >
                                    Contact ScrollFuel
                                </Link>

                            </div>


                            {/* ---------------------------------------------
                                OTHER SERVICES
                            --------------------------------------------- */}

                            <nav
                                aria-label="Other services"
                                className="rounded-2xl border border-white/10 bg-neutral-950 p-6"
                            >

                                <h2 className="mb-3 font-serif text-lg font-bold">
                                    Other services
                                </h2>


                                <ul className="divide-y divide-white/10">

                                    {others.map((s) => (

                                        <li key={s.slug}>

                                            <Link
                                                to={`/services/${s.slug}`}
                                                className="flex items-center justify-between py-3 text-sm text-white/80 transition-colors hover:text-[var(--accent)]"
                                            >

                                                {s.metaTitle}

                                                <ArrowRight
                                                    size={15}
                                                />

                                            </Link>

                                        </li>

                                    ))}

                                </ul>

                            </nav>

                        </aside>

                    </div>


                    {/* =================================================
                        PREVIOUS / NEXT
                    ================================================= */}

                    <nav
                        aria-label="Service navigation"
                        className="mt-20 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2"
                    >

                        {/* ---------------------------------------------
                            PREVIOUS
                        --------------------------------------------- */}

                        <Link
                            to={`/services/${prev.slug}`}
                            className="group rounded-xl border border-white/10 p-5 transition-colors hover:border-[var(--accent)]"
                        >

                            <span className="flex items-center gap-1.5 text-xs text-white/50">

                                <ArrowLeft size={14} />

                                Previous

                            </span>


                            <span className="mt-1 block font-semibold">
                                {prev.title}
                            </span>

                        </Link>


                        {/* ---------------------------------------------
                            NEXT
                        --------------------------------------------- */}

                        <Link
                            to={`/services/${next.slug}`}
                            className="group rounded-xl border border-white/10 p-5 text-right transition-colors hover:border-[var(--accent)]"
                        >

                            <span className="flex items-center justify-end gap-1.5 text-xs text-white/50">

                                Next

                                <ArrowRight size={14} />

                            </span>


                            <span className="mt-1 block font-semibold">
                                {next.title}
                            </span>

                        </Link>

                    </nav>

                </div>

            </main>
        </>
    );
};


export default ServiceDetails;