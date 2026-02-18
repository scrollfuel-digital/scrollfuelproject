import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services } from "../data/services.js";

/* ANIMATED ICON COMPONENT WITH ILLUSTRATIONS */
const ServiceIcon = ({ type, isHovered }) => {
  const icons = {
    Video: (
      <div className="relative w-20 h-20">
        {/* Background circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 to-secondary/20"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 180, 360] : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Main icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.rect
            x="2" y="4" width="20" height="16" rx="2"
            animate={{ strokeWidth: isHovered ? 2 : 1.5 }}
          />
          <motion.path
            d="M10 9L15 12L10 15V9Z"
            fill="currentColor"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M2 8H22M2 16H22"
            strokeOpacity="0.3"
            animate={{ strokeOpacity: isHovered ? 0.6 : 0.3 }}
          />
        </svg>
        
        {/* Floating particles */}
        {isHovered && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-primary"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], y: [-10, -30], x: [0, 10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-secondary"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], y: [10, 30], x: [0, -10] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </div>
    ),
    
    Palette: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-secondary/20 to-primary/20"
          animate={{
            scale: isHovered ? [1, 1.15, 1] : 1,
          }}
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
        
        {/* Color dots */}
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
    
    Instagram: (
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
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
        
        {/* Hearts animation */}
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
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
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
            animate={{
              strokeOpacity: isHovered ? [0.5, 1, 0.5] : 0.5,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
        
        {/* Binary numbers */}
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
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full relative z-10 p-4">
          <motion.path
            d="M22 7L13.5 15.5L8.5 10.5L2 17"
            strokeWidth="2"
            animate={{
              pathLength: isHovered ? [0, 1] : 1,
            }}
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
        
        {/* Arrow up */}
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
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
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
        
        {/* Document lines animation */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
          >
            <div className="w-8 h-0.5 bg-current" />
            <div className="w-6 h-0.5 bg-current" />
            <div className="w-7 h-0.5 bg-current" />
          </motion.div>
        )}
      </div>
    ),
  };

  return icons[type] || icons.FileText;
};

/* BACKGROUND PATTERN */
const AnimatedBackground = ({ isHovered }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid pattern */}
    {/* <motion.div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(139, 197, 63, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 197, 63, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
      animate={{
        opacity: isHovered ? 0.15 : 0.05,
      }}
      transition={{ duration: 0.3 }}
    /> */}
    
    {/* Floating circles */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
      animate={{
        scale: isHovered ? [1, 1.2, 1] : 1,
        opacity: isHovered ? [0.05, 0.15, 0.05] : 0.05,
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-secondary/5 blur-2xl"
      animate={{
        scale: isHovered ? [1, 1.3, 1] : 1,
        opacity: isHovered ? [0.05, 0.15, 0.05] : 0.05,
      }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    />
  </div>
);

/* SERVICES SECTION WITH FORWARDED REF */
const Services = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 bg-dark text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Title */}
      <motion.div
        className="max-w-7xl mx-auto px-8 mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center text-xl md:text-3xl font-bold uppercase tracking-wider relative">
          <span className="relative inline-block">
            Everything Your Brand Needs
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </span>
        </h2>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((ser, idx) => (
            <motion.div
              key={ser.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              // onClick={() => navigate(`/services/${ser.slug}`)}
              onClick={() => navigate(`/services?service=${ser.slug}`)}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {/* Card container */}
              <motion.div
                className="relative h-full min-h-100 p-8 rounded-2xl overflow-hidden border border-white/10 flex flex-col"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(30, 30, 30, 0.8) 100%)',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background on hover */}
                <AnimatedBackground isHovered={hoveredIndex === idx} />
                
                {/* Color overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-primary/0 to-secondary/0"
                  animate={{
                    background: hoveredIndex === idx
                      ? 'linear-gradient(135deg, rgba(139, 197, 63, 0.15) 0%, rgba(255, 201, 59, 0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(139, 197, 63, 0) 0%, rgba(255, 201, 59, 0) 100%)',
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Corner accents */}
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16"
                  animate={{
                    borderColor: hoveredIndex === idx ? 'var(--color-green)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  style={{
                    borderTop: '2px solid',
                    borderRight: '2px solid',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-16 h-16"
                  animate={{
                    borderColor: hoveredIndex === idx ? 'var(--color-yellow)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  style={{
                    borderBottom: '2px solid',
                    borderLeft: '2px solid',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon - Fixed position */}
                  <motion.div
                    className="text-secondary mb-6"
                    animate={{
                      color: hoveredIndex === idx ? 'var(--color-green)' : 'var(--color-yellow)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ServiceIcon type={ser.icon} isHovered={hoveredIndex === idx} />
                  </motion.div>

                  {/* Title - Fixed height */}
                  <motion.h3
                    className="text-xl font-bold tracking-tight mb-4 h-14 flex items-start"
                    animate={{
                      color: hoveredIndex === idx ? 'var(--color-green)' : 'var(--color-yellow)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {ser.title}
                  </motion.h3>

                  {/* Description - Fixed height with line clamp */}
                  <motion.p
                    className="text-gray-300 text-sm leading-relaxed font-light mb-6 grow line-clamp-4 h-24"
                    animate={{
                      color: hoveredIndex === idx ? '#ffffff' : '#d1d5db',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {ser.description}
                  </motion.p>

                  {/* Footer with animated arrow - Fixed at bottom */}
                  <div className="pt-4 flex items-center justify-between mt-auto border-t border-white/5">
                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium"
                      animate={{
                        color: hoveredIndex === idx ? 'var(--color-green)' : 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <span>Learn More</span>
                      <motion.span
                        animate={{
                          x: hoveredIndex === idx ? [0, 5, 0] : 0,
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>

                    <motion.div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      animate={{
                        borderColor: hoveredIndex === idx ? 'var(--color-green)' : 'rgba(255, 255, 255, 0.3)',
                        rotate: hoveredIndex === idx ? 90 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        animate={{
                          backgroundColor: hoveredIndex === idx ? 'var(--color-green)' : 'var(--color-yellow)',
                          scale: hoveredIndex === idx ? [1, 1.5, 1] : 1,
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
