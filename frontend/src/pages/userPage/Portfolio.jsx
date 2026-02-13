// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// /* ---------------- PROJECT DATA ---------------- */

// const projects = [
//   {
//     id: 1,
//     title: "E-Commerce Growth Campaign",
//     category: "Marketing",
//     cover: "/assets/illustrations/seo.png",
//     gallery: [
//       "/assets/illustrations/brand.png",
//       "/assets/illustrations/brand.png",
//       "/assets/illustrations/brand.png",
//     ],
//   },
//   {
//     id: 2,
//     title: "Brand Identity Design",
//     category: "Branding",
//     cover: "/assets/illustrations/brand.png",
//     gallery: [
//       "/assets/illustrations/brand.png",
//       "/assets/illustrations/brand.png",
//       "/assets/illustrations/brand.png",
//     ],
//   },
//   {
//     id: 3,
//     title: "AI Automation System",
//     category: "AI",
//     cover: "/assets/ai1.jpg",
//     gallery: ["/assets/ai1.jpg", "/assets/ai2.jpg"],
//   },
// ];

// /* ---------------- COMPONENT ---------------- */

// export default function Portfolio() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeProject, setActiveProject] = useState(null);
//   const [activeImage, setActiveImage] = useState(null);

//   const filters = ["All", "Branding","Social Media","Logo Designing", "Animation", "3D Work"];

//   const filteredProjects =
//     activeFilter === "All"
//       ? projects
//       : projects.filter((p) => p.category === activeFilter);

//   const nextImg = () =>
//     setActiveImage((prev) =>
//       prev === activeProject.gallery.length - 1 ? 0 : prev + 1
//     );

//   const prevImg = () =>
//     setActiveImage((prev) =>
//       prev === 0 ? activeProject.gallery.length - 1 : prev - 1
//     );

//   return (
//     <div className="bg-black text-white min-h-screen px-6 md:px-16 py-20">
//       {/* TITLE */}
//       <h1 className="text-5xl font-bold text-center mb-12">
//         Our <span className="text-lime-400">Portfolio</span>
//       </h1>

//       {/* FILTER BUTTONS */}
//       <div className="flex justify-center gap-4 mb-12 flex-wrap">
//         {filters.map((f) => (
//           <button
//             key={f}
//             onClick={() => setActiveFilter(f)}
//             className={`px-6 py-2 rounded-full border transition ${activeFilter === f
//               ? "bg-lime-400 text-black border-lime-400"
//               : "border-white/20 hover:border-lime-400"
//               }`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {/* PROJECT GRID */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {filteredProjects.map((project) => (
//           <motion.div
//             key={project.id}
//             className="group cursor-pointer overflow-hidden rounded-2xl"
//             whileHover={{ scale: 1.03 }}
//             onClick={() => setActiveProject(project)}
//           >
//             <img
//               src={project.cover}
//               className="w-full h-64 object-cover group-hover:scale-110 transition"
//             />
//             <div className="p-4 bg-zinc-900">
//               <h3 className="text-xl font-semibold">{project.title}</h3>
//               <p className="text-sm text-white/60">{project.category}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ---------------- GALLERY MODAL ---------------- */}
//       <AnimatePresence>
//         {activeProject && (
//           <motion.div
//             className="fixed inset-0 bg-black/95 z-50 p-10 overflow-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button
//               onClick={() => {
//                 setActiveProject(null);
//                 setActiveImage(null);
//               }}
//               className="absolute top-6 right-6 z-70 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition"
//             >
//               <X size={26} />
//             </button>


//             <h2 className="text-4xl font-bold text-center mt-18 mb-10">
//               {activeProject.title}
//             </h2>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//               {activeProject.gallery.map((img, i) => (
//                 <div
//                   key={i}
//                   className="aspect-5/3 overflow-hidden rounded-2xl cursor-pointer"
//                   onClick={() => setActiveImage(i)}
//                 >
//                   <img
//                     src={img}
//                     className="w-full h-full object-cover hover:scale-110 transition"
//                   />
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ---------------- IMAGE PREVIEW ---------------- */}
//       <AnimatePresence>
//         {activeImage !== null && activeProject && (
//           <motion.div
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-60"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button className="absolute left-6" onClick={prevImg}>
//               <ChevronLeft size={40} />
//             </button>

//             <motion.img
//               key={activeImage}
//               src={activeProject.gallery[activeImage]}
//               className="max-h-[80vh] rounded-2xl shadow-2xl"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//             />

//             <button className="absolute right-6" onClick={nextImg}>
//               <ChevronRight size={40} />
//             </button>

//             <button
//               onClick={() => {
//                 setActiveProject(null);
//                 setActiveImage(null);
//               }}
//               className="absolute top-20 right-6 z-70 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition"
//             >
//               <X size={26} />
//             </button>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- PROJECT DATA ---------------- */

