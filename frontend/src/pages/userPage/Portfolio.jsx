import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Pulse Brand Identity",
    category: "Branding",
    year: "2024",
    client: "Pulse Studio",
    cover: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
    tag: "01",
    accent: "primary",
    gallery: [
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
  },
  {
    id: 2,
    title: "Neon Drift Campaign",
    category: "Social Media",
    year: "2024",
    client: "Drifthaus",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tag: "02",
    accent: "secondary",
    gallery: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
      "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
    ],
  },
  {
    id: 3,
    title: "Arcane Logo Suite",
    category: "Logo Designing",
    year: "2023",
    client: "Arcane Labs",
    cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tag: "03",
    accent: "primary",
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&q=80",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
  },
  {
    id: 4,
    title: "Vortex Motion Reel",
    category: "Animation",
    year: "2024",
    client: "Vortex Creative",
    cover: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
    tag: "04",
    accent: "secondary",
    gallery: [
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&q=80",
    ],
  },
  {
    id: 5,
    title: "Helix 3D Renders",
    category: "3D Work",
    year: "2023",
    client: "Helix Digital",
    cover: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&q=80",
    tag: "05",
    accent: "primary",
    gallery: [
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&q=80",
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
    ],
  },
  {
    id: 6,
    title: "Ember SEO Growth",
    category: "Marketing",
    year: "2024",
    client: "Ember Corp",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tag: "06",
    accent: "secondary",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    ],
  },
  {
    id: 7,
    title: "Crystal UI System",
    category: "Branding",
    year: "2024",
    client: "Crystal Labs",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "07",
    accent: "secondary",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    ],
  },
  {
    id: 8,
    title: "Prism Social Kit",
    category: "Social Media",
    year: "2023",
    client: "Prism Agency",
    cover: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80",
    tag: "08",
    accent: "primary",
    gallery: [
      "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
  },
];

const filters = [
  "All", "Branding", "Social Media",
  "Logo Designing", "Animation", "3D Work", "Marketing",
];

