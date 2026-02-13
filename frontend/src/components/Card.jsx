import { motion } from "framer-motion";

const Card = ({ children }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
        >
            {children}
        </motion.div>
    );
};

export default Card;