const projects = [
  {
    id: 1,
    title: "E-Commerce Growth Campaign",
    category: "Marketing",
    cover: "/assets/illustrations/seo.png",
    gallery: [
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
    ],
  },
  {
    id: 7,
    title: "E-Commerce Growth Campaign",
    category: "Marketing",
    cover: "/assets/illustrations/seo.png",
    gallery: [
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
    ],
  },
  {
    id: 8,
    title: "E-Commerce Growth Campaign",
    category: "Marketing",
    cover: "/assets/illustrations/seo.png",
    gallery: [
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
    ],
  },
  {
    id: 2,
    title: "Brand Identity Design",
    category: "Branding",
    cover: "/assets/illustrations/brand.png",
    gallery: [
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
    ],
  },
  {
    id: 3,
    title: "AI Automation System",
    category: "Logo Designing",
    cover: "/assets/ai1.jpg",
    gallery: ["/assets/ai1.jpg", "/assets/ai2.jpg"],
  },
  {
    id: 4,
    title: "E-Commerce ",
    category: "Social Media",
    cover: "/assets/illustrations/seo.png",
    gallery: [
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
    ],
  },
  {
    id: 5,
    title: "Brand Identity Design",
    category: "3D Work",
    cover: "/assets/illustrations/brand.png",
    gallery: [
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
      "/assets/illustrations/brand.png",
    ],
  },
  {
    id: 6,
    title: "AI Automation System",
    category: "Animation",
    cover: "/assets/ai1.jpg",
    gallery: ["/assets/ai1.jpg", "/assets/ai2.jpg"],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [page, setPage] = useState(0);

  const filters = [
    "All",
    "Branding",
    "Social Media",
    "Logo Designing",
    "Animation",
    "3D Work",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  /* ----------- SLIDER LOGIC ----------- */

  const cardsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / cardsPerPage);

  const nextSlide = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevSlide = () => {
    if (page > 0) setPage(page - 1);
  };



  return (
    <div className="bg-dark text-white min-h-screen px-6 md:px-16 py-20">

      {/* TITLE */}
      <h1 className="text-5xl font-bold text-center mb-12">
        Our <span className="text-primary">Portfolio</span>
      </h1>

      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setActiveFilter(f);
              setPage(0);
            }}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${activeFilter === f
              ? "bg-primary text-dark border-primary shadow-primary"
              : "border-white/20 hover-border-primary hover-text-primary"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ----------- SLIDER ----------- */}

      {/* <div className="relative">

        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${page * 100}%` }}
            transition={{ duration: 0.6 }}
            style={{ width: `${totalPages * 100}%` }}
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-42 shrink-0"
              >
                {filteredProjects
                  .slice(
                    index * cardsPerPage,
                    index * cardsPerPage + cardsPerPage
                  )
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveProject(project)}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden transition"
                    >
                      <img
                        src={project.cover}
                        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-dark group-hover-text-primary transition">
                          {project.title}
                        </h3>
                        <p className="text-muted text-sm">
                          {project.category}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

        {page > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-dark p-3 rounded-full shadow-primary hover-shadow-primary transition"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {page < totalPages - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-dark p-3 rounded-full shadow-primary hover-shadow-primary transition"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div> */}
      {/* ----------- SLIDER ----------- */}

      <div className="relative">

        {/* SLIDER WRAPPER */}
        <div className="overflow-hidden">

          <motion.div
            className="flex"
            animate={{ x: `-${page * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className="min-w-full grid md:grid-cols-3 gap-10 px-2"
              >
                {filteredProjects
                  .slice(
                    index * cardsPerPage,
                    index * cardsPerPage + cardsPerPage
                  )
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveProject(project)}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden transition"
                    >
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                      />

                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-dark group-hover:text-primary transition">
                          {project.title}
                        </h3>
                        <p className="text-muted text-sm">
                          {project.category}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </motion.div>

        </div>

        {/* PREV BUTTON */}
        {page > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-dark p-3 rounded-full shadow-primary"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* NEXT BUTTON */}
        {page < totalPages - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-dark p-3 rounded-full shadow-primary"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* ---------------- GALLERY MODAL (UNCHANGED LOGIC) ---------------- */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-dark/95 z-50 p-10 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => {
                setActiveProject(null);
                setActiveImage(null);
              }}
              className="absolute top-6 right-6 bg-primary text-dark p-3 rounded-full shadow-primary"
            >
              <X size={22} />
            </button>

            <h2 className="text-4xl font-bold text-center mb-10 text-primary">
              {activeProject.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {activeProject.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="overflow-hidden rounded-2xl cursor-pointer"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover hover:scale-110 transition"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
