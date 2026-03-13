import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Icons */
const Ic = {
    Sun: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
    ),
    Moon: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
                stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
    Logout: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeWidth="2"
                d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <path stroke="currentColor" strokeWidth="2"
                d="M16 17l5-5-5-5M21 12H9" />
        </svg>
    )
};

export default function Navbar({ dark, toggleDark }) {

    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/admin/auth", { replace: true });

        window.location.reload();
    };

    return (
        <>
            <header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    height: 70,
                    padding: "0 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border)",
                    backgroundColor:
                    dark ? "#0f0f0f" : "#fff"
                }}
            >

                <h2 style={{ fontWeight: 700, fontSize: 18 }}>
                    Admin Dashboard
                </h2>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

                    {/* DARK MODE */}
                    <button
                        onClick={toggleDark}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            border: "1px solid var(--border)",
                            background: "var(--card)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {dark ? <Ic.Sun /> : <Ic.Moon />}
                    </button>

                    {/* PROFILE */}
                    <div
                        onClick={() => setShowProfile(true)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "5px 14px 5px 5px",
                            borderRadius: 40,
                            border: "1px solid var(--border)",
                            background: dark ? "#111" : "#fff",
                            cursor: "pointer"
                        }}
                    >

                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                background: "#8bc53f",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontWeight: 700
                            }}
                        >
                            {user?.username?.[0]?.toUpperCase() || "A"}
                        </div>

                        <span style={{ fontWeight: 600 }}>
                            {user?.username || "Admin"}
                        </span>

                    </div>

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            background: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: 10,
                            padding: "9px 18px",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 700
                        }}
                    >
                        <Ic.Logout /> Logout
                    </button>

                </div>
            </header>

            {/* PROFILE POPUP */}
            {showProfile && (
                <div
                    onClick={() => setShowProfile(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100
                    }}
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: 360,
                            background: dark ? "#0f0f0f" : "#fff",
                            borderRadius: 16,
                            padding: 24,
                            border: "1px solid var(--border)",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
                        }}
                    >

                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>
                            Personal Information
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                            <div>
                                <p style={{ fontSize: 12, color: "var(--sub)" }}>
                                    Username
                                </p>
                                <p style={{ fontWeight: 600 }}>
                                    {user.username || "Admin"}
                                </p>
                            </div>

                            <div>
                                <p style={{ fontSize: 12, color: "var(--sub)" }}>
                                    Email
                                </p>
                                <p style={{ fontWeight: 600 }}>
                                    {user.email || "admin@email.com"}
                                </p>
                            </div>

                            <div>
                                <p style={{ fontSize: 12, color: "var(--sub)" }}>
                                    Role
                                </p>
                                <p style={{ fontWeight: 600 }}>
                                    Administrator
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => setShowProfile(false)}
                            style={{
                                marginTop: 20,
                                width: "100%",
                                padding: "10px",
                                borderRadius: 8,
                                border: "none",
                                background: "#8bc53f",
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}