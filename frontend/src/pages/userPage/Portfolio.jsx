
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    // title: "Pulse Brand Identity",
    category: "Branding",
    // year: "2024",
    // client: "Pulse Studio",
    cover: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
    tag: "01",
    accent: "primary",
    gallery: [
      "./assets/portfolio/propscroll.jpeg",
      "./assets/portfolio/getfit.jpeg",
      "./assets/portfolio/M1.jpeg",
      "./assets/portfolio/portfolio3.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
    ],
  },
  {
    id: 2,
    category: "Social Media",
    // year: "2024",
    // client: "Drifthaus",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tag: "02",
    accent: "secondary",
    gallery: [
      "./assets/portfolio/propscroll.jpeg",
      "./assets/portfolio/getfit.jpeg",
      "./assets/portfolio/M1.jpeg",
      "./assets/portfolio/portfolio3.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
    ],
  },
  {
    id: 3,
    // title: "Arcane Logo Suite",
    category: "Logo Designing",
    // year: "2023",
    // client: "Arcane Labs",
    cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tag: "03",
    accent: "primary",
    gallery: [
      "./assets/portfolio/propscroll.jpeg",
      "./assets/portfolio/getfit.jpeg",
      "./assets/portfolio/M1.jpeg",
      "./assets/portfolio/portfolio3.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
    ],
  },
  {
    id: 4,
    // title: "Vortex Motion Reel",
    category: "Animation",
    // year: "2024",
    // client: "Vortex Creative",
    cover: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
    tag: "04",
    accent: "secondary",
    gallery: [
      "./assets/portfolio/propscroll.jpeg",
      "./assets/portfolio/getfit.jpeg",
      "./assets/portfolio/M1.jpeg",
      "./assets/portfolio/portfolio3.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
    ],
  },
  {
    id: 5,
    // title: "Helix 3D Renders",
    category: "3D Work",
    // year: "2023",
    // client: "Helix Digital",
    cover: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&q=80",
    tag: "05",
    accent: "primary",
    gallery: [
      "./assets/portfolio/propscroll.jpeg",
      "./assets/portfolio/getfit.jpeg",
      "./assets/portfolio/M1.jpeg",
      "./assets/portfolio/portfolio3.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
      "./assets/portfolio/scrollfuel.jpeg",
    ],
  },
];

const filters = [
  "All", "Branding", "Social Media",
  "Logo Designing", "Animation", "3D Work", "Marketing",
];

const DM_ICONS = [
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><rect x="3" y="12" width="4" height="9" /><rect x="10" y="7" width="4" height="14" /><rect x="17" y="3" width="4" height="18" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M4 4l6 18 3-7 7-3z" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><rect x="2" y="7" width="14" height="10" rx="2" /><path d="m16 11 6-4v10l-6-4z" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 16 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> },
  { svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> },
];

const BG_ICONS = Array.from({ length: 24 }, (_, i) => ({
  icon: DM_ICONS[i % DM_ICONS.length],
  left: `${5 + ((i * 37 + 13) % 90)}%`,
  top: `${5 + ((i * 53 + 7) % 88)}%`,
  duration: `${10 + (i % 7) * 2.5}s`,
  delay: `-${(i * 1.8) % 14}s`,
  opacity: 0.06 + (i % 4) * 0.025,
  scale: 0.8 + (i % 3) * 0.2,
}));

