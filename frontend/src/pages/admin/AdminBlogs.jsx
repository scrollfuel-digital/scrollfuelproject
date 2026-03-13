import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Pagination from "../../components/ui/Pagination";
import Table from "../../components/ui/Table";

const API = import.meta.env.VITE_API_URL;

export default function AdminBlogs() {

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const blogsPerPage = 5;
    const navigate = useNavigate();

    /* Fetch Blogs */

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API}/api/blog`);
            setBlogs(res.data.data || []);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
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

    /* Search */

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    /* Pagination */

    const indexOfLast = currentPage * blogsPerPage;
    const indexOfFirst = indexOfLast - blogsPerPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    /* Table Columns */

    const columns = [
        { label: "Title", align: "text-left" },
        { label: "Status", align: "text-center" },
        { label: "Actions", align: "text-center" }
    ];

    return (

        <AdminLayout active="blogs">

            {/* Breadcrumb */}

            <Breadcrumb
                items={[
                    { label: "Dashboard", link: "/admin/dashboard" },
                    { label: "Blogs" }
                ]}
            />

            {/* Page Header */}

            <PageHeader
                title="Blog Management"
                count={blogs.length}
                showSearch={true}
                searchValue={search}
                setSearchValue={setSearch}
                buttonText="+ Create Blog"
                onButtonClick={() => navigate("/admin/create-blog")}
            />

            {/* Reusable Table */}

            <Table
                columns={columns}
                data={currentBlogs}
                loading={loading}
                emptyMessage="No blogs found"
                renderRow={(blog) => (

                    <tr
                        key={blog._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
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
                                onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
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

                )}
            />

            {/* Pagination */}

            {!loading && filteredBlogs.length > 0 && (

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />

            )}

        </AdminLayout>

    );

}