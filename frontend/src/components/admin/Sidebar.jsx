
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ open, setOpen, dark }) {
    const navigate = useNavigate();
    const location = useLocation();

    const Ic = {
        Grid: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={1.8} width={20} height={20}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),

        Blog: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={1.8} width={20} height={20}>
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
                <path d="M17 8H13M7 12h10M7 16h10" />
            </svg>
        ),

        Menu: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={2} width={20} height={20}>
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        ),

        Close: () => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={2} width={20} height={20}>
                <path d="M18 6L6 18M6 6l12 12" />
            </svg>
        ),

        Chevron: ({ collapsed }) => (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                width={18}
                height={18}
                style={{
                    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                }}
            >
                <path d="m15 18-6-6 6-6" />
            </svg>
        )
    };

    const links = [
        { label: "Dashboard", path: "/admin/dashboard", icon: <Ic.Grid /> },
        { label: "Blogs", path: "/admin/blogs", icon: <Ic.Blog /> },
        { label: "Inquiry", path: "/admin/messages", icon: <Ic.Blog /> },
        { label: "Application", path: "/admin/careers", icon: <Ic.Blog /> }
    ];

    const toggleSidebar = () => {
        setOpen((previous) => !previous);
    };

    return (
        <aside
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                height: "100vh",
                width: open ? 256 : 68,
                backgroundColor: dark ? "#0f0f0f" : "#ffffff",
                borderRight: dark ? "1px solid #1a1a1a" : "1px solid #e5e5e5",
                color: dark ? "#fff" : "#111",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.3s ease, background-color 0.3s ease",
                overflow: "visible"
            }}
        >
            {/* Logo and Top Toggle */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "space-between" : "center",
                    gap: 8,
                    padding: open ? "20px 12px 20px 16px" : "20px 8px"
                }}
            >
                {open && (
                    <span
                        style={{
                            color: "#8bc53f",
                            fontWeight: 800,
                            fontSize: 18,
                            whiteSpace: "nowrap"
                        }}
                    >
                        Admin Panel
                    </span>
                )}

                <button
                    type="button"
                    onClick={toggleSidebar}
                    aria-label={open ? "Close sidebar" : "Open sidebar"}
                    aria-expanded={open}
                    title={open ? "Collapse sidebar" : "Expand sidebar"}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 38,
                        height: 38,
                        flexShrink: 0,
                        borderRadius: 9,
                        border: dark ? "1px solid #2a2a2a" : "1px solid #e5e5e5",
                        background: dark ? "#181818" : "#f8f8f8",
                        color: dark ? "#ccc" : "#444",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                    }}
                >
                    {open ? <Ic.Close /> : <Ic.Menu />}
                </button>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: 8 }}>
                {links.map((link) => {
                    const isActive =
                        location.pathname === link.path ||
                        (link.path !== "/admin/dashboard" &&
                            location.pathname.startsWith(link.path + "/"));

                    return (
                        <button
                            key={link.path}
                            type="button"
                            onClick={() => navigate(link.path)}
                            title={!open ? link.label : undefined}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: open ? "flex-start" : "center",
                                gap: 12,
                                padding: "12px 14px",
                                marginBottom: 6,
                                borderRadius: 10,
                                border: "none",
                                cursor: "pointer",
                                background: isActive
                                    ? "rgba(139,197,63,0.12)"
                                    : "transparent",
                                color: isActive
                                    ? "#8bc53f"
                                    : dark
                                        ? "#aaa"
                                        : "#555",
                                transition: "all 0.2s ease",
                                borderLeft: isActive
                                    ? "3px solid #8bc53f"
                                    : "3px solid transparent",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {link.icon}
                            {open && (
                                <span style={{ fontWeight: 600 }}>
                                    {link.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Toggle */}
            <button
                type="button"
                onClick={toggleSidebar}
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
                title={open ? "Collapse sidebar" : "Expand sidebar"}
                style={{
                    margin: "0 8px 16px",
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    borderRadius: 10,
                    background: dark ? "#111" : "#f5f5f5",
                    border: dark ? "1px solid #2a2a2a" : "1px solid #ddd",
                    color: dark ? "#aaa" : "#555",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                }}
            >
                <Ic.Chevron collapsed={!open} />
                {open && <span>Collapse Sidebar</span>}
            </button>
        </aside>
    );
}

export default Sidebar;
