import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
    return (
        <div className="flex items-center text-bold text-gray-500 mb-6">

            {items.map((item, index) => (
                <div key={index} className="flex items-center">

                    {index !== 0 && (
                        <span className="mx-2 text-primary">/</span>
                    )}

                    {item.link ? (
                        <Link
                            to={item.link}
                            className="hover:text-primary transition"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 dark:text-gray-300 font-medium">
                            {item.label}
                        </span>
                    )}

                </div>
            ))}

        </div>
    );
};

export default Breadcrumb;