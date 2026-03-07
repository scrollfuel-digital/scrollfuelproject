import React from "react";

/* ─── Navbar ───────────────────────────────────────────────────────────────── */
function Navbar({ dark, toggleDark }) {
    /* ─── Icons ────────────────────────────────────────────────────────────────── */
    const Ic = {
        Grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={18} height={18}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
        Pen: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={18} height={18}><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
        Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}><path d="M12 5v14M5 12h14" /></svg>,
        Mail: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        Brief: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
        Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
        Blog: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={20} height={20}><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" /><path d="M17 8H13M7 12h10M7 16h10" /></svg>,
        Moon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={18} height={18}><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>,
        Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={18} height={18}><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
        Out: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>,
        Menu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}><path d="M4 6h16M4 12h16M4 18h16" /></svg>,
        Arrow: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={14} height={14}><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
    };
    
    const d = new Date();
    return (
        <header style={{
            position: "sticky", top: 0, zIndex: 20,
            background: dark ? "rgba(10,10,10,0.94)" : "rgba(245,246,242,0.94)",
            backdropFilter: "blur(14px)",
            borderBottom: `1px solid ${dark ? "#1e1e1e" : "#e4e6df"}`,
            padding: "0 28px", height: 64,
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <div>
                <h2 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>
                    Dashboard Overview
                </h2>
                <p style={{ fontSize: 11, color: "var(--sub)", fontWeight: 500 }}>
                    {d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={toggleDark} style={{
                    width: 38, height: 38, borderRadius: 10,
                    border: `1px solid ${dark ? "#2a2a2a" : "#ddd"}`,
                    background: "transparent", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--sub)",
                }}>{dark ? <Ic.Sun /> : <Ic.Moon />}</button>

                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "5px 14px 5px 5px",
                    borderRadius: 40, border: `1px solid ${dark ? "#2a2a2a" : "#ddd"}`,
                    background: dark ? "#111" : "#fff",
                }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "linear-gradient(135deg,#8bc53f,#6aa82e)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 900, color: "#000",
                    }}>AD</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Admin</span>
                </div>

                <button style={{
                    display: "flex", alignItems: "center", gap: 7,
                    background: "#000", color: "#fff",
                    border: "none", borderRadius: 10, padding: "9px 18px",
                    cursor: "pointer", fontSize: 13, fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    <Ic.Out /> Logout
                </button>
            </div>
        </header>
    );
}
export default Navbar