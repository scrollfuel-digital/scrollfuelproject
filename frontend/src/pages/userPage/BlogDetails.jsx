// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const API_BASE = "http://127.0.0.1:8000";

// // Animated Icon Components
// const RocketIcon = () => (
//   <motion.svg
//     className="w-16 h-16"
//     viewBox="0 0 64 64"
//     fill="none"
//     initial={{ y: 0 }}
//     animate={{ y: [-5, 5, -5] }}
//     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//   >
//     <path d="M32 8L28 28L32 48L36 28L32 8Z" fill="#8bc53f" />
//     <path d="M32 8C40 12 48 20 48 32C48 36 44 40 40 42L32 48L24 42C20 40 16 36 16 32C16 20 24 12 32 8Z" fill="#ffc93b" />
//     <circle cx="32" cy="28" r="4" fill="white" />
//     <path d="M28 48L26 56L32 54L38 56L36 48" fill="#8bc53f" />
//   </motion.svg>
// );

// const ChartIcon = () => (
//   <motion.svg
//     className="w-16 h-16"
//     viewBox="0 0 64 64"
//     fill="none"
//     initial={{ scale: 0.9 }}
//     animate={{ scale: [0.9, 1.05, 0.9] }}
//     transition={{ duration: 2.5, repeat: Infinity }}
//   >
//     <rect x="8" y="40" width="10" height="16" fill="#8bc53f" rx="2" />
//     <rect x="22" y="28" width="10" height="28" fill="#ffc93b" rx="2" />
//     <rect x="36" y="20" width="10" height="36" fill="#8bc53f" rx="2" />
//     <rect x="50" y="12" width="10" height="44" fill="#ffc93b" rx="2" />
//     <motion.path
//       d="M10 38L27 26L41 18L55 10"
//       stroke="#000"
//       strokeWidth="2"
//       strokeDasharray="4 4"
//       initial={{ pathLength: 0 }}
//       animate={{ pathLength: 1 }}
//       transition={{ duration: 2, repeat: Infinity }}
//     />
//   </motion.svg>
// );

// const TargetIcon = () => (
//   <motion.svg
//     className="w-16 h-16"
//     viewBox="0 0 64 64"
//     fill="none"
//     animate={{ rotate: 360 }}
//     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//   >
//     <circle cx="32" cy="32" r="28" stroke="#8bc53f" strokeWidth="2" fill="none" />
//     <circle cx="32" cy="32" r="20" stroke="#ffc93b" strokeWidth="2" fill="none" />
//     <circle cx="32" cy="32" r="12" stroke="#8bc53f" strokeWidth="2" fill="none" />
//     <circle cx="32" cy="32" r="4" fill="#ffc93b" />
//     <motion.path
//       d="M32 4L32 12M32 52L32 60M4 32L12 32M52 32L60 32"
//       stroke="#000"
//       strokeWidth="2"
//       initial={{ opacity: 0.3 }}
//       animate={{ opacity: [0.3, 1, 0.3] }}
//       transition={{ duration: 2, repeat: Infinity }}
//     />
//   </motion.svg>
// );

// const LightbulbIcon = () => (
//   <motion.svg
//     className="w-16 h-16"
//     viewBox="0 0 64 64"
//     fill="none"
//     animate={{ scale: [1, 1.1, 1] }}
//     transition={{ duration: 2, repeat: Infinity }}
//   >
//     <path d="M32 8C24 8 18 14 18 22C18 28 22 32 24 36C26 40 26 42 26 46H38C38 42 38 40 40 36C42 32 46 28 46 22C46 14 40 8 32 8Z" fill="#ffc93b" />
//     <rect x="26" y="46" width="12" height="4" fill="#8bc53f" rx="1" />
//     <rect x="28" y="50" width="8" height="4" fill="#8bc53f" rx="1" />
//     <motion.g
//       initial={{ opacity: 0, y: -5 }}
//       animate={{ opacity: [0, 1, 0], y: -10 }}
//       transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
//     >
//       <path d="M20 10L18 6" stroke="#ffc93b" strokeWidth="2" strokeLinecap="round" />
//     </motion.g>
//     <motion.g
//       initial={{ opacity: 0, y: -5 }}
//       animate={{ opacity: [0, 1, 0], y: -10 }}
//       transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
//     >
//       <path d="M32 6L32 2" stroke="#ffc93b" strokeWidth="2" strokeLinecap="round" />
//     </motion.g>
//     <motion.g
//       initial={{ opacity: 0, y: -5 }}
//       animate={{ opacity: [0, 1, 0], y: -10 }}
//       transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
//     >
//       <path d="M44 10L46 6" stroke="#ffc93b" strokeWidth="2" strokeLinecap="round" />
//     </motion.g>
//   </motion.svg>
// );

