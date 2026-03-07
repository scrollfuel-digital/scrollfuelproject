// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/admin/Sidebar";
// import AdminNavbar from "../../components/admin/AdminNavbar";

// const API = import.meta.env.VITE_API_URL;

// export default function AdminDashboard() {

//     const [stats, setStats] = useState({
//         blogs: 0,
//         contacts: 0,
//         applications: 0,
//         views: 0,
//     });

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const blogRes = await axios.get(`${API}/api/blog`);
//                 const contactRes = await axios.get(`${API}/api/general/contact`);
//                 const applyRes = await axios.get(`${API}/api/career`);
//                 setStats({
//                     blogs: blogRes.data.data.length,
//                     contacts: contactRes.data.data.length,
//                     applications: applyRes.data.data.length,
//                     views: 1
//                 });

//             } catch (error) {
//                 console.log("Dashboard error:", error);
//             }

//         };

//         fetchStats();

//     }, []);

//     return (
//         <div className="flex">

//             <Sidebar />

//             <div className="ml-64 w-full bg-gray-100 min-h-screen">

//                 <AdminNavbar />

//                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//                     <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                         <h3 className="text-gray-500 text-sm">Total Blogs</h3>
//                         <p className="text-3xl font-bold mt-2">{stats.blogs}</p>
//                     </div>

//                     <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                         <h3 className="text-gray-500 text-sm">Contact Messages</h3>
//                         <p className="text-3xl font-bold mt-2">{stats.contacts}</p>
//                     </div>

//                     <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                         <h3 className="text-gray-500 text-sm">Job Applications</h3>
//                         <p className="text-3xl font-bold mt-2">{stats.applications}</p>
//                     </div>

//                     <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                         <h3 className="text-gray-500 text-sm">Website Views</h3>
//                         <p className="text-3xl font-bold mt-2">{stats.views}</p>
//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// }

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./AdminNavbar";

/* ─── CSS ──────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green:  #8bc53f;
    --yellow: #ffc93b;
    --black:  #000000;
    --white:  #ffffff;
    --muted:  #8d8c8c;
    --bg:     #f5f6f2;
    --card:   #ffffff;
    --border: #e8e8e4;
    --text:   #111111;
    --sub:    #666666;
  }

  .dark-mode {
    --bg:     #0a0a0a;
    --card:   #111111;
    --border: #222222;
    --text:   #f0f0f0;
    --sub:    #888888;
  }

  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); }

  @keyframes slideUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:1; }
    50%      { opacity:0.4; }
  }

  .anim-slide { animation: slideUp 0.5s ease both; }

  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(139,197,63,0.14); }
  .stat-card { transition: transform 0.25s, box-shadow 0.25s; }

  .nav-link { transition: background 0.2s, color 0.2s; border-left: 3px solid transparent; }
  .nav-link.active { background: rgba(139,197,63,0.12); border-left-color: #8bc53f; color: #8bc53f; }
  .nav-link:hover:not(.active) { background: rgba(255,255,255,0.05); color: #fff; }

  .quick-btn { transition: opacity 0.2s, transform 0.18s; }
  .quick-btn:hover { opacity: 0.85; transform: scale(0.97); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #8bc53f; border-radius: 4px; }
`;

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

/* ─── Animated counter ─────────────────────────────────────────────────────── */
function Counter({ target }) {
    const [n, setN] = useState(0);
    useEffect(() => {
        let cur = 0;
        const inc = Math.ceil(target / 45);
        const t = setInterval(() => {
            cur += inc;
            if (cur >= target) { setN(target); clearInterval(t); } else setN(cur);
        }, 28);
        return () => clearInterval(t);
    }, [target]);
    return <>{n.toLocaleString()}</>;
}

/* ─── Stat Card ────────────────────────────────────────────────────────────── */
function StatCard({ label, value, icon, accentHex, trend, delay }) {
    return (
        <div className="stat-card anim-slide" style={{
            animationDelay: `${delay}ms`,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 20, padding: "24px 22px",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{
                position: "absolute", top: -30, right: -30, width: 110, height: 110,
                borderRadius: "50%", background: accentHex, opacity: 0.08, filter: "blur(28px)",
                pointerEvents: "none",
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                    width: 44, height: 44, borderRadius: 13,
                    background: accentHex,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: accentHex === "#ffc93b" ? "#000" : "#fff",
                }}>{icon}</div>
                <span style={{
                    fontSize: 11, fontWeight: 700, color: "#4caf50",
                    background: "rgba(76,175,80,0.1)", borderRadius: 20, padding: "4px 10px",
                }}>↑ {trend}</span>
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                {label}
            </p>
            <p style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1 }}>
                <Counter target={value} />
            </p>

            <div style={{
                position: "absolute", bottom: 0, left: 0, height: 3, width: "50%",
                background: `linear-gradient(90deg, ${accentHex}, transparent)`,
                borderRadius: "0 3px 0 20px",
            }} />
        </div>
    );
}

