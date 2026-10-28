import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SERVICES_SECTION = {
  heading: "Digital Marketing Services Designed Around Your Business",
  description:
    "Every business has different goals. Our digital marketing services help businesses improve search visibility, connect with relevant audiences, build brand awareness, and create a stronger online presence.",
  cta: "View All Services",
  cards: [
    {
      path: "/seo-and-ppc-services/",
      icon: "Target",
      title: "SEO and PPC Services",
      description:
        "Reach relevant audiences through organic search strategies and paid advertising campaigns.",
    },
    {
      path: "/content-marketing-services/",
      icon: "FileText",
      title: "Content Marketing",
      description:
        "Share useful, engaging content that answers customer questions and builds trust.",
    },
    {
      path: "/social-media-marketing-services/",
      icon: "Instagram",
      title: "Social Media Marketing",
      description:
        "Build brand awareness and connect with your audience through relevant social platforms.",
    },
    {
      path: "/website-development-services/",
      icon: "Code",
      title: "Website Development",
      description:
        "Create responsive, user-friendly websites designed around your business needs.",
    },
    {
      path: "/branding-and-design-services/",
      icon: "Palette",
      title: "Branding and Design",
      description:
        "Present your business with consistent branding and professional visual content.",
    },
    {
      path: "/videography-and-photography-services/",
      icon: "Camera",
      title: "Videography and Photography",
      description:
        "Professional Photography and Videography Services for Brand Marketing and Business Growth.",
    },
  ],
};

