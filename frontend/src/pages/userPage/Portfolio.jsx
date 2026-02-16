import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- PROJECT DATA ---------------- */

const projects = [
  {
    id: 1,
    title: "Marketing",
    category: "Marketing",
    cover: "/assets/hero/branding.jpeg",
    gallery: [
      "/assets/hero/content.jpeg",
      "/assets/hero/content.jpeg",
      "/assets/hero/content.jpeg",
    ],
  },
  {
    id: 7,
    title: "Marketing",
    category: "Marketing",
    cover: "/assets/hero/content.jpeg",
    gallery: [
      "/assets/hero/branding.jpeg",
      "/assets/hero/branding.jpeg",
      "/assets/hero/branding.jpeg",
    ],
  },
  {
    id: 8,
    title: "Marketing",
    category: "Marketing",
    cover: "/assets/hero/seo.jpeg",
    gallery: [
      "/assets/hero/content.jpeg",
      "/assets/hero/content.jpeg",
      "/assets/hero/content.jpeg",
    ],
  },
  {
    id: 2,
    title: "Brand Identity Design",
    category: "Branding",
    cover: "/assets/hero/social.jpeg",
    gallery: [
      "/assets/hero/seo.jpeg",
      "/assets/hero/seo.jpeg",
      "/assets/hero/seo.jpeg",
    ],
  },
  {
    id: 3,
    title: "Logo Designing",
    category: "Logo Designing",
    cover: "/assets/hero/seo.jpeg",
    gallery: ["/assets/hero/seo.jpeg", "/assets/hero/seo.jpeg"],
  },
  {
    id: 4,
    title: "Social Media",
    category: "Social Media",
    cover: "/assets/hero/seo.jpeg",
    gallery: [
      "/assets/hero/seo.jpeg",
      "/assets/hero/seo.jpeg",
      "/assets/hero/seo.jpeg",
    ],
  },
  {
    id: 5,
    title: "3D Work",
    category: "3D Work",
    cover: "/assets/hero/seo.jpeg",
    gallery: [
      "/assets/hero/seo.jpeg",
      "/assets/hero/seo.jpeg",
      "/assets/hero/seo.jpeg",
    ],
  },
  {
    id: 6,
    title: "AI Automation System",
    category: "Animation",
    cover: "/assets/hero/seo.jpeg",
    gallery: ["/assets/hero/seo.jpeg", "/assets/hero/seo.jpeg"],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

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

  const cardsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / cardsPerPage);

  const nextSlide = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevSlide = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div
      className="bg-dark text-white min-h-screen px-6 md:px-16 py-20">

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

      <div className="relative">

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
                  .slice(index * cardsPerPage, index * cardsPerPage + cardsPerPage)
                  .map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveProject(project)}
                      className="group cursor-pointer border border-white rounded-2xl overflow-hidden transition"
                    >
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                      />

                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-primary group-hover:text-primary transition">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-dark p-3 rounded-full shadow-primary"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {page < totalPages - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-dark p-3 rounded-full shadow-primary"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* ---------------- GALLERY MODAL ---------------- */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 p-10 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => {
                setActiveProject(null);
                setActiveImage(null);
              }}
              className="absolute top-6 right-6 text-white pt-23 rounded-full"
            >
              <X size={22} />
            </button>

            <h2 className="text-4xl font-bold text-center mt-30 mb-10 text-primary">
              {activeProject.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {activeProject.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="overflow-hidden rounded-2xl cursor-pointer"
                >
                  <img
                    src={img}
                    className="w-full h-40 md:h-48 object-cover hover:scale-110 transition duration-300"
                  />
                </div>
              ))}
            </div>

            <AnimatePresence>
              {activeImage !== null && (
                <motion.div
                  className="fixed inset-0 bg-black/95 flex items-center justify-center z-60 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setActiveImage(null)}
                    className="absolute top-6 right-6 text-white pt-23 rounded-full z-20"
                  >
                    <X size={22} />
                  </button>

                  {/* LEFT BUTTON */}
                  {activeImage > 0 && (
                    <button
                      onClick={() => {
                        setDirection(-1);
                        setActiveImage(activeImage - 1);
                      }}
                      className="absolute left-10 bg-primary text-dark p-3 rounded-full z-20"
                    >
                      <ChevronLeft size={28} />
                    </button>
                  )}

                  {/* RIGHT BUTTON */}
                  {activeImage < activeProject.gallery.length - 1 && (
                    <button
                      onClick={() => {
                        setDirection(1);
                        setActiveImage(activeImage + 1);
                      }}
                      className="absolute right-10 bg-primary text-dark p-3 rounded-full z-20"
                    >
                      <ChevronRight size={28} />
                    </button>
                  )}

                  {/* IMAGE CONTAINER */}
                  <div className="relative flex items-center justify-center w-full h-full">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.img
                        key={activeImage}
                        src={activeProject.gallery[activeImage]}
                        custom={direction}
                        className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl absolute"
                        initial={(direction) => ({
                          x: direction > 0 ? 400 : -400,
                          opacity: 0,
                        })}
                        animate={{ x: 0, opacity: 1 }}
                        exit={(direction) => ({
                          x: direction > 0 ? -400 : 400,
                          opacity: 0,
                        })}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
