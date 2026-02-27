import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {

    const [stats, setStats] = useState({
        blogs: 0,
        contacts: 0,
        applications: 0,
        views: 0,
    });

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const blogRes = await axios.get(`${API}/api/blog`);
                const contactRes = await axios.get(`${API}/api/general/contact`);
                const applyRes = await axios.get(`${API}/api/career`);

                setStats({
                    blogs: blogRes.data.data.length,
                    contacts: contactRes.data.data.length,
                    applications: applyRes.data.data.length,
                    views: 1
                });

            } catch (error) {
                console.log("Dashboard error:", error);
            }

        };

        fetchStats();

    }, []);

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full bg-gray-100 min-h-screen">

                <AdminNavbar />

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500 text-sm">Total Blogs</h3>
                        <p className="text-3xl font-bold mt-2">{stats.blogs}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500 text-sm">Contact Messages</h3>
                        <p className="text-3xl font-bold mt-2">{stats.contacts}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500 text-sm">Job Applications</h3>
                        <p className="text-3xl font-bold mt-2">{stats.applications}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="text-gray-500 text-sm">Website Views</h3>
                        <p className="text-3xl font-bold mt-2">{stats.views}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}