// const MegaphoneIcon = () => (
//   <motion.svg
//     className="w-16 h-16"
//     viewBox="0 0 64 64"
//     fill="none"
//     animate={{ rotate: [0, 10, 0, -10, 0] }}
//     transition={{ duration: 3, repeat: Infinity }}
//   >
//     <path d="M8 24L44 16L44 48L8 40L8 24Z" fill="#8bc53f" />
//     <circle cx="50" cy="32" r="6" fill="#ffc93b" />
//     <path d="M8 36L4 44L12 46L12 38L8 36Z" fill="#ffc93b" />
//     <motion.g
//       initial={{ x: 0, opacity: 0.5 }}
//       animate={{ x: 8, opacity: 1 }}
//       transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
//     >
//       <path d="M56 24C58 26 60 28 60 32C60 36 58 38 56 40" stroke="#8bc53f" strokeWidth="2" strokeLinecap="round" />
//     </motion.g>
//   </motion.svg>
// );

// const DocumentIcon = () => (
//   <motion.svg
//     className="w-16 h-16"
//     viewBox="0 0 64 64"
//     fill="none"
//     animate={{ y: [0, -5, 0] }}
//     transition={{ duration: 2, repeat: Infinity }}
//   >
//     <rect x="16" y="8" width="32" height="48" rx="2" fill="#8bc53f" opacity="0.2" />
//     <rect x="20" y="16" width="24" height="4" rx="1" fill="#8bc53f" />
//     <rect x="20" y="24" width="20" height="3" rx="1" fill="#ffc93b" />
//     <rect x="20" y="30" width="24" height="3" rx="1" fill="#ffc93b" />
//     <rect x="20" y="36" width="18" height="3" rx="1" fill="#8bc53f" />
//   </motion.svg>
// );

// // Floating decoration elements
// const FloatingCircle = ({ delay, size, color, top, left }) => (
//   <motion.div
//     className={`absolute rounded-full opacity-20`}
//     style={{
//       width: size,
//       height: size,
//       backgroundColor: color,
//       top: top,
//       left: left,
//     }}
//     animate={{
//       y: [0, -30, 0],
//       x: [0, 15, 0],
//     }}
//     transition={{
//       duration: 6,
//       repeat: Infinity,
//       delay: delay,
//       ease: "easeInOut"
//     }}
//   />
// );

// const BlogDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/blog/${id}`);
//         const data = await res.json();
//         setBlog(data.data || data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="text-dark text-center pt-40 min-h-screen flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
//         />
//       </div>
//     );

//   if (!blog)
//     return <div className="text-dark text-center pt-40">Blog not found</div>;

//   // Parse keywords
//   const keywords = typeof blog.keywords === "string"
//     ? JSON.parse(blog.keywords)
//     : blog.keywords || [];

//   // Parse sub_points
//   const subPoints = typeof blog.sub_points === "string"
//     ? JSON.parse(blog.sub_points)
//     : blog.sub_points || [];

//   // Icon mapping for sub-points
//   const icons = [
//     <LightbulbIcon />,
//     <ChartIcon />,
//     <TargetIcon />,
//     <RocketIcon />,
//     <MegaphoneIcon />,
//     <DocumentIcon />
//   ];

//   return (
//     <section className="bg-white min-h-screen pb-24 relative overflow-hidden">

//       {/* ================= HERO SECTION ================= */}
//       <div className="relative overflow-hidden bg-linear-to-br from-primary via-[#9dd147] to-secondary text-dark">

//         {/* Animated Background Elements */}
//         <FloatingCircle delay={0} size="200px" color="#ffc93b" top="10%" left="5%" />
//         <FloatingCircle delay={1} size="150px" color="#8bc53f" top="60%" left="80%" />
//         <FloatingCircle delay={2} size="100px" color="#ffc93b" top="30%" left="70%" />

//         <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 relative z-10">

//           <motion.button
//             onClick={() => navigate(-1)}
//             className="mb-8 text-dark/80 hover-text-dark flex items-center gap-2 transition-colors"
//             whileHover={{ x: -5 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Blogs
//           </motion.button>

//           <motion.span
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-dark/10 px-4 py-1 rounded-full text-sm backdrop-blur inline-block"
//           >
//             {blog.category || "Blog"} • {new Date(blog.created_at).getFullYear() || "2026"}
//           </motion.span>

//           {/* TITLE */}
//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 max-w-4xl leading-tight"
//           >
//             {blog.title}
//           </motion.h1>

//           {/* DESCRIPTION */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mt-6 text-dark/70 max-w-3xl text-lg leading-relaxed"
//           >
//             {blog.description}
//           </motion.p>

