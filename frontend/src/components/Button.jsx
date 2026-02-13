import { motion } from "framer-motion";

const Button = ({ variant = "primary", children, ...props }) => {
    const base =
        "px-6 py-3 rounded-lg font-medium transition inline-flex items-center justify-center";

    const styles = {
        primary: "bg-primary text-white hover:opacity-90",
        secondary:
            "bg-secondary text-black hover:bg-opacity-90",
        outline:
            "border border-primary text-primary hover:bg-primary hover:text-white",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${base} ${styles[variant]}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
