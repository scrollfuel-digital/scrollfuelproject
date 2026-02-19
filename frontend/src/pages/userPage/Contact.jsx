import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, ArrowUpRight, Zap, CheckCircle, Star, Clock, Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const API = import.meta.env.VITE_API_URL;

/* DIRECTIONAL TRANSITION PRESETS */
const fromLeft = { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } };
const fromRight = { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } };
const fromTop = { hidden: { opacity: 0, y: -70 }, visible: { opacity: 1, y: 0 } };
const fromBottom = { hidden: { opacity: 0, y: 80 }, visible: { opacity: 1, y: 0 } };
const zoomIn = { hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } };
const diagTL = { hidden: { opacity: 0, x: -60, y: -60 }, visible: { opacity: 1, x: 0, y: 0 } };
const diagBR = { hidden: { opacity: 0, x: 60, y: 60 }, visible: { opacity: 1, x: 0, y: 0 } };
const flipUp = { hidden: { opacity: 0, rotateX: 80 }, visible: { opacity: 1, rotateX: 0 } };

/* Reusable scroll-triggered wrapper */
function Reveal({ children, variant = fromBottom, delay = 0, duration = 0.7, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Word-by-word reveal with direction */
function WordReveal({ text, className = "", baseDelay = 0, fromDir = "bottom" }) {
  const words = text.split(" ");
  const getInitial = () => ({
    left: { opacity: 0, x: -50, rotate: -4 },
    right: { opacity: 0, x: 50, rotate: 4 },
    top: { opacity: 0, y: -45, rotate: -3 },
    bottom: { opacity: 0, y: 55, rotate: 3 },
  }[fromDir]);

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block"
          initial={getInitial()}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: baseDelay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* Char-by-char reveal rolling from bottom */
function CharReveal({ text, className = "", baseDelay = 0 }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span key={i} className="inline-block"
          style={{ transformOrigin: "bottom center" }}
          initial={{ opacity: 0, y: 60, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: baseDelay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* Animated underline */
function SlideUnderline({ color = "#8bc53f", delay = 0, width = "100%", className = "" }) {
  return (
    <motion.div className={`h-0.75 rounded-full mt-1 ${className}`}
      style={{ background: color, width }}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} />
  );
}

/* MAGNETIC BUTTON */
function MagneticButton({ children, className, onClick, type = "button", style }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.button ref={ref} type={type} style={{ x: sx, y: sy, ...style }}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick} whileTap={{ scale: 0.95 }} className={className}>
      {children}
    </motion.button>
  );
}

/* GLITCH TEXT */
function GlitchText({ text, className = "" }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 180); }, 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`relative inline-block ${className}`}>
      <span className={glitch ? "opacity-0" : ""}>{text}</span>
      {glitch && (
        <>
          <span className="absolute inset-0 text-primary" style={{ clipPath: "inset(15% 0 55% 0)", transform: "translateX(-5px)" }}>{text}</span>
          <span className="absolute inset-0 text-secondary" style={{ clipPath: "inset(55% 0 10% 0)", transform: "translateX(5px)" }}>{text}</span>
        </>
      )}
    </span>
  );
}