//           {/* Animated Illustration */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="mt-12 flex justify-center"
//           >
//             <div className="relative">
//               <motion.div
//                 animate={{ y: [0, -20, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//               >
//                 <RocketIcon />
//               </motion.div>
//             </div>
//           </motion.div>

//         </div>

//         {/* Year decoration */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.08 }}
//           transition={{ delay: 1 }}
//           className="absolute right-0 top-0 text-[300px] font-black select-none pointer-events-none"
//         >
//           {new Date(blog.created_at).getFullYear() || "2026"}
//         </motion.div>
//       </div>

//       {/* ================= CONTENT SECTION ================= */}
//       <div className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-10">

//         {/* MAIN ARTICLE */}
//         <div className="md:col-span-2 space-y-14">

//           {/* MAIN CONTENT */}
//           {blog.content && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover-border-primary transition-all duration-300 group"
//               whileHover={{ scale: 1.02, y: -5 }}
//             >
//               <div className="flex items-start gap-6">
//                 <motion.div
//                   animate={{ rotate: [0, 360] }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   className="shrink-0"
//                 >
//                   <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none">
//                     <circle cx="32" cy="32" r="30" fill="#8bc53f" opacity="0.2" />
//                     <path d="M32 16V32L42 42" stroke="#8bc53f" strokeWidth="3" strokeLinecap="round" />
//                     <circle cx="32" cy="32" r="4" fill="#ffc93b" />
//                   </svg>
//                 </motion.div>
//                 <div className="flex-1">
//                   <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
//                     {blog.content}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* SUB POINTS SECTION */}
//           {subPoints && subPoints.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
//                 <span className="w-2 h-8 bg-secondary rounded-full"></span>
//                 Key Points
//               </h2>

//               <div className="space-y-6">
//                 {subPoints.map((point, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.15 }}
//                     whileHover={{ scale: 1.03, x: 10 }}
//                     className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover-border-primary transition-all duration-300 group cursor-pointer"
//                   >
//                     <div className="flex items-start gap-6">
//                       {/* Icon */}
//                       <motion.div
//                         className="shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary transition-all duration-300"
//                         whileHover={{ rotate: 5, scale: 1.1 }}
//                       >
//                         {icons[i % icons.length]}
//                       </motion.div>

//                       {/* Content */}
//                       <div className="flex-1">
//                         <h3 className="font-bold text-xl mb-3 group-hover-text-primary transition-colors">
//                           {point.title}
//                         </h3>
//                         <p className="text-gray-600 leading-relaxed mb-4">
//                           {point.paragraph}
//                         </p>

//                         {/* Keyword */}
//                         {point.keyword && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             className="inline-block"
//                           >
//                             <span className="bg-secondary/20 text-dark px-3 py-1 rounded-full text-sm font-medium border border-secondary/30">
//                               {point.keyword}
//                             </span>
//                           </motion.div>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* FAQ SECTION */}
//           {blog.faqs && blog.faqs.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
//                 <span className="w-2 h-8 bg-primary rounded-full"></span>
//                 Frequently Asked Questions :
//               </h2>
//               <div className="space-y-4">
//                 {blog.faqs.map((faq, i) => (
//                   <motion.details
//                     key={i}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                     className="bg-white p-6 rounded-xl shadow-md group cursor-pointer border-2 border-transparent hover-border-secondary transition-all duration-300"
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     <summary className="font-semibold text-lg flex items-center gap-3 group-hover-text-primary transition-colors">
//                       <motion.span
//                         className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-dark text-xl font-bold"
//                         whileHover={{ rotate: 180 }}
//                       >
//                         ?
//                       </motion.span>
//                       {faq.question}
//                     </summary>
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="mt-4 text-gray-600 leading-relaxed pl-11"
//                     >
//                       {faq.answer}
//                     </motion.p>
//                   </motion.details>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//         </div>

//         {/* SIDEBAR */}
//         <div className="space-y-6">

