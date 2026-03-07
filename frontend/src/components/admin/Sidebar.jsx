import react from "react"
function Sidebar({ open, setOpen, active, setActive }) {
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
    const links = [
        { id: "dashboard", label: "Dashboard", icon: <Ic.Grid /> },
        { id: "blogs", label: "Blogs", icon: <Ic.Blog /> },
    ];

    return (
        <aside style={{
            position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 40,
            width: open ? 256 : 68,
            background: "#000",
            borderRight: "1px solid #1a1a1a",
            display: "flex", flexDirection: "column",
            transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflow: "hidden",
        }}>
            {/* Brand */}
            <div style={{ padding: "24px 16px 20px", borderBottom: "1px solid #1c1c1c", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                    minWidth: 36, height: 36, borderRadius: 10,
                    background: "#8bc53f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 13, color: "#000", flexShrink: 0,
                    letterSpacing: "-0.01em",
                }}>SF</div>
                {open && <div>
                    <p style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>ScrollFuel</p>
                    <p style={{ color: "#444", fontSize: 11, fontWeight: 500 }}>Admin Panel</p>
                </div>}
            </div>

            {open && <p style={{ color: "#333", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "18px 20px 8px" }}>MENU</p>}

            <nav style={{ flex: 1, padding: "8px", display: "flex", flexDirection: "column", gap: 4 }}>
                {links.map(l => (
                    <button key={l.id}
                        className={`nav-link${active === l.id ? " active" : ""}`}
                        onClick={() => setActive(l.id)}
                        style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "11px 14px", borderRadius: 10,
                            border: "none", cursor: "pointer",
                            background: "transparent",
                            color: active === l.id ? "#8bc53f" : "#666",
                            fontSize: 14, fontWeight: 600,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            textAlign: "left", whiteSpace: "nowrap",
                        }}>
                        <span style={{ flexShrink: 0 }}>{l.icon}</span>
                        {open && <span>{l.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Tip box */}
            {open && (
                <div style={{ margin: "0 12px 16px", padding: "14px", borderRadius: 14, background: "rgba(139,197,63,0.07)", border: "1px solid rgba(139,197,63,0.15)" }}>
                    <p style={{ color: "#8bc53f", fontSize: 11, fontWeight: 800, marginBottom: 4 }}>💡 Pro Tip</p>
                    <p style={{ color: "#555", fontSize: 11, lineHeight: 1.55 }}>Publish fresh blogs weekly to boost organic reach.</p>
                </div>
            )}

            {/* Toggle */}
            <button onClick={() => setOpen(!open)} style={{
                margin: "0 8px 16px", padding: 10, borderRadius: 10,
                background: "#111", border: "1px solid #2a2a2a",
                color: "#555", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <Ic.Menu />
            </button>
        </aside>
    );
}

export default Sidebar