/* ANIMATED ICON COMPONENT WITH ILLUSTRATIONS */
const ServiceIcon = ({ type, isHovered }) => {
  const icons = {
    Palette: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-secondary/20 to-primary/20"
          animate={{ scale: isHovered ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.circle
            cx="12" cy="12" r="10"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 3, ease: "linear", repeat: isHovered ? Infinity : 0 }}
          />
          <motion.circle
            cx="12" cy="12" r="4"
            strokeDasharray="2 2"
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M12 2V6M12 18V22M2 12H6M18 12H22"
            strokeOpacity="0.4"
            animate={{ strokeOpacity: isHovered ? [0.4, 0.8, 0.4] : 0.4 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
        {isHovered && (
          <>
            <motion.div
              className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-secondary"
              animate={{ scale: [0, 1, 0], rotate: [360, 180, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </div>
    ),

    /* NEW: used for "SEO and PPC Services" */
    Target: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-secondary/20 to-primary/20"
          animate={{ scale: isHovered ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.circle
            cx="12" cy="12" r="10"
            animate={{ strokeWidth: isHovered ? 2 : 1.5 }}
          />
          <motion.circle
            cx="12" cy="12" r="6"
            animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.circle
            cx="12" cy="12" r="2"
            fill="currentColor"
            animate={{ scale: isHovered ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.path
            d="M12 2V5M12 19V22M2 12H5M19 12H22"
            strokeOpacity="0.4"
            animate={{ strokeOpacity: isHovered ? 0.8 : 0.4 }}
          />
        </svg>
      </div>
    ),

    /* NEW: Videography and Photography */
    Camera: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20"
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? -4 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full relative z-10 p-4">
          {/* Camera body */}
          <motion.path
            d="M4 8H7L8.5 5.5H15.5L17 8H20C21.1 8 22 8.9 22 10V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V10C2 8.9 2.9 8 4 8Z"
            animate={{ strokeWidth: isHovered ? 2 : 1.5 }}
          />
          {/* Lens ring */}
          <motion.circle
            cx="12" cy="14" r="3.6"
            animate={{ scale: isHovered ? [1, 1.12, 1] : 1 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {/* Focus ring (rotating dashes) */}
          <motion.circle
            cx="12" cy="14" r="1.6"
            strokeDasharray="1.5 1.5"
            animate={{ rotate: isHovered ? 360 : 0 }}
            style={{ originX: "12px", originY: "14px" }}
            transition={{ duration: 3, ease: "linear", repeat: isHovered ? Infinity : 0 }}
          />
          {/* Viewfinder dot */}
          <circle cx="18.5" cy="10.5" r="0.5" fill="currentColor" />
        </svg>

        {/* Flash burst */}
        {isHovered && (
          <motion.div
            className="absolute top-1 right-2 w-3 h-3 rounded-full bg-secondary"
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.8, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}

        {/* REC indicator */}
        {isHovered && (
          <motion.div
            className="absolute -bottom-1 -left-1 flex items-center gap-1 text-[9px] font-bold text-primary"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            REC
          </motion.div>
        )}
      </div>
    ),

    Instagram: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20"
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.rect
            x="3" y="3" width="18" height="18" rx="5"
            animate={{ strokeWidth: isHovered ? 2 : 1.5 }}
          />
          <motion.circle
            cx="12" cy="12" r="4"
            animate={{ scale: isHovered ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
        {isHovered && (
          <>
            <motion.div
              className="absolute top-0 right-0 text-primary text-xs"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ♥
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 text-secondary text-xs"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: 20 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
            >
              ★
            </motion.div>
          </>
        )}
      </div>
    ),

    Code: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20"
          animate={{ scale: isHovered ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.path
            d="M16 18L22 12L16 6"
            animate={{ x: isHovered ? [0, 3, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M8 6L2 12L8 18"
            animate={{ x: isHovered ? [0, -3, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M13 4L11 20"
            strokeOpacity="0.5"
            animate={{ strokeOpacity: isHovered ? [0.5, 1, 0.5] : 0.5 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono opacity-20">
            <motion.span
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              101010
            </motion.span>
          </div>
        )}
      </div>
    ),

    TrendingUp: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 to-secondary/20"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.path
            d="M22 7L13.5 15.5L8.5 10.5L2 17"
            strokeWidth="2"
            animate={{ pathLength: isHovered ? [0, 1] : 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M16 7H22V13"
            animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M2 4V20H20"
            strokeOpacity="0.3"
            animate={{ strokeOpacity: isHovered ? 0.6 : 0.3 }}
          />
        </svg>
        {isHovered && (
          <motion.div
            className="absolute top-2 right-2 text-primary"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-5, -15] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↑
          </motion.div>
        )}
      </div>
    ),

    FileText: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-lg bg-linear-to-br from-secondary/20 to-primary/20"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.path
            d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
            animate={{ strokeWidth: isHovered ? 2 : 1.5 }}
          />
          <motion.path
            d="M14 2V8H20"
            animate={{ opacity: isHovered ? [1, 0.5, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M8 13H16M8 17H16M8 9H10"
            strokeOpacity="0.4"
            animate={{
              strokeOpacity: isHovered ? [0.4, 0.8, 0.4] : 0.4,
              x: isHovered ? [0, 2, 0] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </div>
    ),
  };

  return icons[type] || icons.FileText;
};

/* SERVICES SECTION WITH FORWARDED REF */
const Services = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const { heading, description, cta, cards } = SERVICES_SECTION;

  return (
    <section
      ref={ref}
      id="services"
      aria-labelledby="services-heading"
      className="py-20 bg-white text-black dark:bg-black dark:text-white relative overflow-hidden"
    >
      {/* Static background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Title + description */}
      <motion.div
        className="max-w-4xl mx-auto px-8 mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          id="services-heading"
          className="font-serif text-3xl md:text-5xl font-extrabold leading-[1.15] tracking-tight"
        >
          {heading}
        </h2>

        {/* Divider: line – diamond – line */}
        <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
          <motion.span
            className="h-0.5 w-16 md:w-24 origin-right"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-green))" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.span
            className="w-3 h-3 rotate-45"
            style={{ background: "linear-gradient(135deg, var(--color-green), var(--color-yellow))" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
          />
          <motion.span
            className="h-0.5 w-16 md:w-24 origin-left"
            style={{ background: "linear-gradient(90deg, var(--color-yellow), transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((ser, idx) => (
            <motion.div
              key={ser.path}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group h-full"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={ser.path}
                onClick={() => window.scrollTo({ top: 0, left: 0 })}
                aria-label={`${ser.title} – view details`}
                className="block h-full cursor-pointer rounded-2xl"
              >
                {/* Card container */}
                <motion.div
                  className="relative h-full p-8 rounded-2xl overflow-hidden border border-white/10 flex flex-col"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(30, 30, 30, 0.8) 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Static background circles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-secondary/5 blur-2xl" />
                  </div>

                  {/* Color overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-br from-primary/0 to-secondary/0"
                    animate={{
                      background:
                        hoveredIndex === idx
                          ? "linear-gradient(135deg, rgba(139, 197, 63, 0.15) 0%, rgba(255, 201, 59, 0.15) 100%)"
                          : "linear-gradient(135deg, rgba(139, 197, 63, 0) 0%, rgba(255, 201, 59, 0) 100%)",
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16"
                    animate={{
                      borderColor:
                        hoveredIndex === idx ? "var(--color-green)" : "rgba(255, 255, 255, 0.1)",
                    }}
                    style={{ borderTop: "2px solid", borderRight: "2px solid" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-16 h-16"
                    animate={{
                      borderColor:
                        hoveredIndex === idx ? "var(--color-yellow)" : "rgba(255, 255, 255, 0.1)",
                    }}
                    style={{ borderBottom: "2px solid", borderLeft: "2px solid" }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      className="text-secondary mb-6"
                      animate={{
                        color: hoveredIndex === idx ? "var(--color-green)" : "var(--color-yellow)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ServiceIcon type={ser.icon} isHovered={hoveredIndex === idx} />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-2xl font-bold tracking-tight mb-3"
                      animate={{
                        color: hoveredIndex === idx ? "var(--color-green)" : "var(--color-white)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {ser.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-lg leading-relaxed font-semibold mb-6 grow"
                      animate={{ color: hoveredIndex === idx ? "#ffffff" : "#d1d5db" }}
                      transition={{ duration: 0.3 }}
                    >
                      {ser.description}
                    </motion.p>

                    {/* Footer */}
                    <div className="pt-4 flex items-center justify-between mt-auto border-t border-white/5">
                      <motion.div
                        className="flex items-center gap-2 text-lg font-bold"
                        animate={{
                          color:
                            hoveredIndex === idx ? "var(--color-green)" : "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        <span>Learn More</span>
                        <motion.span
                          animate={{ x: hoveredIndex === idx ? [0, 5, 0] : 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>

                      <motion.div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                        animate={{
                          borderColor:
                            hoveredIndex === idx ? "var(--color-green)" : "rgba(255, 255, 255, 0.3)",
                          rotate: hoveredIndex === idx ? 90 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          animate={{
                            backgroundColor:
                              hoveredIndex === idx ? "var(--color-green)" : "var(--color-yellow)",
                            scale: hoveredIndex === idx ? [1, 1.5, 1] : 1,
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Services button */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            type="button"
            onClick={() => navigate("/services/")}
            className="bg-primary text-black font-bold text-lg px-8 py-3 rounded-full hover-shadow-primary shadow-primary transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            {cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;