//           {/* Article Info Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.8 }}
//             whileHover={{ scale: 1.05, y: -5 }}
//             className="bg-white p-6 rounded-2xl shadow-lg sticky top-28 border-2 border-transparent hover-border-primary transition-all duration-300 group"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="font-bold text-xl group-hover-text-primary transition-colors">Article Info</h3>
//             </div>
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 bg-secondary rounded-full"></span>
//                 <p className="text-sm text-gray-600">
//                   <strong className="text-dark">Published:</strong> {new Date(blog.created_at).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 bg-primary rounded-full"></span>
//                 <p className="text-sm text-gray-600">
//                   <strong className="text-dark">Category:</strong> {blog.category || "General"}
//                 </p>
//               </div>
//               {blog.author && (
//                 <div className="flex items-center gap-2">
//                   <span className="w-2 h-2 bg-secondary rounded-full"></span>
//                   <p className="text-sm text-gray-600">
//                     <strong className="text-dark">Author:</strong> {blog.author}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Keywords Card */}
//           {keywords && keywords.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.9 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//               className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover-border-secondary transition-all duration-300"
//             >
//               <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
//                 <span className="text-xl">🏷️</span>
//                 Keywords
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {keywords.map((keyword, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: i * 0.1 }}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     className="bg-primary/10 text-dark px-3 py-1 rounded-full text-sm font-medium border border-primary/30 cursor-pointer hover:bg-primary hover:text-white transition-all"
//                   >
//                     {keyword}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* CTA Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 1 }}
//             whileHover={{ scale: 1.05, y: -5 }}
//             className="bg-linear-to-br from-primary to-secondary text-dark p-6 rounded-2xl shadow-lg relative overflow-hidden group"
//           >
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-dark rounded-full -translate-y-1/2 translate-x-1/2"></div>
//               <div className="absolute bottom-0 left-0 w-24 h-24 bg-dark rounded-full translate-y-1/2 -translate-x-1/2"></div>
//             </div>

//             <div className="relative z-10">
//               <motion.div
//                 animate={{ rotate: [0, 10, 0, -10, 0] }}
//                 transition={{ duration: 5, repeat: Infinity }}
//                 className="w-16 h-16 mb-4"
//               >
//                 <svg viewBox="0 0 64 64" fill="none">
//                   <circle cx="32" cy="32" r="30" fill="#000" opacity="0.1" />
//                   <path d="M20 32L28 40L44 24" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </motion.div>

//               <h3 className="font-bold text-xl mb-2">Need Help?</h3>
//               <p className="text-sm opacity-80 mb-4 leading-relaxed">
//                 Get expert guidance and support tailored for your needs.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-dark text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 Contact Us
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   →
//                 </motion.span>
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Decorative Illustration */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1.2 }}
//             className="hidden lg:block"
//           >
//             <div className="bg-linear-to-br from-secondary/20 to-primary/20 p-8 rounded-2xl">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//               >
//                 <ChartIcon />
//               </motion.div>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";

const API_BASE = "http://127.0.0.1:8000";

/* ---------------- SAFE PARSER ---------------- */
const safeParse = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data || [];
  } catch {
    return [];
  }
};

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blog/${id}`);
        const data = await res.json();
        setBlog(data.data || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="text-center pt-40 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );

  if (!blog)
    return <div className="text-center pt-40">Blog not found</div>;

  /* ---------------- DATA STRUCTURE ---------------- */
  const keywords = safeParse(blog.keywords);
  const subPoints = safeParse(blog.sub_points);
  const faqs = safeParse(blog.faqs);

  /* ---------------- TRUNCATE ---------------- */
  const truncate = (text, max = 280) =>
    text?.length > max ? text.slice(0, max) + "..." : text;

  return (
    <section className="bg-gray-50 min-h-screen pb-24">

      {/* ================= HERO ================= */}
      <div
        className="relative min-h-200 flex items-center"
        style={{
          backgroundImage: blog.hero_image
            ? `url(${API_BASE}${blog.hero_image})`
            : `url("/assets/blog.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-20 text-white z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-96 text-white/80 hover:text-white"
          >
            ← Back to Blogs
          </button>

          <h1 className="text-4xl md:text-5xl font-black pb-20 leading-tight">
            {blog.title}
          </h1>

          <p className="mt-5 text-lg text-white/90 font-medium max-w-3xl">
            {blog.description}
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 mt-12 grid md:grid-cols-[1fr_300px] gap-10">

        {/* MAIN ARTICLE */}
        <div className="space-y-10">

          {/* CONTENT CARD */}
          {/* <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div
              className="prose prose-lg max-w-none 
                         prose-headings:text-dark 
                         prose-p:text-gray-700 
                         prose-li:text-gray-700 
                         prose-strong:text-dark"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          </div> */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none prose-headings:text-primary">
              <ReactMarkdown>
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* SUB POINTS */}
          {subPoints.length > 0 && (
            <div className="space-y-6">
              {subPoints.map((point, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-bold text-xl mb-2 text-dark">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {truncate(point.paragraph)}
                  </p>
                  {point.keyword && (
                    <div className="text-secondary font-semibold text-sm flex items-center gap-2">
                      • {point.keyword}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">FAQs</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="bg-white p-6 rounded-xl border">
                    <summary className="font-semibold cursor-pointer">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {keywords.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold mb-4">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k, i) => (
                  <span
                    key={i}
                    className="bg-primary/10 px-3 py-1 rounded text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

