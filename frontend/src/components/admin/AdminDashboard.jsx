import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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

            {/* <button
                onClick={() => navigate("/admin/reports")}
                style={{
                    background: "linear-gradient(135deg,#8bc53f,#6aa82e)",
                    color: "#000", border: "none", borderRadius: 12,
                    padding: "12px 22px", fontWeight: 800, fontSize: 13,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "'Plus Jakarta Sans', sans-serif", position: "relative",
                }}>
                View Reports <Ic.Arrow />
            </button> */}
        </div>
    );
}

/* ─── Activity Feed ────────────────────────────────────────────────────────── */
function ActivityFeed({ activities }) {
    const navigate = useNavigate();
    const items = activities.map((a) => ({
        text: a.text,
        time: new Date(a.time).toLocaleString(),
        dot:
            a.type === "blog"
                ? "#8bc53f"
                : a.type === "contact"
                    ? "#ffc93b"
                    : "#2196F3"
    }));
    return (
        <div className="anim-slide" style={{
            animationDelay: "320ms",
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "24px",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>Recent Activity</h3>
                <button
                    onClick={() => navigate("/admin/activity")}
                    style={{
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
    const navigate = useNavigate();
    const btns = [
        {
            label: "New Blog Post",
            path: "/admin/create-blog",
            icon: <Ic.Pen />,
            bg: "#8bc53f",
            color: "#000"
        },
        {
            label: "View Messages",
            path: "/admin/messages",
            icon: <Ic.Mail />,
            bg: "#000",
            color: "#fff",
            bdr: "1px solid #2a2a2a"
        },
        {
            label: "Job Applications",
            path: "/admin/careers",
            icon: <Ic.Brief />,
            bg: "#ffc93b",
            color: "#000"
        }
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
                    <button
                        key={i}
                        onClick={() => b.path && navigate(b.path)}
                        className="quick-btn"
                        style={{
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

function LatestData({ latest }) {
    return (
        <div className="anim-slide bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 rounded-[20px] p-6 mt-5">

            <h3 className="text-[15px] font-extrabold mb-5">
                Latest Updates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Latest Blog */}
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover-shadow-primary transition-all">

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary text-dark flex items-center justify-center text-sm font-bold">
                            B
                        </div>

                        <p className="font-bold text-sm">Latest Blog</p>
                    </div>

                    {latest.blogs?.length > 0 ? (
                        <>
                            <p className="text-sm font-semibold leading-snug mb-2">
                                {latest.blogs[0].title}
                            </p>

                            <p className="text-xs text-muted line-clamp-2">
                                {latest.blogs[0].description}
                            </p>
                        </>
                    ) : (
                        <p className="text-xs text-muted">No blogs yet</p>
                    )}
                </div>

                {/* Latest Contact */}
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover-shadow-primary transition-all">

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary text-dark flex items-center justify-center text-sm font-bold">
                            C
                        </div>

                        <p className="font-bold text-sm">Latest Contact</p>
                    </div>

                    {latest.contacts?.length > 0 ? (
                        <>
                            <p className="text-sm font-semibold">
                                {latest.contacts[0].name}
                            </p>

                            <p className="text-xs text-muted">
                                {latest.contacts[0].service}
                            </p>

                            <p className="text-xs text-muted">
                                {latest.contacts[0].email}
                            </p>
                        </>
                    ) : (
                        <p className="text-xs text-muted">No contacts yet</p>
                    )}
                </div>

                {/* Latest Job */}
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover-shadow-primary transition-all">

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">
                            J
                        </div>

                        <p className="font-bold text-sm">Latest Job Application</p>
                    </div>

                    {latest.jobs?.length > 0 ? (
                        <>
                            <p className="text-sm font-semibold">
                                {latest.jobs[0].name}
                            </p>

                            <p className="text-xs text-muted">
                                {latest.jobs[0].interest}
                            </p>

                            <p className="text-xs text-muted">
                                {latest.jobs[0].email}
                            </p>
                        </>
                    ) : (
                        <p className="text-xs text-muted">No job applications yet</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default function AdminDashboard() {

    const [dark, setDark] = useState(() => {
        if (localStorage.getItem("theme")) {
            return localStorage.getItem("theme") === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [sideOpen, setSideOpen] = useState(true);
    const [active, setActive] = useState("dashboard");
    const [statsData, setStatsData] = useState({
        blogs: 0,
        contacts: 0,
        jobs: 0
    });

    const [activities, setActivities] = useState([]);
    const stats = [
        { label: "Total Blogs", value: statsData.blogs, icon: <Ic.Blog />, accentHex: "#8bc53f" },
        { label: "Contact Messages", value: statsData.contacts, icon: <Ic.Mail />, accentHex: "#ffc93b" },
        { label: "Job Applications", value: statsData.jobs, icon: <Ic.Brief />, accentHex: "#8bc53f" },
        // { label: "Website Views", value: 91, icon: <Ic.Eye />, accentHex: "#8bc53f", trend: "31%" },
    ];
    const [latest, setLatest] = useState({
        blogs: [],
        contacts: [],
        jobs: []
    });
    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch(
                    "https://scrollfuelproject.onrender.com/api/dashboard/stats"
                );

                const data = await res.json();

                if (data.success) {
                    setStatsData(data.stats);
                    setActivities(data.activities);
                    setLatest(data.latest);
                }
            } catch (err) {
                console.error("Dashboard API Error:", err);
            }
        };

        fetchDashboard();
    }, []);
    const toggleTheme = () => {
        setDark(prev => !prev);
    };

    return (
        <div className="min-h-screen ">

            <main className="">

                <WelcomeBanner />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                    {stats.map((s, i) => (
                        <StatCard key={i} {...s} delay={i * 70} />
                    ))}
                </div>

                {/* Activity + Quick Actions */}
                <div className="grid md:grid-cols-[1fr_320px] gap-5">
                    <ActivityFeed activities={activities} />
                    <QuickActions dark={dark} />
                </div>

                {/* Latest Data */}
                <LatestData latest={latest} />

            </main>

        </div>
    );
}