/* ANIMATED COUNTER */
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let f = 0; const total = 60;
    const t = setInterval(() => { f++; setCount(Math.round((to * f) / total)); if (f === total) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [started, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* HERO TYPEWRITER HEADING */
function AnimatedHeading() {
  const lines = ["Let's ", "Talk Growth"];
  const [displayed, setDisplayed] = useState(["", ""]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done) return;
    const cur = lines[lineIdx];
    if (charIdx < cur.length) {
      const t = setTimeout(() => { setDisplayed(p => { const c = [...p]; c[lineIdx] = cur.slice(0, charIdx + 1); return c; }); setCharIdx(c => c + 1); }, 80);
      return () => clearTimeout(t);
    }
    if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 220);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [charIdx, lineIdx, done]);

  return (
    <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-4">
      <div className="overflow-hidden">
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-white">
          {displayed[0]}
          {lineIdx === 0 && !done && <motion.span className="inline-block w-1 h-14 ml-1 rounded-sm bg-primary align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <GlitchText text={displayed[1]} className="text-primary" />
          {lineIdx === 1 && !done && <motion.span className="inline-block w-1 h-14 ml-1 rounded-sm bg-primary align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
        </motion.div>
      </div>
    </h1>
  );
}

function ContactCard({ icon: Icon, title, value, link, index }) {
  const colors = ["#ffc93b", "#ffc93b", "#ffc93b", "#ffc93b"];
  const color = colors[index % 4];
  const dirX = index % 2 === 0 ? -90 : 90;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: dirX, y: 30, rotate: index % 2 === 0 ? -5 : 5 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 cursor-pointer"
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
    >
      {/* Diagonal colour wipe */}
      <motion.div
        className="absolute inset-0"
        style={{ background: color }}
        initial={{ clipPath: "polygon(0 100%, 0 100%, 0 100%)" }}
        whileHover={{ clipPath: "polygon(0 0, 160% 0, 0 160%)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 p-7 overflow-hidden">
        {/* sliding hover layer */}
        <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

        {/* content */}
        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
            style={{ background: `${color}22` }}
            whileHover={{ rotate: 20, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon
              size={22}
              className="text-secondary transition-colors duration-300"
            />
          </motion.div>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-semibold group-hover:text-black/60 transition-colors duration-300">
            {title}
          </p>

          <p className="text-white font-bold text-base group-hover:text-black transition-colors duration-300">
            {value}
          </p>

          <motion.div
            className="absolute top-5 right-5 text-white/20 group-hover:text-black/40 transition-colors duration-300"
            whileHover={{ x: 4, y: -4 }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        whileHover={{ boxShadow: `0 0 35px 6px ${color}55` }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

/* FLOATING LABEL INPUTS*/
function FloatingInput({ name, label, type = "text", value, onChange, required = false }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
    <div className="relative">
      <motion.label className="absolute left-4 pointer-events-none font-medium z-10"
        animate={{ top: active ? "6px" : "50%", y: active ? 0 : "-50%", fontSize: active ? "10px" : "14px", color: focused ? "#8bc53f" : "rgba(255,255,255,0.35)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}>{label}</motion.label>
      <motion.input name={name} type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
        className="w-full pt-6 pb-3 px-4 rounded-xl text-white text-sm outline-none"
        animate={{ borderColor: focused ? "#8bc53f" : "rgba(255,255,255,0.08)", boxShadow: focused ? "0 0 20px rgba(139,197,63,0.15)" : "none" }}
        style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)" }}
        transition={{ duration: 0.25 }} />
    </div>
  );
}

function FloatingTextarea({ name, label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
    <div className="relative">
      <motion.label className="absolute left-4 pointer-events-none font-medium z-10"
        animate={{ top: active ? "8px" : "18px", fontSize: active ? "10px" : "14px", color: focused ? "#8bc53f" : "rgba(255,255,255,0.35)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}>{label}</motion.label>
      <textarea name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={5} className="w-full pt-8 pb-3 px-4 rounded-xl text-white text-sm outline-none resize-none"
        style={{ background: "rgba(255,255,255,0.04)", border: focused ? "1.5px solid #8bc53f" : "1.5px solid rgba(255,255,255,0.08)", boxShadow: focused ? "0 0 20px rgba(139,197,63,0.15)" : "none" }} />
    </div>
  );
}

function FloatingSelect({ name, label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
    <div className="relative">
      <motion.label className="absolute left-4 pointer-events-none font-medium z-10"
        animate={{ top: active ? "6px" : "50%", y: active ? 0 : "-50%", fontSize: active ? "10px" : "14px", color: focused ? "#8bc53f" : "rgba(255,255,255,0.35)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}>{label}</motion.label>
      <select name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required
        className="w-full pt-6 pb-3 px-4 rounded-xl text-white text-sm outline-none appearance-none cursor-pointer"
        style={{ background: "rgba(255,255,255,0.04)", border: focused ? "1.5px solid #8bc53f" : "1.5px solid rgba(255,255,255,0.08)", boxShadow: focused ? "0 0 20px rgba(139,197,63,0.15)" : "none" }}>
        <option value="" className="bg-gray-900" />
        {options.map(opt => <option key={opt} value={opt} className="bg-gray-900 text-white">{opt}</option>)}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0"
        style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid rgba(255,255,255,0.3)" }} />
    </div>
  );
}

/* MAIN PAGE*/
export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch(`${API}/api/contact`,
        {
          method: "POST", headers:
            { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      const data = await res.json();
      if (res.ok) { setSubmitted(true); setForm({ name: "", email: "", phone: "", service: "", message: "" }); setTimeout(() => setSubmitted(false), 4000); }
      else alert(data.error);
    } catch { alert("Server error"); } finally { setLoading(false); }
  };

  const services = ["Social Media Marketing & Management", "Web Design & Development", "Lead Generation", "Content Creation", "Advertising & Marketing", "Branding & Graphic Designing", "Google Ads & PPC Campaign", "Others"];
  const contactItems = [
    { icon: Phone, title: "Call Us", value: "+91 9699660972", link: "tel:+919699660972" },
    { icon: MessageCircle, title: "WhatsApp", value: "Chat Now", link: "https://wa.me/919699660972" },
    { icon: Mail, title: "Email", value: "scrollfuel@gmail.com", link: "https://mail.google.com/mail/?view=cm&fs=1&to=scrollfuel@gmail.com" },
    { icon: MapPin, title: "Office", value: "Nagpur, India", link: "https://maps.app.goo.gl/oQfiqBwaEo6xyFYYA" },
  ];
  const stats = [
    { value: 80, suffix: "+", label: "Projects", variant: fromLeft },
    { value: 60, suffix: "+", label: "Clients", variant: fromBottom },
    { value: 5, suffix: "+", label: "Years", variant: fromTop },
    { value: 98, suffix: "%", label: "Satisfaction", variant: fromRight },
  ];

  return (
    <div className="bg-black text-white overflow-hidden" ref={containerRef}>

      {/* SCROLL LINE */}
      <div className="fixed left-0 top-0 w-0.5 h-full z-50 bg-white/5">
        <motion.div className="w-full bg-primary origin-top" style={{ height: lineH }} />
      </div>

      {/* FIXED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute w-225 h-225 rounded-full -top-1/4 -right-1/4"
          style={{ background: "radial-gradient(circle, rgba(139,197,63,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-175 h-175 rounded-full -bottom-1/4 -left-1/4"
          style={{ background: "radial-gradient(circle, rgba(255,201,59,0.05) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="diag-grid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <line x1="0" y1="0" x2="0" y2="60" stroke="#8bc53f" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="60" y2="0" stroke="#8bc53f" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag-grid)" />
        </svg>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* === LEFT TEXT COLUMN === */}
            <div className="relative z-10 pl-4 lg:pl-15">

              {/* Heading — typewriter FROM BOTTOM (per line) */}
              <AnimatedHeading />

              {/* Underline — SCALE FROM LEFT */}
              <SlideUnderline delay={0.85} width="180px" />

              {/* Subtext — FROM BOTTOM */}
              <Reveal variant={fromBottom} delay={1.0} className="mt-5">
                <p className="text-white/50 text-lg leading-relaxed max-w-lg">
                  Ready to scale your brand? Drop us a message and we'll craft a custom
                  digital growth strategy tailored to your goals.
                </p>
              </Reveal>

              {/* Pill tags — stagger FROM RIGHT */}
              <div className="flex flex-wrap gap-3 mt-5">
                {["⚡ Performance Marketing", "📈 ROI Focused", "🎯 Data Driven"].map((pill, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, x: 70, scale: 0.85 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.55, delay: 1.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 text-white/60"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    {pill}
                  </motion.span>
                ))}
              </div>

              {/* CTA — FROM BOTTOM with spring bounce */}
              <motion.div className="mt-7"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4, type: "spring", bounce: 0.35 }}>
                <a href="#contact-form">
                  <MagneticButton className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black overflow-hidden"
                    style={{ background: "#8bc53f" }}>
                    <span className="relative z-10">Get Free Consultation</span>
                    <motion.span className="relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowUpRight size={20} />
                    </motion.span>
                    <motion.div className="absolute inset-0 bg-white/20"
                      initial={{ x: "-120%", skewX: "-20deg" }} animate={{ x: "220%" }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }} />
                  </MagneticButton>
                </a>
              </motion.div>

              {/* Stats — each from different direction */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/8">
                {stats.map(({ value, suffix, label, variant }, i) => (
                  <motion.div key={i}
                    variants={variant} initial="hidden" animate="visible"
                    transition={{ duration: 0.6, delay: 1.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center">
                    <div className="text-2xl font-black text-primary tabular-nums">
                      <Counter to={value} suffix={suffix} />
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* === RIGHT: Illustration === */}
            <div className="relative flex items-center justify-center lg:justify-end pr-4 lg:pr-17">
              {/* Rings */}
              {[240, 320, 400].map((size, i) => (
                <motion.div key={i} className="absolute rounded-full border border-primary/10"
                  style={{ width: size, height: size }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.55, 0.2] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }} />
              ))}
              {/* Orbital dots */}
              <motion.div className="absolute w-3 h-3 rounded-full bg-primary"
                style={{ originX: "170px", originY: "0px" }}
                animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute w-2 h-2 rounded-full bg-secondary"
                style={{ originX: "-130px", originY: "0px" }}
                animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />

              {/* Image — FROM RIGHT with rotateY */}
              <motion.div
                initial={{ opacity: 0, x: 120, rotateY: 25 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10">
                <motion.img src="/assets/illustrations/contact1.png" alt="Contact"
                  className="w-full max-w-sm"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

                {/* Badge — FROM TOP */}
                <motion.div
                  initial={{ opacity: 0, y: -60, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.65, type: "spring", bounce: 0.4 }}
                  className="absolute -top-6 -right-6 px-4 py-2.5 rounded-2xl border border-primary/30 backdrop-blur-xl text-sm font-bold"
                  style={{ background: "rgba(139,197,63,0.12)" }}>
                  <div className="flex items-center gap-2">
                    <motion.div className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }} />
                    <span className="text-primary">Available Now</span>
                  </div>
                </motion.div>

                {/* Badge — FROM LEFT */}
                <motion.div
                  initial={{ opacity: 0, x: -70, scale: 0.7 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.8, duration: 0.65, type: "spring", bounce: 0.4 }}
                  className="absolute -bottom-4 -left-10 px-4 py-2.5 rounded-2xl border border-secondary/30 backdrop-blur-xl text-sm font-bold"
                  style={{ background: "rgba(255,201,59,0.12)" }}>
                  <div className="flex items-center gap-2 text-secondary">
                    <Zap size={14} fill="currentColor" />
                    <span>24hr Response</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/*  MARQUEE STRIP — FROM BOTTOM */}
      <Reveal variant={fromBottom} delay={0}>
        <div className="relative py-4 border-y border-white/6 overflow-hidden"
          style={{ background: "rgba(139,197,63,0.05)" }}>
          <motion.div className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
            {[...Array(2)].map((_, r) => (
              <span key={r} className="flex gap-12 text-sm font-semibold text-white/25 uppercase tracking-widest">
                {["Performance Marketing", "•", "SEO & Growth", "•", "Social Ads", "•", "Brand Strategy", "•", "Analytics", "•", "Web Design", "•", "Lead Generation", "•"].map((t, i) => (
                  <span key={i} className={t === "•" ? "text-primary" : ""}>{t}</span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </Reveal>

      {/* CONTACT CARDS */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Label — FROM TOP */}
          <Reveal variant={fromTop} delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-white/8" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Reach Us</span>
              <div className="h-px flex-1 bg-white/8" />
            </div>
          </Reveal>

          {/* Heading — LEFT + RIGHT alternating words */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              <WordReveal text="Get In" className="text-white" fromDir="left" baseDelay={0.1} />
              {" "}
              <WordReveal text="Touch" className="text-primary" fromDir="right" baseDelay={0.3} />
            </h2>
            <SlideUnderline color="#ffc93b" delay={0.55} width="80px" className="mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactItems.map((item, i) => <ContactCard key={i} {...item} index={i} />)}
          </div>
        </div>
      </section>

      {/*  HOW IT WORKS — FROM EACH DIRECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Heading — FROM TOP */}
          <Reveal variant={fromTop} delay={0} className="text-center mb-10">
            <h3 className="text-2xl font-black mb-2">
              <WordReveal text="How It Works" className="text-white" fromDir="top" baseDelay={0.05} />
            </h3>
            <SlideUnderline delay={0.4} width="60px" className="mx-auto" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Reach Out", desc: "Fill the form or reach out via WhatsApp", icon: MessageCircle, variant: fromLeft },
              { step: "02", title: "Free Audit", desc: "We analyse your brand and craft a plan", icon: Star, variant: fromBottom },
              { step: "03", title: "Scale & Grow", desc: "Execute campaigns and track real results", icon: Zap, variant: fromRight },
            ].map(({ step, title, desc, icon: Icon, variant }, i) => (
              <Reveal key={i} variant={variant} delay={0.1 + i * 0.15} className="h-full">
                <motion.div whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative h-full p-8 rounded-2xl border border-white/8 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  {/* Fill from bottom on hover */}
                  <motion.div className="absolute inset-0 origin-bottom"
                    style={{ background: "linear-gradient(135deg, rgba(139,197,63,0.12), rgba(255,201,59,0.06))" }}
                    initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-5xl font-black text-white/6 leading-none">{step}</span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,197,63,0.15)" }}>
                        <Icon size={20} className="text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-black text-white mb-2 group-hover:text-primary transition-colors duration-300">{title}</h4>
                    <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/*  FORM + MAP */}
      <section id="contact-form" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section heading */}
          <div className="text-center mb-16">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-24 bg-primary mx-auto mb-6 origin-left" />

            {/* Char-by-char FROM BOTTOM */}
            <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              <CharReveal text="Start Your Growth" className="text-white justify-center" baseDelay={0} />
              <br />
              <CharReveal text="Journey Today" className="text-primary justify-center" baseDelay={0.45} />
            </h2>

            {/* Description — FROM BOTTOM */}
            {/* <Reveal variant={fromBottom} delay={0.95}>
              <p className="text-white/40 max-w-md mx-auto mt-4 text-base">
                Fill the form — our team responds within 24 hours with a tailored growth strategy.
              </p>
            </Reveal> */}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* === FORM — FROM LEFT with slight rotation === */}
            <motion.div
              initial={{ opacity: 0, x: -110, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-primary/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-secondary/40 rounded-br-xl pointer-events-none" />

              <div className="relative p-8 md:p-10 rounded-3xl border border-white/8 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

                {/* Form title — FROM RIGHT */}
                <Reveal variant={fromRight} delay={0.25}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,197,63,0.15)" }}>
                      <Send size={16} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Send a Message</h3>
                  </div>
                </Reveal>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name FROM LEFT, Email FROM RIGHT */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                      <FloatingInput name="name" label="Full Name" value={form.name} onChange={handleChange} required />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                      <FloatingInput name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} required />
                    </motion.div>
                  </div>

                  {/* Phone — FROM BOTTOM */}
                  <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <FloatingInput name="phone" label="Phone Number" type="tel" value={form.phone} onChange={handleChange} />
                  </motion.div>

                  {/* Service — FROM LEFT */}
                  <motion.div initial={{ opacity: 0, x: -55 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
                    <FloatingSelect name="service" label="Service Interested In" value={form.service} onChange={handleChange} options={services} />
                  </motion.div>

                  {/* Message — FROM BOTTOM */}
                  <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.7 }}>
                    <FloatingTextarea name="message" label="Your Message" value={form.message} onChange={handleChange} />
                  </motion.div>

                  {/* Submit — ZOOM IN */}
                  <motion.div initial={{ opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.85, type: "spring", bounce: 0.3 }}>
                    <MagneticButton type="submit"
                      className="relative w-full py-4 rounded-xl font-bold text-base overflow-hidden flex items-center justify-center gap-3"
                      style={{ background: loading ? "rgba(139,197,63,0.3)" : "#8bc53f", color: "#000" }}>
                      {loading ? (
                        <><motion.div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />Sending...</>
                      ) : (
                        <><span>Submit Message</span><Send size={18} />
                          <motion.div className="absolute inset-0 bg-white/25"
                            initial={{ x: "-120%", skewX: "-20deg" }} animate={{ x: "220%" }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }} /></>
                      )}
                    </MagneticButton>

                    <AnimatePresence>
                      {submitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.93 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.93 }} transition={{ duration: 0.4 }}
                          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/30 text-sm font-semibold"
                          style={{ background: "rgba(139,197,63,0.12)", color: "#8bc53f" }}>
                          <CheckCircle size={18} />
                          Message sent! We'll get back to you within 24 hours.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* === MAP COLUMN — FROM RIGHT with rotation === */}
            <motion.div
              initial={{ opacity: 0, x: 110, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5">

              {/* Map box — FROM TOP */}
              <Reveal variant={fromTop} delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden border border-white/8" style={{ height: "340px" }}>
                  <div className="absolute top-0 left-0 right-0 z-10 px-5 py-3 flex items-center gap-3"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)", backdropFilter: "blur(8px)" }}>
                    <MapPin size={16} className="text-primary" />
                    <span className="text-sm font-semibold text-white/80">Nagpur, India</span>
                  </div>
                  <iframe title="Scrollfuel Location"
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3722.4299900309484!2d79.0640556!3d21.0954167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA1JzQzLjUiTiA3OcKwMDMnNTAuNiJF!5e0!3m2!1sen!2sin!4v1769861063448!5m2!1sen!2sin"
                    className="w-full h-full" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </Reveal>

              {/* Info panels — LEFT and RIGHT */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Response Time", value: "< 24 Hours", icon: Clock, color: "#8bc53f", variant: fromLeft },
                  { label: "Free Strategy", value: "Book Now", icon: Phone, color: "#ffc93b", variant: fromRight },
                ].map(({ label, value, icon: Icon, color, variant }, i) => (
                  <Reveal key={i} variant={variant} delay={0.3 + i * 0.15}>
                    <motion.div whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative p-5 rounded-2xl border border-white/8 overflow-hidden cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.03)" }}>
                      <motion.div className="absolute inset-0 opacity-0"
                        style={{ background: `radial-gradient(circle at 30% 50%, ${color}22, transparent)` }}
                        whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                      <Icon size={20} className="mb-3 relative z-10" style={{ color }} />
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-1 relative z-10">{label}</p>
                      <p className="text-white font-bold text-sm relative z-10">{value}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              {/* Trust badges — stagger FROM BOTTOM */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Globe, text: "Pan-India" },
                  { icon: Star, text: "5★ Rated" },
                 
                ].map(({ icon: Icon, text }, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, scale: 1.06 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/8 text-center"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <Icon size={18} className="text-primary" />
                    <span className="text-xs text-white/50 font-semibold">{text}</span>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp strip — FROM BOTTOM */}
              <Reveal variant={fromBottom} delay={0.65}>
                <div className="relative px-6 py-5 rounded-2xl overflow-hidden flex items-center justify-between"
                  style={{ background: "linear-gradient(135deg, rgba(139,197,63,0.15), rgba(255,201,59,0.1))", border: "1px solid rgba(139,197,63,0.2)" }}>
                  <div>
                    <p className="text-white font-bold mb-0.5">WhatsApp us directly</p>
                    <p className="text-white/50 text-sm">Fastest response guaranteed</p>
                  </div>
                  <motion.a href="https://wa.me/919699660972" target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, rotate: 4 }} whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-full font-bold text-black text-sm flex items-center gap-2"
                    style={{ background: "#8bc53f" }}>
                    <MessageCircle size={16} />Chat
                  </motion.a>
                </div>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}