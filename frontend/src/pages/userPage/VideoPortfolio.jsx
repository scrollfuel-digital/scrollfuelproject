import { useEffect, useRef, useState } from "react";

const aiVideos = [
  {
    id: 1,
    title: "PropScroll – AI Promo",
    client: "PropScroll",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 2,
    title: "AI Brand Story",
    client: "Fitbelly",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 3,
    title: "AI Product Reveal",
    client: "Koseli",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 4,
    title: "AI Social Reel",
    client: "HouseScroll",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 5,
    title: "AI Campaign Cut",
    client: "Mali Kutumb",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
];

const normalVideos = [
  {
    id: 6,
    title: "Real Estate Walkthrough",
    client: "Purana Plot",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 7,
    title: "Brand Documentary",
    client: "PropScroll",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 8,
    title: "Event Highlight Reel",
    client: "Gadewar",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 9,
    title: "Product Showcase",
    client: "Lotus",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
  {
    id: 10,
    title: "Corporate Profile",
    client: "Various",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    videoUrl: "/assets/video/WhatsApp Video 2026-04-13 at 12.34.32 PM.mp4",
  },
];

// ── Video Card ────────────────────────────────────────────────────
function VideoCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative shrink-0 w-[280px] rounded-2xl overflow-hidden bg-[#0f172a] shadow-lg group cursor-pointer"
      style={{ height: "380px" }}
      onClick={!playing ? handlePlay : undefined}
    >
      {/* THUMBNAIL */}
      {!playing && (
        <>
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* PLAY BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>

          {/* INFO */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-1">{item.client}</p>
            <h3 className="text-white font-bold text-base leading-tight">{item.title}</h3>
            <p className="text-white/50 text-xs mt-1">{item.year}</p>
          </div>
        </>
      )}

      {/* VIDEO PLAYER */}
      {playing && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={item.videoUrl}
            className="w-full h-full object-contain"
            controls
            onEnded={() => setPlaying(false)}
          />
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-primary transition-colors z-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ── Auto-scrolling Ribbon ─────────────────────────────────────────
function VideoRibbon({ items, reverse = false }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.5;

  // duplicate for seamless loop
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += reverse ? -SPEED : SPEED;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current = 0;
        if (posRef.current < 0) posRef.current = halfWidth;
        track.style.transform = `translateX(${-posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [reverse]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div ref={trackRef} className="flex gap-5 w-max">
        {doubled.map((item, i) => (
          <VideoCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────
function SectionLabel({ tag, title, sub }) {
  return (
    <div className="px-6 md:px-16 mb-8">
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">{tag}</span>
      <h2 className="font-black text-3xl md:text-4xl tracking-tight dark:text-white mt-1">{title}</h2>
      <p className="text-sm text-muted mt-2 max-w-lg">{sub}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function VideoPortfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white font-sans pb-24 select-none overflow-hidden">

      {/* HEADER */}
      <header className="relative px-6 md:px-16 pt-28 pb-16 flex flex-col items-center text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,197,63,0.2) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
          }}
        />
        <span className="relative z-10 text-[11px] font-bold tracking-[0.35em] uppercase text-primary mb-3">Portfolio</span>
        <h1
          className="relative z-10 font-black tracking-tighter dark:text-white leading-tight"
          style={{ fontSize: "clamp(36px, 8vw, 72px)" }}
        >
          Video <span className="text-primary italic">Works</span>
        </h1>
        <p className="relative z-10 text-muted text-sm mt-4 max-w-xl">
          From AI-generated cinematic reels to real-world brand films — explore our full video portfolio.
        </p>
      </header>

      {/* ── AI VIDEO SECTION ── */}
      <section className="py-12">
        <SectionLabel
          tag="Section 01"
          title="AI Video"
          sub="Cutting-edge AI-generated videos crafted for brands that want to stand out."
        />
        <VideoRibbon items={aiVideos} reverse={false} />
      </section>

      {/* DIVIDER */}
      <div className="mx-6 md:mx-16 border-t border-black/10 dark:border-white/10 my-4" />

      {/* ── NORMAL VIDEO SECTION ── */}
      <section className="py-12">
        <SectionLabel
          tag="Section 02"
          title="Normal Video"
          sub="Real shoots, real stories — professional video production for every occasion."
        />
        <VideoRibbon items={normalVideos} reverse={true} />
      </section>

    </div>
  );
}
