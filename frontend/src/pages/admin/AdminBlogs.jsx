
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AdminBlogs() {

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;

    const navigate = useNavigate();

    /* Fetch Blogs */

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${API}/api/blog`);
            setBlogs(res.data.data || []);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    /* Delete Blog */

    const deleteBlog = async (id) => {

        const confirmDelete = window.confirm("Delete this blog?");

        if (!confirmDelete) return;

        try {
            await axios.delete(`${API}/api/blog/${id}`);
            fetchBlogs();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    /* SEARCH */

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    /* PAGINATION */

    const indexOfLast = currentPage * blogsPerPage;
    const indexOfFirst = indexOfLast - blogsPerPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    return (

        <AdminLayout active="blogs">

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                    Blog Management ({blogs.length})
                </h2>

                <button
                    onClick={() => navigate("/admin/create-blog")}
                    className="bg-primary text-white px-5 py-2 rounded-lg"
                >
                    + Create Blog
                </button>

            </div>

            {/* Search */}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-72"
                />

            </div>

            {/* Table */}

            <div className=" border rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className=" border-b">

                        <tr>
                            <th className="p-4 text-left font-semibold">Title</th>
                            <th className="p-4 text-center font-semibold">Status</th>
                            <th className="p-4 text-center font-semibold">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {currentBlogs.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-10 text-gray-500">
                                    No blogs found.
                                </td>
                            </tr>
                        )}

                        {currentBlogs.map((blog) => (

                            <tr
                                key={blog._id}
                                className="border-b "
                            >

                                {/* Title */}

                                <td className="p-4 font-medium">
                                    {blog.title}
                                </td>

                                {/* Status */}

                                <td className="p-4 text-center">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${blog.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {blog.status || "draft"}
                                    </span>

                                </td>

                                {/* Actions */}

                                <td className="p-4 flex gap-3 justify-center">

                                    <button
                                        onClick={() =>
                                            navigate(`/admin/edit-blog/${blog._id}`)
                                        }
                                        className="bg-primary px-4 py-1.5 rounded text-white font-semibold"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteBlog(blog._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-semibold"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            <div className="flex justify-center gap-2 mt-6">

                {Array.from({ length: totalPages }, (_, i) => (

                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded
            ${currentPage === i + 1
                                ? "bg-primary text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>

                ))}

            </div>

        </AdminLayout>
    );
}