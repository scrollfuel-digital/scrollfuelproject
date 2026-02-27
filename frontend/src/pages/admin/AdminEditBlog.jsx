import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const AdminEditBlog = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        keywords: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {

        const fetchBlog = async () => {

            const res = await axios.get(`${API}/api/blog/${id}`);

            setForm(res.data.data);

        };

        fetchBlog();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });

        if (image) {
            formData.append("image", image);
        }

        await axios.put(`${API}/api/blog/${id}`, formData);

        alert("Blog Updated");

        navigate("/admin/blogs");

    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

                <h2 className="text-xl font-bold mb-6">
                    Edit Blog
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        name="content"
                        value={form.content}
                        rows="8"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        name="keywords"
                        value={form.keywords}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button
                        type="submit"
                        className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600"
                    >
                        Update Blog
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AdminEditBlog;