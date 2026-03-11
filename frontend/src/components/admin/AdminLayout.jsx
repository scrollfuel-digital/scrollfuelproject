import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./AdminNavbar";

export default function AdminLayout({ children, active }) {

    const [dark, setDark] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const [sideOpen, setSideOpen] = useState(true);

    useEffect(() => {

        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

    }, [dark]);

    return (
        <div className="flex bg-white text-black dark:bg-black dark:text-white">

            {/* Sidebar */}
            <Sidebar
                open={sideOpen}
                setOpen={setSideOpen}
                active={active}
            />

            {/* Main Content */}
            <div
                className="flex-1 min-h-screen transition-all bg-gray-50 dark:bg-gray-900"
                style={{
                    marginLeft: sideOpen ? 256 : 68,
                    transition: "margin-left 0.3s"
                }}
            >

                {/* Navbar */}
                <Navbar
                    dark={dark}
                    toggleDark={() => setDark(!dark)}
                />

                {/* Page Content */}
                <main className="p-7">
                    {children}
                </main>

            </div>

        </div>
    );
}