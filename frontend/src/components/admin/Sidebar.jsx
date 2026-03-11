import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ open, setOpen }) {

    const navigate = useNavigate();
    const location = useLocation();

    /* ───── Icons ───── */

    const Ic = {
        Grid: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={18} height={18}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),

        Blog: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}>
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
                <path d="M17 8H13M7 12h10M7 16h10" />
            </svg>
        ),

        Menu: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}>
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        )
    };

    /* ───── Sidebar Links ───── */

    const links = [
        {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: <Ic.Grid />
        },
        {
            label: "Blogs",
            path: "/admin/blogs",
            icon: <Ic.Blog />
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <aside
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: open ? 256 : 68,
                background: "#000",
                borderRight: "1px solid #1a1a1a",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease"
            }}
        >

            {/* Logo */}
            <div
                style={{
                    padding: "20px 16px",
                    color: "#8bc53f",
                    fontWeight: 800,
                    fontSize: 18
                }}
            >
                {open ? "Admin Panel" : "AP"}
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: 8 }}>

                {links.map((link, index) => {

                    const isActive = location.pathname === link.path;

                    return (
                        <button
                            key={index}
                            onClick={() => handleNavigation(link.path)}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "12px 14px",
                                marginBottom: 6,
                                borderRadius: 10,
                                border: "none",
                                cursor: "pointer",
                                background: isActive ? "rgba(139,197,63,0.12)" : "transparent",
                                color: isActive ? "#8bc53f" : "#666",
                                transition: "0.2s",
                                borderLeft: isActive ? "3px solid #8bc53f" : "3px solid transparent"
                            }}
                        >
                            {link.icon}
                            {open && <span style={{ fontWeight: 600 }}>{link.label}</span>}
                        </button>
                    );
                })}

            </nav>

            {/* Toggle Sidebar */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    margin: "0 8px 16px",
                    padding: 12,
                    borderRadius: 10,
                    background: "#111",
                    border: "1px solid #2a2a2a",
                    color: "#777",
                    cursor: "pointer"
                }}
            >
                <Ic.Menu />
            </button>

        </aside>
    );
}

export default Sidebar;