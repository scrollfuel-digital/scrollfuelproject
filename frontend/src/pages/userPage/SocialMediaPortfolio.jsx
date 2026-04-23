import { useEffect, useRef } from "react";

const clients = [
  {
    id: 1,
    username: "getfitbelly",
    handle: "@Fitbelly",
    instagramUrl: "https://www.instagram.com/getfitbelly/",
    avatar: "../assets/fitbelly.jpg",
    posts: [
      "/assets/portfolio/getfit.jpeg",
    ],
  },
  {
    id: 2,
    username: "Houscrol",
    handle: "@Houscrol",
    instagramUrl: "https://www.instagram.com/houscrol/",
    avatar: "../assets/houscrol.jpg",
    posts: [
      "/assets/portfolio/propscroll.jpeg",
    ],
  },
  {
    id: 3,
    username: "puranaplot",
    handle: "@puranaplot",
    instagramUrl: "https://www.instagram.com/puranaplotdhundhoo/",
    avatar: "../assets/puranaplot.jpg",
    posts: [
      "/assets/portfolio/mali.jpeg",
    ],
  },
  {
    id: 4,
    username: "gadewareyecare",
    handle: "@Gadewar Eye Care",
    instagramUrl: "https://www.instagram.com/gadewareyecare/",
    avatar: "../assets/gadewar.jpg",
    posts: [
      "/assets/portfolio/portfolio3.jpeg",
    ],
  },
];

// ── Instagram feed scroller inside phone ─────────────────────────
function InstaFeed({ posts }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.6;
  // each post ~180px tall + 4px gap
  const ITEM_H = 184;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfH = posts.length * ITEM_H;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= halfH) posRef.current = 0;
        track.style.transform = `translateY(${-posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [posts.length]);

  // duplicate for seamless loop
  const doubled = [...posts, ...posts];

  return (
    <div
      className="overflow-hidden w-full h-full"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div ref={trackRef} className="flex flex-col gap-1">
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-full object-cover shrink-0"
            style={{ height: "180px" }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

// ── Instagram Phone Mockup ────────────────────────────────────────
function InstagramCard({ client }) {
  return (
    <div className="flex flex-col items-center gap-4">

      {/* PHONE FRAME — click opens Instagram */}
      <div
        onClick={() => window.open(client.instagramUrl, "_blank", "noopener,noreferrer")}
        className="relative bg-black rounded-[2.8rem] shadow-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary"
        style={{ width: "240px", height: "500px", border: "6px solid #1a1a1a", boxShadow: "0 0 0 2px #333, 0 32px 64px rgba(0,0,0,0.35)" }}
      >
        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />

        {/* screen bg */}
        <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a]" />

        {/* ── Instagram UI ── */}
        <div className="absolute inset-0 flex flex-col z-10" style={{ top: "24px" }}>

          {/* top bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
            {/* instagram logo text */}
            <span className="font-bold text-sm tracking-tight dark:text-white" style={{ fontFamily: "Georgia, serif", fontSize: "15px" }}>
              Instagram
            </span>
            <div className="flex gap-3">
              {/* heart icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dark:text-white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              {/* messenger icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dark:text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
          </div>

          {/* profile row */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#0a0a0a]">
            <img src={client.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-primary" />
            <div>
              <p className="text-[11px] font-bold dark:text-white leading-none">{client.username}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{client.handle}</p>
            </div>
            <button className="ml-auto text-[9px] font-bold text-primary border border-primary rounded px-2 py-0.5">Follow</button>
          </div>

          {/* scrolling feed */}
          <div className="flex-1 overflow-hidden">
            <InstaFeed posts={client.posts} />
          </div>

          {/* bottom nav */}
          <div className="flex justify-around items-center px-4 py-2 border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dark:text-white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dark:text-white"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dark:text-white"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dark:text-white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <img src={client.avatar} alt="" className="w-5 h-5 rounded-full object-cover border border-primary" />
          </div>
        </div>

        {/* home indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/30 dark:bg-white/30 rounded-full z-20" />
      </div>

      {/* client label below phone — also clickable */}
      <div
        className="text-center cursor-pointer group"
        onClick={() => window.open(client.instagramUrl, "_blank", "noopener,noreferrer")}
      >
        <p className="font-bold text-sm dark:text-white group-hover:text-primary transition-colors">{client.username}</p>
        <p className="text-xs text-muted group-hover:text-primary transition-colors flex items-center justify-center gap-1">
          {client.handle}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function SocialMediaPortfolio() {
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
          style={{ fontSize: "clamp(32px, 7vw, 64px)" }}
        >
          Social Media <span className="text-primary italic">Marketing</span>
        </h1>
        <p className="relative z-10 text-muted text-sm mt-4 max-w-xl">
          Real Instagram feeds we've managed — scroll through each client's content live inside the phone.
        </p>
      </header>

      {/* PHONE GRID */}
      <div className="px-6 md:px-16">
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {clients.map((client) => (
            <InstagramCard key={client.id} client={client} />
          ))}
        </div>
      </div>

    </div>
  );
}
