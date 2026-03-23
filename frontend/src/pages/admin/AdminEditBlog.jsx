
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const API = import.meta.env.VITE_API_URL;

const AdminEditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        keywords: [],
    });

    const [image, setImage] = useState(null);
    const [heroImage, setHeroImage] = useState(null);

    const [preview, setPreview] = useState(null);
    const [heroPreview, setHeroPreview] = useState(null);

    const [keywordInput, setKeywordInput] = useState("");

    // ✅ FETCH BLOG
    useEffect(() => {
        const fetchBlog = async () => {
            const res = await axios.get(`${API}/api/blog/${id}`);
            const blog = res.data.data;

            setForm({
                title: blog.title || "",
                description: blog.description || "",
                content: blog.content || "",
                keywords: blog.keywords || [],
            });

            // existing images preview
            setPreview(blog.image);
            setHeroPreview(blog.hero_image);
        };

        fetchBlog();
    }, [id]);

    // ✅ HANDLE TEXT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ HANDLE IMAGE CHANGE
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleHeroChange = (e) => {
        const file = e.target.files[0];
        setHeroImage(file);
        if (file) setHeroPreview(URL.createObjectURL(file));
    };

    // ✅ KEYWORDS
    const addKeyword = () => {
        const word = keywordInput.trim();
        if (!word || form.keywords.includes(word)) return;

        setForm({
            ...form,
            keywords: [...form.keywords, word],
        });

        setKeywordInput("");
    };

    const removeKeyword = (word) => {
        setForm({
            ...form,
            keywords: form.keywords.filter((k) => k !== word),
        });
    };

    // ✅ UPDATE BLOG
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("content", form.content);
        formData.append("keywords", JSON.stringify(form.keywords));

        if (image) formData.append("image", image);
        if (heroImage) formData.append("hero_image", heroImage);

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

                    {/* TITLE */}
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* DESCRIPTION */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* HERO IMAGE */}
                    <input type="file" onChange={handleHeroChange} />
                    {heroPreview && (
                        <img src={heroPreview} className="w-full h-52 object-cover rounded-lg" />
                    )}

                    {/* SECOND IMAGE */}
                    <input type="file" onChange={handleImageChange} />
                    {preview && (
                        <img src={preview} className="w-full h-52 object-cover rounded-lg" />
                    )}

                    {/* KEYWORDS */}
                    <div>
                        <div className="flex gap-2">
                            <input
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                            <button type="button" onClick={addKeyword} className="bg-blue-500 text-white px-3 rounded">
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {form.keywords.map((k, i) => (
                                <span key={i} className="bg-gray-200 px-3 py-1 rounded flex gap-2">
                                    {k}
                                    <button onClick={() => removeKeyword(k)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CONTENT (Markdown Editor) */}
                    <MDEditor
                        value={form.content}
                        onChange={(val) =>
                            setForm({ ...form, content: val || "" })
                        }
                        height={400}
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