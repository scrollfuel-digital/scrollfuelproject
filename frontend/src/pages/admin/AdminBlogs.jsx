import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AdminBlogs() {

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        const res = await axios.get(`${API}/api/blog`);
        setBlogs(res.data.data);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        await axios.delete(`${API}/api/blog/${id}`);
        fetchBlogs();
    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full bg-gray-100 min-h-screen">

                <AdminNavbar />

                <div className="p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Blog Management
                    </h2>

                    <div className="bg-white rounded-xl shadow">

                        <table className="w-full">

                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {blogs.map((blog) => (
                                    <tr key={blog._id} className="border-b">

                                        <td className="p-4">
                                            {blog.title}
                                        </td>

                                        <td className="p-4 flex gap-3 justify-center">

                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/edit-blog/${blog._id}`)
                                                }
                                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteBlog(blog._id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            </div>
        </div>
    );
}