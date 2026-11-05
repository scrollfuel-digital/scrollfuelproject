import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../../components/SEO";
import { pageSEO } from "../../data/seoData";
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Eye,
  FileText,
  Globe2,
  Layers3,
  LineChart,
  Megaphone,
  MousePointerClick,
  Palette,
  Play,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "SEO Projects",
    description:
      "Search-focused strategies designed to improve visibility, discoverability and sustainable organic growth.",
  },
  {
    icon: Megaphone,
    title: "Social Media Campaigns",
    description:
      "Creative social campaigns that help brands communicate, engage audiences and build stronger digital presence.",
  },
  {
    icon: Palette,
    title: "Branding",
    description:
      "Visual identities and creative direction that help businesses stand apart and communicate with confidence.",
  },
  {
    icon: Globe2,
    title: "Website Design",
    description:
      "Modern digital experiences built around usability, credibility, performance and business goals.",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description:
      "Integrated digital marketing solutions combining creativity, technology and performance.",
  },
];




const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Portfolio = () => {

  const [showViewer, setShowViewer] = useState(false);
  

  const openViewer = () => {
    setShowViewer(true);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setShowViewer(false);
    document.body.style.overflow = "";
  };

  const downloadPortfolio = () => {
    const link = document.createElement("a");
    link.href = "/ScrollFuel-Portfolio.pdf";
    link.download = "ScrollFuel-Portfolio.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEO
        title={pageSEO.portfolio.title}
        description={pageSEO.portfolio.description}
        canonical={pageSEO.portfolio.canonical}
      />
      <main className="overflow-hidden bg-white text-black dark:bg-black dark:text-white">

        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden dark:bg-black">
          {/* Content */}
          <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-5 py-20 text-center sm:px-8 lg:px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-5xl"
            >
              {/* Small Heading */}
              <motion.p
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8bc53f] sm:text-base"
              >
                Our Portfolio
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                className="mt-7 font-serif text-5xl font-bold leading-[0.95] tracking-[-0.04em] dark:text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Turning ideas into
                <span className="block text-[#8bc53f]">
                  digital success stories.
                </span>
              </motion.h1>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              {/* Mouse / Scroll Icon */}
              <div className="flex h-11 w-7 items-start justify-center rounded-full border border-[#8bc53f]/70 p-1.5">
                <motion.span
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-2 w-1 rounded-full bg-[#8bc53f]"
                />
              </div>

              {/* Scroll Text */}
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-gray-400">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* =========================================================
            PORTFOLIO SHOWCASE
        ========================================================== */}
        <section className="bg-[#f7f7f4] py-20 dark:bg-[#0b0b0b] sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#8bc53f]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8bc53f]">
                  Our Portfolio
                </span>
              </div>

              <h2 className="mt-5 font-serif text-4xl font-bold tracking-[-0.03em] text-black dark:text-white sm:text-6xl">
                Creativity backed
                <span className="text-[#8bc53f]"> by strategy.</span>
              </h2>

              <p className="mt-5 text-base leading-7 text-black/60 dark:text-white/50 sm:text-lg">
                A showcase of creative and digital marketing work created to
                help businesses stand out, communicate better and grow.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.title}
                    variants={fadeUp}
                    className={`group relative overflow-hidden rounded-3xl border border-black/10 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#8bc53f]/50 hover:shadow-[0_25px_70px_rgba(139,197,63,0.12)] dark:border-white/10 dark:bg-white/[0.04] ${index === 0 ? "lg:col-span-2" : ""
                      }`}
                  >
                    <div className="absolute right-0 top-0 h-28 w-28 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#8bc53f]/10 blur-2xl transition-all duration-500 group-hover:bg-[#8bc53f]/20" />

                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8bc53f]/10 text-[#8bc53f]">
                          <Icon size={23} />
                        </div>

                        <span className="text-xs font-bold text-black/20 dark:text-white/20">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-7 font-serif text-2xl font-bold text-black dark:text-white">
                        {service.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-black/55 dark:text-white/45">
                        {service.description}
                      </p>

                      <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#8bc53f]">
                        Explore capability
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            PDF PORTFOLIO CARD
        ========================================================== */}
        <section className="bg-white py-20 dark:bg-black sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="relative overflow-hidden rounded-[2rem] bg-black p-7 text-white sm:p-10 lg:p-14"
            >
              <div className="absolute right-[-10%] top-[-30%] h-96 w-96 rounded-full bg-[#8bc53f]/15 blur-[120px]" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8bc53f] text-black">
                      <FileText size={22} />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8bc53f]">
                      Complete Portfolio
                    </span>
                  </div>

                  <h2 className="mt-7 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
                    Want to see the
                    <span className="text-[#8bc53f]">
                      {" "}
                      complete story?
                    </span>
                  </h2>

                  <p className="mt-5 max-w-2xl leading-7 text-white/55">
                    Open the complete ScrollFuel portfolio presentation
                    directly on the website or download the PDF for later
                    viewing.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={openViewer}
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#8bc53f] px-6 py-3.5 font-semibold text-black transition hover:bg-[#a2df50]"
                    >
                      <Eye size={18} />
                      View Full Portfolio
                    </button>

                    <button
                      onClick={downloadPortfolio}
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:border-[#8bc53f]/50 hover:bg-white/5"
                    >
                      <ArrowDownToLine size={18} />
                      Download PDF
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="relative h-48 w-40 rotate-3 rounded-xl border border-white/15 bg-gradient-to-br from-[#1d1d1d] to-[#080808] p-5 shadow-2xl">
                    <div className="absolute left-0 top-7 h-1 w-16 bg-[#8bc53f]" />

                    <p className="mt-7 text-xs uppercase tracking-[0.2em] text-white/40">
                      ScrollFuel
                    </p>

                    <p className="mt-4 font-serif text-2xl font-bold">
                      Portfolio
                    </p>

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="h-1 rounded-full bg-[#8bc53f]" />
                      <div className="mt-2 h-1 w-2/3 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


      </main>

      {/* =========================================================
          PDF VIEWER MODAL
      ========================================================== */}
      {showViewer && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="ScrollFuel Portfolio PDF"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeViewer();
            }
          }}
        >
          <div className="flex h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl">
            {/* Viewer header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-black px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8bc53f] text-black">
                  <FileText size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    ScrollFuel Portfolio
                  </p>

                  <p className="hidden text-xs text-white/40 sm:block">
                    Complete portfolio presentation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadPortfolio}
                  className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:border-[#8bc53f]/50 hover:bg-white/5 sm:flex"
                >
                  <ArrowDownToLine size={15} />
                  Download
                </button>

                <a
                  href="/ScrollFuel-Portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:border-[#8bc53f]/50 hover:bg-white/5 sm:flex"
                >
                  <ExternalLink size={15} />
                  New Tab
                </a>

                <button
                  onClick={closeViewer}
                  aria-label="Close portfolio viewer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:border-red-400/40 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PDF */}
            <div className="min-h-0 flex-1 bg-[#222]">
              <iframe
                src="/ScrollFuel-Portfolio.pdf#toolbar=1&navpanes=0&view=FitH"
                title="ScrollFuel Portfolio PDF"
                className="h-full w-full border-0"
              />
            </div>

            {/* Mobile controls */}
            <div className="flex shrink-0 gap-2 border-t border-white/10 bg-black p-3 sm:hidden">
              <button
                onClick={downloadPortfolio}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#8bc53f] px-4 py-3 text-xs font-bold text-black"
              >
                <ArrowDownToLine size={15} />
                Download
              </button>

              <a
                href="/ScrollFuel-Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold text-white"
              >
                <ExternalLink size={15} />
                Open
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;