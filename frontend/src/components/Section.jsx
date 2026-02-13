import { motion } from "framer-motion";
import { sectionFade } from "../animations/section";

const Section = ({ children, className = "" }) => {
    return (
        <motion.section
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`max-w-7xl mx-auto px-6 py-24 bg-white ${className}`}
        >
            {children}
        </motion.section>
    );
};

export default Section;
