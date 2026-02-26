import React, { useState } from "react";
import { motion } from "framer-motion";
import MDEditor from "@uiw/react-md-editor";
const API = import.meta.env.VITE_API_URL;
const AdminCreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    keywords: [],
    image: null,
    hero_image: null,
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [preview, setPreview] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else if (name === "hero_image") {
      const file = files[0];
      setForm({ ...form, hero_image: file });
      if (file) setHeroPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

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

  const submitBlog = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const data = new /api/blog();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("content", form.content);
    data.append("keywords", JSON.stringify(form.keywords));

    if (form.image) data.append("image", form.image);
    if (form.hero_image) data.append("hero_image", form.hero_image);

    try {
      const response = await fetch(
        `${API}/api/blog`,   // <-- using environment variable
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setSuccess(true);

      setForm({
        title: "",
        description: "",
        content: "",
        keywords: [],
        image: null,
        hero_image: null,
      });

      setPreview(null);
      setHeroPreview(null);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };


  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">

        <motion.form
          onSubmit={submitBlog}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/5 rounded-3xl p-8 space-y-6 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-primary">
            Create Blog
          </h1>

          <input
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />

          <textarea
            name="description"
            placeholder="Meta Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />

          <input
            type="file"
            name="hero_image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-gray-700"
          />

          {heroPreview && (
            <img src={heroPreview} className="rounded-xl w-full h-52 object-cover" />
          )}

          {/* KEYWORDS */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type keyword"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), addKeyword())
                }
                className="flex-1 p-3 rounded bg-black border border-gray-700"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="px-4 bg-primary rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {form.keywords.map((word, i) => (
                <span
                  key={i}
                  className="bg-primary/20 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {word}
                  <button
                    type="button"
                    onClick={() => removeKeyword(word)}
                    className="text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {form.keywords.length} / 5 minimum keywords
            </p>
          </div>

          {/* MARKDOWN EDITOR */}
          <MDEditor
            value={form.content}
            onChange={(val) =>
              setForm({ ...form, content: val || "" })
            }
            height={500}
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-primary rounded-full"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </motion.button>

          {success && (
            <p className="text-green-400 text-center">
              Uploaded successfully 
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default AdminCreateBlog;