function CollageModal({ project, onClose, darkMode }) {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const total = project.gallery.length;
  const intervalRef = useRef(null);

  const mod = (n, m) => ((n % m) + m) % m;

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => mod(prev + 1, total));
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, [paused, total]);

  const slots = [
    { offset: -1, pos: "left" },
    { offset: 0, pos: "center" },
    { offset: 1, pos: "right" },
  ];

  const styleMap = {
    left: { x: "-220px", scale: 0.78, opacity: 0.45, blur: "1px", zIndex: 5 },
    center: { x: "0px", scale: 1, opacity: 1, blur: "0px", zIndex: 20 },
    right: { x: "220px", scale: 0.78, opacity: 0.45, blur: "1px", zIndex: 5 },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: darkMode ? "rgba(15,15,15,0.98)" : "rgba(255,255,255,0.98)",
        color: darkMode ? "#ffffff" : "#0f172a",
      }}
    >

      {/* HEADER */}
      <div
        className="relative z-10 flex justify-between items-center px-6 py-4"
        style={{ borderBottom: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)" }}
      >
        <div>
          <h2 className="font-bold text-lg">{project.title}</h2>
          <p className="text-xs mt-0.5" style={{ color: darkMode ? "#9ca3af" : "#9ca3af" }}>
            {project.category} · {project.year}
          </p>
        </div>

        {/* ── CLOSE / BACK BUTTON ── */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            border: darkMode ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
            background: "transparent",
            color: darkMode ? "#ffffff" : "#0f172a",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
      </div>

      {/* CAROUSEL */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative" style={{ width: "600px", height: "420px" }}>
          {slots.map(({ offset, pos }) => {
            const imgIndex = mod(index + offset, total);
            const s = styleMap[pos];

            return (
              <div
                key={pos}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: s.zIndex,
                  transform: `translate(-50%, -50%) translateX(${s.x}) scale(${s.scale})`,
                  opacity: s.opacity,
                  filter: `blur(${s.blur})`,
                  transition: "transform 0.55s cubic-bezier(0.23,1,0.32,1), opacity 0.55s ease, filter 0.55s ease",
                }}
              >
                <div
                  style={{
                    width: pos === "center" ? "220px" : "180px",
                    height: pos === "center" ? "340px" : "280px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: pos === "center"
                      ? "0 24px 60px rgba(0,0,0,0.22)"
                      : "0 8px 24px rgba(0,0,0,0.10)",
                    transition: "width 0.55s cubic-bezier(0.23,1,0.32,1), height 0.55s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <img
                    src={project.gallery[imgIndex]}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {pos === "center" && (
                  <div style={{ textAlign: "center", marginTop: "14px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#8bc53f", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {imgIndex + 1} / {total}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DOTS */}
      <div className="relative z-10 flex justify-center gap-2 pb-6">
        {project.gallery.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              height: "7px",
              width: i === index ? "22px" : "7px",
              borderRadius: "999px",
              background: i === index ? "#8bc53f" : darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = project.accent === "primary";

  return (
    // <div
    //   className={`
    //     group relative rounded-2xl overflow-hidden cursor-pointer width-[100%]
    //     h-[800px] md:h-[420px] lg:h-[480px] bg-[#0f172a]
    //     border border-black/10 dark:border-white/10
    //     transition-all duration-500 ease-out
    //     ${hovered ? "-translate-y-2 shadow-primary-lg" : "translate-y-0 shadow-md"}
    //   `}
    //   onMouseEnter={() => setHovered(true)}
    //   onMouseLeave={() => setHovered(false)}
    //   onClick={onClick}
    // >
    //   {/* NUMBER TAG */}
    //   <span
    //     className={`
    //       absolute top-4 right-4 z-10 font-serif text-3xl font-bold leading-none
    //       transition-all duration-300
    //       ${hovered ? "text-white/60 scale-110" : "text-white/20"}
    //     `}
    //   >
    //     {project.tag}
    //   </span>

    //   {/* IMAGE LAYER */}
    //   <div className="absolute inset-0 z-0">
    //     <img
    //       src={project.cover}
    //       alt={project.title}
    //       className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? "scale-110" : "scale-100"}`}
    //     />
    //     <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
    //   </div>

    //   {/* CLICK HINT ICON */}
    //   <div className={`
    //     absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
    //     w-14 h-14 rounded-full border-2 flex items-center justify-center
    //     transition-all duration-400
    //     ${isPrimary ? "border-primary" : "border-secondary"}
    //     ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}
    //     bg-black/30 backdrop-blur-sm
    //   `}>
    //     <span className={`text-2xl ${isPrimary ? "text-primary" : "text-secondary"}`}>⊕</span>
    //   </div>

    //   {/* STATIC LABEL */}
    //   <div className={`
    //     absolute bottom-0 left-0 right-0 z-10 px-5 py-5 pointer-events-none
    //     transition-opacity duration-300
    //     ${hovered ? "opacity-0" : "opacity-100"}
    //   `}>
    //     <p className="text-[10px] font-sans font-semibold tracking-[0.28em] uppercase text-white/50 mb-1">
    //       {project.category}
    //     </p>
    //     <h3 className="font-serif text-lg md:text-xl font-bold text-white leading-tight">
    //       {project.title}
    //     </h3>
    //   </div>

    //   {/* SLIDE-UP INFO PANEL */}
    //   <div className={`
    //     absolute bottom-0 left-0 right-0 z-20 rounded-b-2xl
    //     bg-white/95 dark:bg-black/95 backdrop-blur-xl
    //     border-t-[3px] ${isPrimary ? "border-primary" : "border-secondary"}
    //     transition-transform duration-500 ease-out
    //     ${hovered ? "translate-y-0" : "translate-y-full"}
    //   `}>
    //     <div className="flex flex-col gap-2 px-5 py-5">
    //       <p className={`text-[10px] font-sans font-bold tracking-[0.3em] uppercase ${isPrimary ? "text-primary" : "text-secondary"}`}>
    //         {project.category}
    //       </p>
    //       <h3 className="font-serif text-xl font-bold dark:text-white leading-tight tracking-tight">
    //         {project.title}
    //       </h3>
    //       <div className="flex justify-between items-center text-xs text-muted font-sans font-medium mt-0.5">
    //         <span>{project.client}</span>
    //         <span>{project.year}</span>
    //       </div>
    //       <div
    //         className={`
    //           mt-3 self-start inline-flex items-center gap-2
    //           px-5 py-2.5 rounded-full
    //           text-[11px] font-sans font-bold tracking-widest uppercase
    //           cursor-pointer
    //           ${isPrimary ? "bg-primary text-white shadow-primary" : "bg-secondary text-dark"}
    //         `}
    //       >
    //         View Project
    //         <span className={`inline-block transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}>
    //           →
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className={`
    group relative rounded-2xl overflow-hidden cursor-pointer w-full
    h-[700px] md:h-[580px] lg:h-[640px] bg-[#0f172a]
    border border-black/10 dark:border-white/10
    transition-all duration-500 ease-out
    ${hovered ? "-translate-y-2 shadow-primary-lg" : "translate-y-0 shadow-md"}
  `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* NUMBER TAG */}
      <span
        className={`
      absolute top-6 right-6 z-10 font-serif text-4xl font-bold leading-none
      transition-all duration-300
      ${hovered ? "text-white/60 scale-110" : "text-white/20"}
    `}
      >
        {project.tag}
      </span>

      {/* IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.cover}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
      </div>

      {/* CLICK HINT ICON */}
      <div className={`
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
    w-16 h-16 rounded-full border-2 flex items-center justify-center
    transition-all duration-400
    ${isPrimary ? "border-primary" : "border-secondary"}
    ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}
    bg-black/30 backdrop-blur-sm
  `}>
        <span className={`text-3xl ${isPrimary ? "text-primary" : "text-secondary"}`}>⊕</span>
      </div>

      {/* STATIC LABEL */}
      <div className={`
    absolute bottom-0 left-0 right-0 z-10 px-7 py-7 pointer-events-none
    transition-opacity duration-300
    ${hovered ? "opacity-0" : "opacity-100"}
  `}>
        <p className="text-[10px] font-sans font-semibold tracking-[0.28em] uppercase text-white/50 mb-1.5">
          {project.category}
        </p>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-tight">
          {project.title}
        </h3>
      </div>

      {/* SLIDE-UP INFO PANEL */}
      <div className={`
    absolute bottom-0 left-0 right-0 z-20 rounded-b-2xl
    bg-white/95 dark:bg-black/95 backdrop-blur-xl
    border-t-[3px] ${isPrimary ? "border-primary" : "border-secondary"}
    transition-transform duration-500 ease-out
    ${hovered ? "translate-y-0" : "translate-y-full"}
  `}>
        <div className="flex flex-col gap-3 px-7 py-7">
          <p className={`text-[10px] font-sans font-bold tracking-[0.3em] uppercase ${isPrimary ? "text-primary" : "text-secondary"}`}>
            {project.category}
          </p>
          <h3 className="font-serif text-2xl font-bold dark:text-white leading-tight tracking-tight">
            {project.title}
          </h3>
          <div className="flex justify-between items-center text-xs text-muted font-sans font-medium mt-0.5">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
          <div
            className={`
          mt-4 self-start inline-flex items-center gap-2
          px-6 py-3 rounded-full
          text-[11px] font-sans font-bold tracking-widest uppercase
          cursor-pointer
          ${isPrimary ? "bg-primary text-white shadow-primary" : "bg-secondary text-dark"}
        `}
          >
            View Project
            <span className={`inline-block transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}>
              →
            </span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  // ── Detect dark mode from <html> class (Tailwind) ──
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // ── Restore active project from sessionStorage on refresh ──
  const [activeProject, setActiveProject] = useState(() => {
    try {
      const savedId = sessionStorage.getItem("activeProjectId");
      return savedId ? projects.find((p) => p.id === Number(savedId)) ?? null : null;
    } catch {
      return null;
    }
  });

  // ── Open modal: save to session + push history ──
  const openProject = (project) => {
    setActiveProject(project);
    try {
      sessionStorage.setItem("activeProjectId", project.id);
    } catch { }
    window.history.pushState({ projectId: project.id }, "", `#project-${project.id}`);
  };

  // ── Close modal: clear session + go back in history ──
  const closeProject = () => {
    setActiveProject(null);
    try {
      sessionStorage.removeItem("activeProjectId");
    } catch { }
    if (window.history.state?.projectId) {
      window.history.back();
    }
  };

  // ── Browser back button closes modal ──
  useEffect(() => {
    const handlePop = () => {
      setActiveProject(null);
      try {
        sessionStorage.removeItem("activeProjectId");
      } catch { }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white font-sans pb-24 select-none">

      <div dangerouslySetInnerHTML={{
        __html: `<style>
          @keyframes pfFadeUp {
            from { opacity:0; transform:translateY(28px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes modalIn {
            from { opacity:0; transform:translateY(40px); }
            to   { opacity:1; transform:translateY(0); }
          }
        </style>`
      }} />

      {/* HEADER */}
      <header className="relative px-16 pt-24 pb-16 flex items-end justify-between border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,197,63,0.2) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="z-10 w-1/3"></div>
        <div className="absolute left-1/2 top-28 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <h1
            className="font-black leading-[0.92] tracking-tighter dark:text-white"
            style={{ fontSize: "clamp(5px, 9vw, 50px)" }}
          >
            Our <span className="text-primary italic">Portfolio</span>
          </h1>
        </div>
      </header>

      {/* FILTER BAR */}
      <nav className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
        <div className="hidden md:flex flex-wrap items-center gap-2 px-16 py-4">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted mr-3">Filter</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`
                px-5 py-2 rounded-full text-[13px] font-sans font-medium border
                transition-all duration-200 cursor-pointer outline-none
                ${activeFilter === f
                  ? "bg-primary border-primary text-white font-semibold shadow-primary"
                  : "bg-transparent border-black/10 dark:border-white/10 text-muted hover-border-primary hover-text-primary"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="md:hidden flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          <span className="text-[9px] font-semibold tracking-widest uppercase text-muted shrink-0 mr-1">Filter</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`
                shrink-0 px-4 py-1.5 rounded-full text-xs font-sans font-medium border
                transition-all duration-200 cursor-pointer outline-none whitespace-nowrap
                ${activeFilter === f
                  ? "bg-primary border-primary text-white font-semibold shadow-primary"
                  : "bg-transparent border-black/10 dark:border-white/10 text-muted"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </nav>

      {/* GRID */}
      <div
        className="grid gap-4 md:gap-7 px-4 md:px-16 py-8 md:py-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}
      >
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted text-xs font-semibold tracking-[0.2em] uppercase">
            No projects in this category
          </div>
        ) : (
          filtered.map((project, i) => (
            <div
              key={project.id}
              style={{
                animation: "pfFadeUp 0.55s cubic-bezier(0.23,1,0.32,1) both",
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <ProjectCard
                project={project}
                onClick={() => openProject(project)}
              />
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {activeProject && (
        <CollageModal
          project={activeProject}
          onClose={closeProject}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}