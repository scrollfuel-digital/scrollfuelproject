import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const projects = [
  // ── BRANDING ──────────────────────────────────────────────────
  {
    id: 5,
    title: "PropScroll",
    category: "Branding",
    year: "2024",
    client: "PropScroll",
    cover: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
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
  {
    id: 6,
    title: "Mali Kutumb",
    category: "Branding",
    year: "2024",
    client: "Mali Kutumb",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tag: "06",
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

  // ── 3D ANIMATION ─────────────────────────────────────────────
  {
    id: 7,
    title: "Koseli",
    category: "3D Animation",
    year: "2024",
    client: "Koseli",
    cover: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&q=80",
    tag: "07",
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
    id: 8,
    title: "Lotus",
    category: "3D Animation",
    year: "2024",
    client: "Lotus",
    cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tag: "08",
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

  // ── LOGO DESIGNING ────────────────────────────────────────────
  {
    id: 11,
    title: "Purana Plot",
    category: "Logo Designing",
    year: "2024",
    client: "Purana Plot",
    cover: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    tag: "11",
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
    id: 12,
    title: "HouseScroll",
    category: "Logo Designing",
    year: "2024",
    client: "HouseScroll",
    cover: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=800&q=80",
    tag: "12",
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

  // ── MARKETING ─────────────────────────────────────────────────
  {
    id: 13,
    title: "Marketing Campaign",
    category: "Marketing",
    year: "2024",
    client: "Various Clients",
    cover: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
    tag: "13",
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
];

const categories = [
  { label: "Social Media Marketing", slug: "social-media-marketing" },
  { label: "Branding",               slug: "branding" },
  { label: "Logo Designing",         slug: "logo-designing" },
  { label: "Video",                  slug: "video" },
  { label: "3D Animation",           slug: "3d-animation" },
];

const slugToCategory = Object.fromEntries(
  categories.map(({ label, slug }) => [slug, label])
);



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
          <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
            {project.category} · {project.year}
          </p>
        </div>

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
  const { category: categorySlug } = useParams();
  const activeFilter = slugToCategory[categorySlug] ?? null;

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

  const [activeProject, setActiveProject] = useState(() => {
    try {
      const savedId = sessionStorage.getItem("activeProjectId");
      return savedId ? projects.find((p) => p.id === Number(savedId)) ?? null : null;
    } catch {
      return null;
    }
  });

  const openProject = (project) => {
    setActiveProject(project);
    try { sessionStorage.setItem("activeProjectId", project.id); } catch { }
    window.history.pushState({ projectId: project.id }, "", `#project-${project.id}`);
  };

  const closeProject = () => {
    setActiveProject(null);
    try { sessionStorage.removeItem("activeProjectId"); } catch { }
    if (window.history.state?.projectId) window.history.back();
  };

  useEffect(() => {
    const handlePop = () => {
      setActiveProject(null);
      try { sessionStorage.removeItem("activeProjectId"); } catch { }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const filtered = activeFilter
    ? projects.filter((p) => p.category === activeFilter)
    : projects;

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
      <header className="relative px-6 md:px-16 pt-24 pb-16 flex flex-col items-center justify-center border-b border-black/10 dark:border-white/10 overflow-hidden gap-6">
        
        <h1
          className="relative z-10 font-black leading-[0.92] tracking-tighter dark:text-white text-center"
          style={{ fontSize: "clamp(32px, 9vw, 52px)" }}
        >
          Our <span className="text-primary italic">Portfolio</span>
        </h1>
      </header>

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