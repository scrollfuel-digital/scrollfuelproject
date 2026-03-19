// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

// // Clean HTML + Markdown
// const stripHTML = (html) => {
//   if (!html) return "";

//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;

//   let text = tempDiv.textContent || tempDiv.innerText || "";
//   text = text.replace(/[#*_`>-]/g, "");

//   return text.trim();
// };

// // Slug Generator
// const createSlug = (title) => {
//   return title
//     ?.toLowerCase()
//     .replace(/[^a-z0-9 ]/g, "")
//     .replace(/\s+/g, "-");
// };

// // FIX IMAGE URL
// const getImageUrl = (img) => {
//   if (!img) return "/assets/blog.jpeg";

//   if (img.startsWith("http")) {
//     return img; // Cloudinary or external image
//   }

//   return `${API}${img}`; // Local uploaded image
// };

// const Blog = () => {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${API}/api/blog`);
//         const data = await res.json();
//         setBlogs(data.data || []);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//     if (blogs.length === 0) return;

//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % blogs.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [blogs]);

//   const nextSlide = () =>
//     setCurrent((prev) => (prev + 1) % blogs.length);

//   const prevSlide = () =>
//     setCurrent((prev) =>
//       prev === 0 ? blogs.length - 1 : prev - 1
//     );

//   if (loading) {
//     return (
//       <section className="pt-28 pb-20 bg-black text-center text-white">
//         Loading blogs...
//       </section>
//     );
//   }

//   if (blogs.length === 0) {
//     return (
//       <section className="pt-28 pb-20 bg-black text-center text-white">
//         No blogs found.
//       </section>
//     );
//   }

//   return (
//     <section className="pt-28 pb-20 bg-black overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-white">
//             <span className="text-primary">Blogs</span>
//           </h1>
//         </motion.div>

//         {/* ================= SLIDER ================= */}
//         <div className="relative mb-28">
//           <div className="overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.6 }}
//                 className="grid md:grid-cols-2 gap-10 items-center bg-muted/5 rounded-3xl p-8 md:p-12"
//               >
//                 <img
//                   src={getImageUrl(blogs[current]?.hero_image)}
//                   alt={blogs[current]?.title}
//                   className="rounded-2xl shadow-lg w-full object-cover"
//                 />

//                 <div>
//                   <h2 className="text-3xl font-bold mt-3 mb-4 text-primary">
//                     {blogs[current]?.title}
//                   </h2>

//                   <p className="text-muted mb-6 leading-relaxed">
//                     {stripHTML(blogs[current]?.content).slice(0, 330)}...
//                   </p>

//                   {/* <button
//                     onClick={() =>
//                       navigate(
//                         `/blog/${createSlug(blogs[current].title)}`,
//                         { state: { blogId: blogs[current]._id } }
//                       )
//                     }
//                     className="text-primary font-semibold hover:underline"
//                   >
//                     Read More →
//                   </button> */}
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <div className="flex justify-center gap-4 mt-8">
//             <button onClick={prevSlide} className="btn-circle">
//               ←
//             </button>
//             <button onClick={nextSlide} className="btn-circle">
//               →
//             </button>
//           </div>
//         </div>

//         {/* ================= BLOG GRID ================= */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <motion.div
//               key={blog._id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="group border border-gray-800 rounded-2xl overflow-hidden shadow-sm bg-black"
//             >
//               <div className="overflow-hidden h-52">
//                 <img
//                   src={getImageUrl(blog?.hero_image)}
//                   alt={blog?.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mt-2 mb-3 text-primary">
//                   {blog.title}
//                 </h3>

//                 <p className="text-muted text-sm leading-relaxed mb-4">
//                   {stripHTML(blog?.content).slice(0, 120)}...
//                 </p>

//                 <button
//                   className="text-primary font-medium hover:underline"
//                   onClick={() =>
//                     navigate(`/blog/${createSlug(blog.title)}`, {
//                       state: { blogId: blog._id },
//                     })
//                   }
//                 >
//                   Read More →
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Blog;