function CollageModal({ project, onClose }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const isPrimary = project.accent === "primary";
  const total = project.gallery.length;

  const goPrev = () => setLightboxIdx((i) => (i > 0 ? i - 1 : total - 1));
  const goNext = () => setLightboxIdx((i) => (i < total - 1 ? i + 1 : 0));

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-dark"
      style={{ animation: "modalIn 0.35s cubic-bezier(0.23,1,0.32,1) both" }}
    >

      {/* ── STICKY TOP BAR ── */}
      <div className="shrink-0 sticky top-0 z-20 flex items-center justify-between px-4 md:px-10 py-4 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? "bg-primary" : "bg-secondary"}`} />
          <div>
            <p className={`text-[10px] font-bold tracking-[0.25em] uppercase ${isPrimary ? "text-primary" : "text-secondary"}`}>
              {project.category}
            </p>
            <h2 className="font-serif text-base md:text-xl font-bold text-dark dark:text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* meta pills */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Client", value: project.client },
            { label: "Year", value: project.year },
            { label: "Photos", value: `${total} Images` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-[9px] tracking-widest uppercase text-muted font-semibold">{label}</p>
              <p className="text-sm font-sans font-semibold text-dark dark:text-white">{value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-muted hover-text-primary hover-border-primary transition-all duration-200 text-base"
        >
          ✕
        </button>
      </div>

      {/* mobile meta row */}
      <div className="md:hidden shrink-0 flex gap-5 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-white dark:bg-dark">
        {[
          { label: "Client", value: project.client },
          { label: "Year", value: project.year },
          { label: "Photos", value: `${total}` },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[9px] tracking-widest uppercase text-muted font-semibold">{label}</p>
            <p className="text-xs font-sans font-semibold text-dark dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* ── SCROLLABLE GALLERY AREA ── */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">

        {/* ── HERO IMAGE — full width, fixed height ── */}
        <div
          className="w-full rounded-2xl overflow-hidden cursor-zoom-in mb-5 relative group"
          style={{ height: "clamp(200px, 40vw, 420px)" }}
          onClick={() => setLightboxIdx(0)}
        >
          <img
            src={project.gallery[0]}
            alt="hero"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
            <span className={`
              w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl
              opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
              transition-all duration-300 backdrop-blur-sm bg-black/20
              ${isPrimary ? "border-primary text-primary" : "border-secondary text-secondary"}
            `}>⊕</span>
          </div>
          {/* index badge */}
          <span className="absolute bottom-3 right-3 text-[10px] font-bold tracking-widest text-white/60 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
            1 / {total}
          </span>
        </div>

        {/* ── UNIFORM GRID — 3 cols desktop, 2 cols tablet, 1 col mobile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.gallery.slice(1).map((img, idx) => {
            const realIdx = idx + 1; // actual index in gallery array
            return (
              <div
                key={idx}
                className="relative group rounded-2xl overflow-hidden cursor-zoom-in bg-black/5 dark:bg-white/5"
                style={{ aspectRatio: "4/3" }}
                onClick={() => setLightboxIdx(realIdx)}
              >
                <img
                  src={img}
                  alt={`gallery ${realIdx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                />
                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className={`
                    w-11 h-11 rounded-full border-2 flex items-center justify-center text-xl
                    opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                    transition-all duration-300 backdrop-blur-sm bg-black/20
                    ${isPrimary ? "border-primary text-primary" : "border-secondary text-secondary"}
                  `}>⊕</span>
                </div>
                {/* index badge */}
                <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold tracking-widest text-white/60 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                  {realIdx + 1} / {total}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── LIGHTBOX OVERLAY ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setLightboxIdx(null)}
        >
          {/* image */}
          <img
            src={project.gallery[lightboxIdx]}
            alt=""
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            onClick={() => setLightboxIdx(null)}
          >✕</button>

          {/* prev */}
          {total > 1 && (
            <button
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border text-xl font-bold transition-all
                ${isPrimary ? "border-primary text-primary bg-black/40 hover:bg-primary hover:text-white" : "border-secondary text-secondary bg-black/40 hover:bg-secondary hover:text-dark"}`}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >‹</button>
          )}

          {/* next */}
          {total > 1 && (
            <button
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border text-xl font-bold transition-all
                ${isPrimary ? "border-primary text-primary bg-black/40 hover:bg-primary hover:text-white" : "border-secondary text-secondary bg-black/40 hover:bg-secondary hover:text-dark"}`}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >›</button>
          )}

          {/* counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {project.gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                className={`rounded-full transition-all duration-200 ${i === lightboxIdx
                  ? `w-6 h-2 ${isPrimary ? "bg-primary" : "bg-secondary"}`
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = project.accent === "primary";

  return (
    <div
      className={`
        group relative rounded-2xl overflow-hidden cursor-pointer
        aspect-[4/5] bg-white dark:bg-dark
        border border-black/10 dark:border-white/10
        transition-all duration-500 ease-out
        ${hovered ? "-translate-y-2 shadow-primary-lg" : "translate-y-0 shadow-md"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // onClick={onClick}
    >
      {/* NUMBER TAG */}
      <span
        className={`
          absolute top-4 right-4 z-10 font-serif text-3xl font-bold leading-none
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
        w-14 h-14 rounded-full border-2 flex items-center justify-center
        transition-all duration-400
        ${isPrimary ? "border-primary" : "border-secondary"}
        ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}
        bg-black/30 backdrop-blur-sm
      `}>
        <span className={`text-2xl ${isPrimary ? "text-primary" : "text-secondary"}`}>⊕</span>
      </div>

      {/* STATIC LABEL (before hover) */}
      <div className={`
        absolute bottom-0 left-0 right-0 z-10 px-5 py-5 pointer-events-none
        transition-opacity duration-300
        ${hovered ? "opacity-0" : "opacity-100"}
      `}>
        <p className="text-[10px] font-sans font-semibold tracking-[0.28em] uppercase text-white/50 mb-1">
          {project.category}
        </p>
        <h3 className="font-serif text-lg md:text-xl font-bold text-white leading-tight">
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
        <div className="flex flex-col gap-2 px-5 py-5">
          <p className={`text-[10px] font-sans font-bold tracking-[0.3em] uppercase ${isPrimary ? "text-primary" : "text-secondary"}`}>
            {project.category}
          </p>
          <h3 className="font-serif text-xl font-bold dark:text-white leading-tight tracking-tight">
            {project.title}
          </h3>
          <div className="flex justify-between items-center text-xs text-muted font-sans font-medium mt-0.5">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
          <div
            // onClick={() => window.open("https://your-project-url.com", "_blank")}
            className={`
    mt-3 self-start inline-flex items-center gap-2
    px-5 py-2.5 rounded-full
    text-[11px] font-sans font-bold tracking-widest uppercase
    cursor-pointer
    ${isPrimary ? "bg-primary text-white shadow-primary" : "bg-secondary text-dark"}
  `}
          >
            View Project
            <span
              className={`inline-block transition-transform duration-300 ${hovered ? "translate-x-1" : ""
                }`}
            >
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
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white font-sans pb-24">

      {/* keyframe injection */}
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

      {/* ──────────── HEADER ──────────── */}
      <header className="relative px-16 pt-24 pb-16 flex items-end justify-between border-b border-black/10 dark:border-white/10 overflow-hidden">

        {/* dot-grid decorative bg */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(139,197,63,0.2) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* LEFT (empty or keep spacing) */}
        <div className="z-10 w-1/3"></div>

        {/* CENTER — TITLE */}
        <div className="absolute left-1/2 top-28 -translate-x-1/2 -translate-y-1/2 z-10 text-center ">
          <h1
            className="font-black leading-[0.92] tracking-tighter dark:text-white"
            style={{ fontSize: "clamp(56px, 9vw, 16px)" }} // ⚠️ fixed typo (11px → 110px)
          >
            Our
            <span className="text-primary italic">Portfolio</span>
          </h1>
        </div>

      </header>

      {/* ──────────── FILTER BAR — desktop horizontal / mobile scrollable ──────────── */}
      <nav className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
        {/* Desktop */}
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

        {/* Mobile — horizontal scroll */}
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

      {/* ──────────── GRID ──────────── */}
      <div
        className="grid gap-4 md:gap-7 px-4 md:px-16 py-8 md:py-14"
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
                onClick={() => setActiveProject(project)}
              />
            </div>
          ))
        )}
      </div>

      {/* ──────────── COLLAGE MODAL ──────────── */}
      {activeProject && (
        <CollageModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}