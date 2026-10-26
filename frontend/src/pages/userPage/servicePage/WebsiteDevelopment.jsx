import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { servicesData } from "../../../data/servicesData.js";

/*
 * Styling notes (index.css):
 * - Brand colour comes from `accent` in servicesData (#ffc93b here), exposed as the
 *   CSS variable --accent so the same markup works for every service page.
 * - Surfaces use bg-dark / animate-float / no-scrollbar from index.css.
 * - Headings (h1-h4) pick up Playfair Display from index.css automatically.
 * - Avoid bg-white: index.css flips it to black in dark mode.
 */

const service = servicesData.websiteDevelopment;
const ANCHOR = "website-section";

const WebsiteDevelopment = () => {
  const sections = service?.sections ?? [];
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Every other service, each linked via its own path (falls back to /services/<slug>/)
  const others = Object.values(servicesData).filter(
    (item) => item.slug !== service?.slug
  );
  const linkFor = (item) => item.path || `/services/${item.slug}/`;

  // Highlight the section currently being read
  useEffect(() => {
    const nodes = sections
      .map((_, i) => document.getElementById(`${ANCHOR}-${i}`))
      .filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  // Reading progress bar
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!service) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-center text-neutral-900 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold">Website development data not found</h1>
        <p className="mt-4 text-neutral-600 dark:text-white/70">
          Please check the websiteDevelopment object in servicesData.js.
        </p>
      </main>
    );
  }
  const renderBoldText = (text) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-primary dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return part;
    });
  };
  return (
    <main
      className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white"
      style={{ "--accent": service.accent }}
    >
      {/* Reading progress */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-(--accent)"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-dark text-white">
        {/* Dotted grid, faded toward the edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
        />
        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-(--accent) opacity-25 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36">
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-(--accent)"
          >
            <ArrowLeft size={16} />
            All services
          </Link>

          <div className="mt-12 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent) opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-(--accent)" />
                </span>
                {service.primaryKeyword}
              </p>

              <h1 className="max-w-2xl text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {service.h1}
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                {service.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/connect-with-us/"
                  className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-8 py-3.5 text-sm font-bold text-black shadow-[0_12px_40px_-12px_var(--accent)] transition hover:-translate-y-0.5 hover:brightness-95"
                >
                  Get a free consultation
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`#${ANCHOR}-0`}
                  className="rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  See what we do
                </a>
              </div>
            </div>

            {service.illustration && (
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-6 rounded-[2rem] bg-(--accent) opacity-40 blur-3xl"
                />

                <div className="relative rounded-[2rem] border border-white/15 bg-white/5 p-2 backdrop-blur">
                  <img
                    src={service.illustration}
                    alt={service.h1}
                    loading="eager"
                    fetchPriority="high"
                    className="aspect-[4/3] w-full rounded-3xl object-cover"
                  />
                </div>

                {sections.length > 0 && (
                  <a
                    href={`#${ANCHOR}-0`}
                    className="animate-float absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/70 px-4 py-3 backdrop-blur-md transition hover:border-white/30 sm:-left-6"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--accent) text-black">
                      <ChevronDown size={18} />
                    </span>
                    <span className="text-left text-sm leading-tight">
                      <span className="block font-semibold text-white">
                        {sections.length} topics inside
                      </span>
                      <span className="block text-white/60">
                        Jump to the guide
                      </span>
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        {/* Mobile section chips (sticky; adjust top-20 to your header height) */}
        <nav
          aria-label="On this page"
          className="no-scrollbar sticky top-20 z-20 -mx-5 mb-10 overflow-x-auto border-b border-black/10 bg-white/85 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden dark:border-white/10 dark:bg-black/85"
        >
          <ul className="flex gap-2">
            {sections.map((section, index) => {
              const isActive = active === index;
              return (
                <li key={section.heading} className="shrink-0">
                  <a
                    href={`#${ANCHOR}-${index}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`block whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${isActive
                      ? "border-transparent bg-(--accent) font-semibold text-black"
                      : "border-black/10 text-neutral-600 dark:border-white/15 dark:text-white/70"
                      }`}
                  >
                    {section.heading}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-20">
          {/* Desktop side navigation */}
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
            <nav aria-label="On this page">
              <p className="text-sm font-semibold text-neutral-500 dark:text-white/60">
                On this page
              </p>

              <ul className="mt-4 border-l border-black/10 dark:border-white/10">
                {sections.map((section, index) => {
                  const isActive = active === index;
                  return (
                    <li key={section.heading}>
                      <a
                        href={`#${ANCHOR}-${index}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`-ml-px block border-l-2 py-2.5 pl-4 pr-2 text-sm leading-snug transition ${isActive
                          ? "border-(--accent) font-semibold text-neutral-900 dark:text-white"
                          : "border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-900 dark:text-white/60 dark:hover:border-white/40 dark:hover:text-white"
                          }`}
                      >
                        {section.heading}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              to="/connect-with-us/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold underline decoration-(--accent) decoration-2 underline-offset-4"
            >
              Talk to our team
              <ArrowRight size={15} />
            </Link>
          </aside>

          {/* Articles */}
          <div className="min-w-0">
            {sections.map((section, index) => (
              <article
                id={`${ANCHOR}-${index}`}
                data-index={index}
                key={section.heading}
                className="scroll-mt-36 border-t border-black/10 py-12 first:border-t-0 first:pt-0 dark:border-white/10"
              >
                <h2 className="max-w-2xl text-balance font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                  {section.heading}
                </h2>

                <div className="mt-6 max-w-2xl space-y-5">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className={
                        paragraphIndex === 0
                          ? "text-xl leading-relaxed text-neutral-900 dark:text-white/90"
                          : "text-base leading-8 text-neutral-600 md:text-lg dark:text-white/65"
                      }
                    >
                      {renderBoldText(paragraph)}
                    </p>
                  ))}
                </div>
              </article>
            ))}

            {sections.length === 0 && (
              <p className="text-neutral-600 dark:text-white/70">
                Service information will be available soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-28">
        <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Other services
        </h2>

        <ul className="mt-10 grid border-t border-black/10 sm:grid-cols-2 sm:gap-x-12 dark:border-white/10">
          {others.map((item) => (
            <li
              key={item.slug}
              className="border-b border-black/10 dark:border-white/10"
            >
              <Link
                to={linkFor(item)}
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span className="text-lg font-semibold leading-snug transition group-hover:text-[#4f7f1e] dark:group-hover:text-(--color-green)">
                  {item.h1 || item.title}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15 text-neutral-500 transition group-hover-bg-primary group-hover-border-primary group-hover:text-black dark:border-white/20 dark:text-white/60">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default WebsiteDevelopment;