import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const stripHTML = (html) => {
  if (!html) return "";
  const d = document.createElement("div");
  d.innerHTML = html;
  return (d.textContent || d.innerText || "").replace(/[#*_`>-]/g, "").trim();
};

const createSlug = (title) =>
  title?.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");

const getImageUrl = (img) => {
  if (!img) return "/assets/blog.jpeg";
  if (img.startsWith("http")) return img;
  return `${API}${img}`;
};

const BlogRow = ({ blog, index, navigate }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 52 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onClick={() =>
        navigate(`/blog/${createSlug(blog.title)}`, { state: { blogId: blog._id } })
      }
      className="group relative grid grid-cols-1 md:grid-cols-2 border-b border-stone-200 dark:border-stone-800 cursor-pointer overflow-hidden bg-white dark:bg-black hover:bg-stone-50 dark:hover:bg-[#111111] transition-colors duration-500"
      style={{ minHeight: "460px" }}
    >
      {/* IMAGE SIDE */}
      <div
        className={`relative flex items-center justify-center bg-stone-50 dark:bg-[#111111] overflow-hidden ${isEven ? "md:order-1" : "md:order-2"
          }`}
        style={{ minHeight: "340px" }}
      >
        <img
          src={getImageUrl(blog?.hero_image)}
          alt={blog?.title}
          className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ padding: "24px" }}
        />

        {/* Issue badge */}
        <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 shadow-sm">
          <span className="text-[9px] font-bold tracking-[0.22em] text-stone-500 dark:text-stone-400 uppercase">
            No.&nbsp;{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Green sweep accent on bottom */}
        <div
          className={`absolute bottom-0 h-[3px] w-0 bg-[#8bc53f] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isEven ? "left-0" : "right-0"
            }`}
        />
      </div>

      {/* CONTENT SIDE */}
      <div
        className={`relative flex flex-col justify-between px-10 py-12 md:px-14 lg:px-20 lg:py-16 overflow-hidden bg-white dark:bg-black ${isEven ? "md:order-2" : "md:order-1"
          }`}
      >
        {/* Top accent line — grows on hover */}
        <div
          className={`absolute top-0 h-[2px] w-12 bg-[#8bc53f] transition-all duration-500 group-hover:w-24 ${isEven ? "left-0" : "right-0"
            }`}
        />

        {/* Meta */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[9px] font-bold tracking-[0.28em] text-[#8bc53f] uppercase">
            Article
          </span>
          <span className="w-6 h-px bg-stone-300 dark:bg-stone-700 block" />
          <span className="text-[9px] tracking-[0.18em] text-stone-400 dark:text-stone-500 uppercase">
            Editorial
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <h2 className="font-serif text-3xl md:text-[2.2rem] lg:text-[2.6rem] leading-[1.08] text-black dark:text-white mb-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
            {blog.title}
          </h2>

          {/* Divider — grows on hover */}
          <div className="w-8 h-px bg-stone-200 dark:bg-stone-700 mb-5 transition-all duration-500 group-hover:w-16 group-hover:bg-stone-300 dark:group-hover:bg-stone-600" />

          {/* Excerpt — slides up on hover */}
          <div className="overflow-hidden flex-1">
            <p className="text-[#8d8c8c] text-[14px] leading-[1.8] translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[60ms] line-clamp-4">
              {stripHTML(blog?.content).slice(0, 240)}
            </p>
          </div>
        </div>

        {/* CTA — slides up from below */}
        <div className="mt-8 overflow-hidden">
          <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[100ms]">
            <span className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-black dark:text-white uppercase">
              Read Article
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-black dark:border-white text-sm transition-all duration-300 group-hover:bg-[#8bc53f] group-hover:border-[#8bc53f] group-hover:text-white">
                →
              </span>
            </span>
          </div>
        </div>

        {/* Ghost number — decorative */}
        <span
          className={`absolute bottom-4 font-serif font-black text-[110px] leading-none select-none pointer-events-none transition-all duration-700 text-stone-100 dark:text-stone-900 group-hover:translate-y-2 ${isEven ? "right-6" : "left-6"
            }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
};

const SliderCard = ({ blog, index, navigate }) => (
  <div
    onClick={() =>
      navigate(`/blog/${createSlug(blog.title)}`, { state: { blogId: blog._id } })
    }
    className="group relative shrink-0 cursor-pointer overflow-hidden bg-white dark:bg-[#111111] border border-stone-200 dark:border-stone-800 rounded-2xl"
    style={{ width: "380px" }}
  >
    {/* Image area */}
    <div
      className="relative flex items-center justify-center bg-stone-50 dark:bg-[#1a1a1a] overflow-hidden"
      style={{ height: "240px" }}
    >
      <img
        src={getImageUrl(blog?.hero_image)}
        alt={blog?.title}
        className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{ padding: "16px" }}
      />

      {/* Green tint on hover */}
      <div className="absolute inset-0 bg-[#8bc53f]/0 group-hover:bg-[#8bc53f]/8 transition-colors duration-500" />

      {/* Number badge */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-100 dark:border-stone-700">
        <span className="text-[9px] font-bold tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">
          No.&nbsp;{String(index + 4).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom green bar on hover */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#8bc53f] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </div>

    {/* Card content */}
    <div className="relative p-7 overflow-hidden">
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] font-bold tracking-[0.25em] text-[#8bc53f] uppercase">
          Article
        </span>
        <span className="w-5 h-px bg-stone-200 dark:bg-stone-700 block" />
        <span className="text-[9px] tracking-[0.15em] text-stone-400 dark:text-stone-500 uppercase">
          Editorial
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl leading-[1.2] text-black dark:text-white mb-3 transition-transform duration-500 group-hover:-translate-y-0.5">
        {blog.title}
      </h3>

      {/* Excerpt — slides up */}
      <div className="overflow-hidden mb-5">
        <p className="text-[#8d8c8c] text-[13px] leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[60ms] line-clamp-3">
          {stripHTML(blog?.content).slice(0, 140)}
        </p>
      </div>

      {/* CTA — slides up */}
      <div className="overflow-hidden">
        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[100ms]">
          <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-black dark:text-white uppercase">
            Read Article
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-black dark:border-white text-xs transition-all duration-300 group-hover:bg-[#8bc53f] group-hover:border-[#8bc53f] group-hover:text-white">
              →
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

const SliderSection = ({ blogs, navigate }) => {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const total = blogs.length;
  const CARD_W = 380;
  const GAP = 24;

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, total - 1));
    setCurrent(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: clamped * (CARD_W + GAP),
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-stone-50 dark:bg-[#0a0a0a] border-t border-stone-200 dark:border-stone-800 py-16 px-6 md:px-12 lg:px-20"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[2px] bg-[#8bc53f]" />
            <span className="text-[9px] font-bold tracking-[0.28em] text-[#8bc53f] uppercase">
              More Stories
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-black dark:text-white leading-tight">
            Keep Reading
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Dot indicators */}
          <div className="hidden sm:flex items-center gap-2 mr-4">
            {blogs.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current
                  ? "w-6 h-2 bg-[#8bc53f]"
                  : "w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-500"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="w-11 h-11 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
          >
            ←
          </button>
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            className="w-11 h-11 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-[#8bc53f] hover:border-[#8bc53f] hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{
          gap: `${GAP}px`,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {blogs.map((blog, i) => (
          <SliderCard key={blog._id} blog={blog} index={i} navigate={navigate} />
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-px bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#8bc53f] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </motion.section>
  );
};

const PageHeading = () => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-black"
  >
    <h1 className="text-5xl font-bold text-center mb-12">
      <span className="text-primary">Blogs</span>
    </h1>

  </motion.header>
);

const Loader = () => (
  <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center gap-2">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#8bc53f] animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API}/api/blog`);
        const data = await res.json();
        setBlogs(data.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="font-serif text-4xl text-stone-300 dark:text-stone-700">
          No stories yet.
        </p>
      </div>
    );
  }

  const stackedBlogs = blogs.slice(0, 3);
  const sliderBlogs = blogs.slice(3, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      <PageHeading />

      {/* Stacked rows — blogs 1, 2, 3 */}
      <div>
        {stackedBlogs.map((blog, i) => (
          <BlogRow key={blog._id} blog={blog} index={i} navigate={navigate} />
        ))}
      </div>

      {/* Slider — blogs 4, 5, 6 */}
      {sliderBlogs.length > 0 && (
        <SliderSection blogs={sliderBlogs} navigate={navigate} />
      )}

      {/* Footer accent */}
      <div className="h-[3px] bg-gradient-to-r from-[#8bc53f] via-[#ffc93b] to-transparent" />
    </div>
  );
};

export default Blog;