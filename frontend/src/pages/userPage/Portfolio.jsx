import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
import { Link } from "react-router-dom";
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


const industries = [
  {
    name: "Real Estate",
    description:
      "High-converting digital experiences for builders, developers and real estate brands.",
    services: [
      "Project Websites",
      "Property Landing Pages",
      "Lead Generation",
    ],
    projects: [
      {
        name: "Aryans Buildcon",
        url: "https://aryansbuildcon.com/",
      },
      {
        name: "4 Pillars Realty",
        url: "https://www.4pillarsrealty.com/",
      },
      {
        name: "Devang Developers",
        url: "https://www.devangdevelopers.com/",
      },
      {
        name: "SkyConnect Infrastructures",
        url: "https://www.skyconnectinfrastructures.com/",
      },
      {
        name: "Devprath Constructions",
        url: "https://devprathconstructions.vercel.app/",
      },
      {
        name: "PropScroll India",
        url: "https://propscrollindia.com/",
      },
    ],
  },

  {
    name: "E-commerce",
    description:
      "Conversion-focused online stores designed to showcase products and turn visitors into customers.",
    services: [
      "Online Stores",
      "Product Pages",
      "Conversion UX",
    ],
    projects: [
      {
        name: "Evershine",
        url: "https://evershine-project.vercel.app/",
      },
    ],
  },

  {
    name: "Healthcare",
    description:
      "Clear, trustworthy digital experiences that make healthcare services easier to discover.",
    services: [
      "Clinic Websites",
      "Service Pages",
      "Appointment UX",
    ],
  },

  {
    name: "Education",
    description:
      "Modern platforms and websites that help institutes, educators and courses connect with students.",
    services: [
      "Institute Websites",
      "Course Platforms",
      "Lead Generation",
    ],
  },

  {
    name: "Technology",
    description:
      "Modern product experiences that communicate complex technology in a simple and engaging way.",
    services: [
      "SaaS Websites",
      "Product Websites",
      "Web Applications",
    ],
  },

  {
    name: "Startups",
    description:
      "Fast, scalable digital experiences built to help ambitious startups launch, validate and grow.",
    services: [
      "MVP Development",
      "Launch Websites",
      "Growth Systems",
    ],
  },

  {
    name: "Finance",
    description:
      "Professional digital experiences designed around trust, clarity and credibility.",
    services: [
      "Corporate Websites",
      "Service Pages",
      "Lead Generation",
    ],
  },

  {
    name: "Local Businesses",
    description:
      "Digital presence and marketing systems that help local businesses get discovered and generate enquiries.",
    services: [
      "Business Websites",
      "Local SEO",
      "Lead Generation",
    ],
  },

  {
    name: "Fashion & Lifestyle",
    description:
      "Visually engaging digital experiences that turn brand identity into memorable customer journeys.",
    services: [
      "Brand Websites",
      "E-commerce",
      "Social Campaigns",
    ],
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
  const shouldReduceMotion = useReducedMotion();
  const [showViewer, setShowViewer] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(null);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

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
            INTRO
        ========================================================== */}
        <section className="relative bg-[#f7f7f4] py-20 dark:bg-[#0b0b0b] sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8bc53f]">
                  About ScrollFuel
                </p>

                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-[-0.03em] text-black dark:text-white sm:text-5xl">
                  Creating digital
                  <span className="block text-[#8bc53f]">
                    experiences that drive growth.
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <p className="text-lg leading-8 text-black/65 dark:text-white/60">
                  ScrollFuel Digital Marketing Agency is a creative and
                  results-driven agency helping businesses build a strong
                  digital presence through innovative marketing strategies and
                  creative solutions.
                </p>

                <p className="mt-5 text-lg leading-8 text-black/65 dark:text-white/60">
                  We combine creativity, technology and performance to help
                  brands increase visibility, generate quality leads and work
                  towards long-term business growth.
                </p>

                <div className="mt-8 h-px w-full bg-black/10 dark:bg-white/10" />

                <div className="mt-7 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#8bc53f]" />

                  <div>
                    <p className="font-semibold text-black dark:text-white">
                      Digital Energy to Your Business
                    </p>

                    <p className="text-sm text-black/50 dark:text-white/40">
                      Creativity backed by strategy
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
    INDUSTRIES
========================================================= */}

        <section className="relative overflow-hidden bg-[#f7f7f4] py-20 dark:bg-[#0b0b0b] sm:py-28">
          {/* Background Decoration */}
          <div className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-[#8bc53f]/10 blur-[140px]" />
          <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#8bc53f]/5 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

            {/* Heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="max-w-3xl"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8bc53f]">
                Industries We Build For
              </span>

              <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-black dark:text-white sm:text-6xl lg:text-7xl">
                Different
                <br />
                industries.
                <br />
                <span className="text-[#8bc53f]">
                  One growth mindset.
                </span>
              </h2>

            </motion.div>

            {/* =========================================================
        INDUSTRY CARDS
    ========================================================== */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {industries.map((industry, index) => {
                const isActive = activeIndustry === industry.name;
                const hasProjects =
                  industry.projects && industry.projects.length > 0;

                return (
                  <motion.button
                    key={industry.name}
                    type="button"
                    variants={fadeUp}
                    onClick={() => {
                      if (hasProjects) {
                        // Open project popup
                        setActiveIndustry(industry.name);
                        setShowProjectsModal(true);
                      } else {
                        // Keep normal industry card behavior
                        setActiveIndustry(
                          isActive ? null : industry.name
                        );
                      }
                    }}
                    aria-expanded={hasProjects ? showProjectsModal : isActive}
                    aria-haspopup={hasProjects ? "dialog" : undefined}
                    className={`group relative w-full overflow-hidden rounded-3xl border p-6 text-left outline-none transition-all duration-500
              focus-visible:ring-2
              focus-visible:ring-[#8bc53f]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#f7f7f4]
              dark:focus-visible:ring-offset-[#0b0b0b]
              ${isActive && !hasProjects
                        ? "border-[#8bc53f] bg-[#8bc53f] shadow-xl shadow-[#8bc53f]/10"
                        : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#8bc53f]/50 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/20"
                      }`}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-xs font-bold tracking-[0.2em] ${isActive && !hasProjects
                            ? "text-black/40"
                            : "text-black/30 dark:text-white/25"
                          }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isActive && !hasProjects
                            ? "rotate-90 bg-black text-white"
                            : "bg-black/5 text-black/40 group-hover:bg-[#8bc53f] group-hover:text-black dark:bg-white/5 dark:text-white/40"
                          }`}
                      >
                        {hasProjects ? (
                          <ExternalLink
                            size={16}
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDown
                            size={17}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>

                    {/* Industry Name */}
                    <h3
                      className={`mt-10 font-serif text-2xl font-bold sm:text-3xl ${isActive && !hasProjects
                          ? "text-black"
                          : "text-black dark:text-white"
                        }`}
                    >
                      {industry.name}
                    </h3>

                    {/* Description */}
                    <p
                      className={`mt-3 min-h-[72px] text-sm leading-6 ${isActive && !hasProjects
                          ? "text-black/65"
                          : "text-black/50 dark:text-white/40"
                        }`}
                    >
                      {industry.description}
                    </p>

                    {/* Services */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {industry.services.map((service) => (
                        <span
                          key={service}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${isActive && !hasProjects
                              ? "border-black/15 bg-black/5 text-black/70"
                              : "border-black/10 text-black/60 group-hover:border-[#8bc53f]/30 dark:border-white/10 dark:text-white/50"
                            }`}
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Project Count */}
                    {hasProjects && (
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8bc53f]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8bc53f]" />

                        {industry.projects.length}{" "}
                        {industry.projects.length === 1
                          ? "Project"
                          : "Projects"}{" "}
                        Worked On
                      </div>
                    )}

                    {/* Explore / View Projects */}
                    <div
                      className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${hasProjects
                          ? "text-[#8bc53f]"
                          : isActive
                            ? "text-black"
                            : "text-black/35 dark:text-white/30"
                        }`}
                    >
                      {hasProjects ? "View Projects" : "Explore Industry"}

                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>

                    {/* Bottom Accent */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${isActive && !hasProjects
                          ? "w-full bg-black"
                          : "w-0 bg-[#8bc53f] group-hover:w-full"
                        }`}
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* =========================================================
        PROJECTS POPUP
    ========================================================== */}
            {showProjectsModal && activeIndustry && (
              <div
                className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
                role="dialog"
                aria-modal="true"
                aria-labelledby="industry-projects-title"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    setShowProjectsModal(false);
                  }
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111]"
                >
                  {/* Modal Header */}
                  <div className="flex items-start justify-between border-b border-black/10 p-6 dark:border-white/10 sm:p-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-[#8bc53f]" />

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8bc53f]">
                          Selected Work
                        </span>
                      </div>

                      <h3
                        id="industry-projects-title"
                        className="mt-4 font-serif text-3xl font-bold tracking-[-0.03em] text-black dark:text-white sm:text-4xl"
                      >
                        {activeIndustry}
                        <span className="text-[#8bc53f]">
                          {" "}
                          projects.
                        </span>
                      </h3>

                      <p className="mt-2 text-sm text-black/50 dark:text-white/40">
                        Explore the projects we have worked on in the{" "}
                        {activeIndustry.toLowerCase()} industry.
                      </p>
                    </div>

                    {/* Close */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowProjectsModal(false);
                        setActiveIndustry(null);
                      }}
                      aria-label="Close projects popup"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/50 transition-all duration-300 hover:border-[#8bc53f] hover:bg-[#8bc53f] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8bc53f] dark:border-white/10 dark:text-white/50"
                    >
                      <X size={19} aria-hidden="true" />
                    </button>
                  </div>

                  {/* Project List */}
                  <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {industries
                        .find(
                          (industry) =>
                            industry.name === activeIndustry
                        )
                        ?.projects?.map((project, index) => (
                          <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.name} website`}
                            className="group relative overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f4] p-5 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#8bc53f]/60 hover:shadow-lg hover:shadow-[#8bc53f]/10 focus-visible:ring-2 focus-visible:ring-[#8bc53f] dark:border-white/10 dark:bg-white/[0.04]"
                          >
                            {/* Glow */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#8bc53f]/10 blur-2xl transition-all duration-500 group-hover:bg-[#8bc53f]/20" />

                            <div className="relative">
                              {/* Number + External Icon */}
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-black/30 dark:text-white/25">
                                  {String(index + 1).padStart(2, "0")}
                                </span>

                                <ExternalLink
                                  size={17}
                                  aria-hidden="true"
                                  className="text-black/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#8bc53f] dark:text-white/30"
                                />
                              </div>

                              {/* Project Name */}
                              <h4 className="mt-7 font-serif text-xl font-bold text-black dark:text-white">
                                {project.name}
                              </h4>

                              {/* Project URL */}
                              <p className="mt-3 break-all text-xs leading-5 text-black/40 dark:text-white/30">
                                {project.url}
                              </p>

                              {/* View Link */}
                              <div className="mt-5 flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8bc53f]">
                                  View Live Project
                                </span>

                                <ArrowRight
                                  size={15}
                                  aria-hidden="true"
                                  className="text-[#8bc53f] transition-transform group-hover:translate-x-1"
                                />
                              </div>
                            </div>
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="border-t border-black/10 bg-[#f7f7f4] px-6 py-4 dark:border-white/10 dark:bg-white/[0.02] sm:px-8">
                    <p className="text-center text-xs text-black/40 dark:text-white/30">
                      Click any project to open the live website in a new tab.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* =========================================================
        CTA
    ========================================================== */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl  p-7 sm:p-10 md:flex-row md:items-center"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8bc53f]">
                  Have a project in mind?
                </p>

                <h3 className="mt-3 max-w-xl font-serif text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Let's build something your customers remember.
                </h3>
              </div>

              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#8bc53f] px-6 py-3.5 text-sm font-bold text-black outline-none transition-all duration-300 hover:bg-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#8bc53f] focus-visible:ring-offset-2 focus-visible:ring-offset-black dark:hover:bg-black dark:hover:text-white"
              >
                Start Your Project

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
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