import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [open, setOpen] = useState(true);

    return (
        <div
            className={`bg-black text-white h-screen fixed transition-all duration-300 ${open ? "w-64" : "w-20"
                }`}
        >

            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="p-4 text-yellow-400"
            >
                ☰
            </button>

            <nav className="mt-10 flex flex-col gap-4">

                <Link
                    to="/admin/dashboard"
                    className="px-6 py-3 hover:bg-gray-800"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/blogs"
                    className="px-6 py-3 hover:bg-gray-800"
                >
                    Blogs
                </Link>

                <Link
                    to="/admin/create-blog"
                    className="px-6 py-3 hover:bg-gray-800"
                >
                    Create Blog
                </Link>

            </nav>

        </div>
    );
}