/* ─── Welcome Banner ───────────────────────────────────────────────────────── */
function WelcomeBanner() {
    return (
        <div className="anim-slide" style={{
            background: "#000", borderRadius: 22, padding: "28px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            overflow: "hidden", position: "relative", marginBottom: 22,
        }}>
            <div style={{ position: "absolute", right: 100, top: -60, width: 200, height: 200, borderRadius: "50%", background: "#8bc53f", opacity: 0.06 }} />
            <div style={{ position: "absolute", right: -20, bottom: -50, width: 160, height: 160, borderRadius: "50%", background: "#ffc93b", opacity: 0.07 }} />

            <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#8bc53f", animation: "pulse-dot 2s ease-in-out infinite" }} />
                    <span style={{ color: "#8bc53f", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em" }}>LIVE DASHBOARD</span>
                </div>
                <h2 style={{ color: "#fff", fontSize: 23, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>
                    Good to see you, Admin 👋
                </h2>
                <p style={{ color: "#555", fontSize: 13, fontWeight: 500 }}>Here's your ScrollFuel overview for today.</p>
            </div>

            <button style={{
                background: "linear-gradient(135deg,#8bc53f,#6aa82e)",
                color: "#000", border: "none", borderRadius: 12,
                padding: "12px 22px", fontWeight: 800, fontSize: 13,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                fontFamily: "'Plus Jakarta Sans', sans-serif", position: "relative",
            }}>
                View Reports <Ic.Arrow />
            </button>
        </div>
    );
}

/* ─── Activity Feed ────────────────────────────────────────────────────────── */
function ActivityFeed() {
    const items = [
        { text: "New blog published: '10 SEO strategies for 2026'", time: "2m ago", dot: "#8bc53f" },
        { text: "Contact form submission from Rahul Sharma", time: "18m ago", dot: "#ffc93b" },
        { text: "Job application for 'Content Writer' received", time: "1h ago", dot: "#2196F3" },
        { text: "Traffic spike — +340 new visitors in the last hour", time: "3h ago", dot: "#8bc53f" },
        { text: "Draft saved: 'Email marketing best practices'", time: "5h ago", dot: "#888" },
    ];
    return (
        <div className="anim-slide" style={{
            animationDelay: "320ms",
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "24px",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>Recent Activity</h3>
                <button style={{
                    fontSize: 11, fontWeight: 700, color: "#8bc53f",
                    background: "rgba(139,197,63,0.1)", border: "1px solid rgba(139,197,63,0.2)",
                    borderRadius: 20, padding: "4px 12px", cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>View all</button>
            </div>

            {items.map((item, i) => (
                <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "13px 0",
                    borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 5 }}>
                        <div style={{ width: 9, height: 9, borderRadius: "50%", background: item.dot, flexShrink: 0, boxShadow: `0 0 0 3px ${item.dot}22` }} />
                        {i < items.length - 1 && <div style={{ width: 1, height: 26, background: "var(--border)", marginTop: 5 }} />}
                    </div>
                    <p style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{item.text}</p>
                    <span style={{ fontSize: 11, color: "var(--sub)", whiteSpace: "nowrap", fontWeight: 500, marginTop: 2 }}>{item.time}</span>
                </div>
            ))}
        </div>
    );
}

/* ─── Quick Actions ────────────────────────────────────────────────────────── */
function QuickActions({ dark }) {
    const btns = [
        { label: "New Blog Post", icon: <Ic.Pen />, bg: "#8bc53f", color: "#000" },
        { label: "View Messages", icon: <Ic.Mail />, bg: "#000", color: "#fff", bdr: "1px solid #2a2a2a" },
        { label: "Job Applications", icon: <Ic.Brief />, bg: "#ffc93b", color: "#000" },
    ];
    const bars = [30, 55, 40, 70, 45, 90, 65];
    return (
        <div className="anim-slide" style={{
            animationDelay: "400ms",
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "24px",
        }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 16 }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {btns.map((b, i) => (
                    <button key={i} className="quick-btn" style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: b.bg, color: b.color,
                        border: b.bdr || "none",
                        borderRadius: 12, padding: "13px 16px",
                        cursor: "pointer", fontSize: 13, fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        {b.icon} {b.label}
                    </button>
                ))}
            </div>

            {/* Mini bar chart */}
            <div style={{ padding: 14, borderRadius: 14, background: dark ? "#0e0e0e" : "#f7f8f4", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--sub)", letterSpacing: "0.08em", marginBottom: 10 }}>WEEKLY VIEWS</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48 }}>
                    {bars.map((h, i) => (
                        <div key={i} style={{
                            flex: 1, height: `${h}%`, borderRadius: 5,
                            background: i === 5 ? "#8bc53f" : i === 3 ? "#ffc93b" : dark ? "#222" : "#e5e6e1",
                        }} />
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <span key={i} style={{ fontSize: 9, color: "var(--sub)", fontWeight: 700, flex: 1, textAlign: "center" }}>{d}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Root ─────────────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
    const [dark, setDark] = useState(false);
    const [sideOpen, setSideOpen] = useState(true);
    const [active, setActive] = useState("dashboard");

    const stats = [
        { label: "Total Blogs", value: 24, icon: <Ic.Blog />, accentHex: "#8bc53f", trend: "12%" },
        { label: "Contact Messages", value: 138, icon: <Ic.Mail />, accentHex: "#ffc93b", trend: "8%" },
        { label: "Job Applications", value: 57, icon: <Ic.Brief />, accentHex: "#2196F3", trend: "23%" },
        { label: "Website Views", value: 9421, icon: <Ic.Eye />, accentHex: "#8bc53f", trend: "31%" },
    ];

    return (
        <div className={dark ? "dark-mode" : ""} style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
            <style>{css}</style>

            <Sidebar open={sideOpen} setOpen={setSideOpen} active={active} setActive={setActive} />

            <div style={{
                marginLeft: sideOpen ? 256 : 68,
                flex: 1, display: "flex", flexDirection: "column",
                transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
                minHeight: "100vh",
            }}>
                <Navbar dark={dark} toggleDark={() => setDark(!dark)} />

                <main style={{ padding: "28px 28px 40px", flex: 1 }}>
                    <WelcomeBanner />

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 18, marginBottom: 22,
                    }}>
                        {stats.map((s, i) => <StatCard key={i} {...s} delay={i * 70} />)}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
                        <ActivityFeed />
                        <QuickActions dark={dark} />
                    </div>
                </main>
            </div>
        </div>
    );
}