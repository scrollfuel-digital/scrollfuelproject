
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const API_BASE = "http://127.0.0.1:8000";

// const Blog = () => {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);

//   /* Fetch Blogs from API */
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/blog`);
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

//   /* Auto Slide */
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

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             <span className="text-primary">Blogs</span>
//           </h1>
//         </motion.div>

//         {/* Slider */}
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
//                   src={
//                     blogs[current]?.image
//                       ? `${API_BASE}${blogs[current].image}`
//                       : "/assets/blog.jpeg"
//                   }
//                   alt={blogs[current]?.title}
//                   className="rounded-2xl shadow-lg"
//                 />
//                 <div>
//                   <h2 className="text-3xl font-bold mt-3 mb-4 text-primary">
//                     {blogs[current]?.title}
//                   </h2>

//                   <p className="text-muted mb-6 leading-relaxed">
//                     {blogs[current]?.content?.slice(0, 330) || "No content available"}...
//                   </p>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Controls */}
//           <div className="flex justify-center gap-4 mt-8">
//             <button onClick={prevSlide} className="btn-circle">←</button>
//             <button onClick={nextSlide} className="btn-circle">→</button>
//           </div>
//         </div>

//         {/* Blog Grid */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <motion.div
//               key={blog._id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="group border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
//             >
//               <div className="overflow-hidden h-52">
//                 <img
//                   src={blog.image ? `${API_BASE}${blog.image}` : "/assets/hero/video.jpeg"}
//                   alt={blog.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//               </div>

//               <div className="p-6 bg-black">
//                 <h3 className="text-xl font-semibold mt-2 mb-3 text-primary">
//                   {blog.title}
//                 </h3>

//                 <p className="text-muted text-sm leading-relaxed mb-4">
//                   {blog?.content?.slice(0, 100) || "No content available"}...
//                 </p>
//                 <button
//                   className="text-primary font-medium hover:underline"
//                   onClick={() => navigate(`/blog/${blog._id}`)}
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

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

/* -------- REMOVE HTML TAGS -------- */
const stripHTML = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blog`);
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

  useEffect(() => {
    if (blogs.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogs.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [blogs]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % blogs.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? blogs.length - 1 : prev - 1
    );

  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-black text-center text-white">
        Loading blogs...
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="pt-28 pb-20 bg-black text-center text-white">
        No blogs found.
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-primary">Blogs</span>
          </h1>
        </motion.div>

        {/* Slider */}
        <div className="relative mb-28">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-10 items-center bg-muted/5 rounded-3xl p-8 md:p-12"
              >
                <img
                  src={
                    blogs[current]?.image
                      ? `${API_BASE}${blogs[current].image}`
                      : "/assets/blog.jpeg"
                  }
                  alt={blogs[current]?.title}
                  className="rounded-2xl shadow-lg"
                />
                <div>
                  <h2 className="text-3xl font-bold mt-3 mb-4 text-primary">
                    {blogs[current]?.title}
                  </h2>

                  <p className="text-muted mb-6 leading-relaxed">
                    {stripHTML(blogs[current]?.content).slice(0, 330)}...
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevSlide} className="btn-circle">←</button>
            <button onClick={nextSlide} className="btn-circle">→</button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="overflow-hidden h-52">
                <img
                  src={
                    blogs[current]?.image
                      ? `${API_BASE}${blogs[current].image}`
                      : "/assets/blog.jpeg"
                  }
                  alt={blogs[current]?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6 bg-black">
                <h3 className="text-xl font-semibold mt-2 mb-3 text-primary">
                  {blog.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed mb-4">
                  {stripHTML(blog?.content).slice(0, 100)}...
                </p>

                <button
                  className="text-primary font-medium hover:underline"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;
