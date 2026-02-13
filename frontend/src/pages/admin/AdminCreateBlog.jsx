// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import JoditEditor from "jodit-react";
// import { useRef } from "react";
// import DOMPurify from "dompurify";
// const AdminCreateBlog = () => {
//     const [form, setForm] = useState({
//         title: "",
//         content: "",
//         keywords: [],
//         image: null
//     });
//     const editor = useRef(null);

//     const [keywordInput, setKeywordInput] = useState("");
//     const [preview, setPreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);

//     const cleanBlogContent = (dirtyHTML) => {
//         let text = dirtyHTML;

//         // Remove Word tags & spans
//         text = text.replace(/<span[^>]*>|<\/span>/g, "");
//         text = text.replace(/class="[^"]*"/g, "");
//         text = text.replace(/style="[^"]*"/g, "");

//         // Convert &nbsp;
//         text = text.replace(/&nbsp;/g, " ");

//         // Fix broken Word characters
//         text = text.replace(/•/g, "");
//         text = text.replace(/o /g, "• ");

//         // Convert fake bullets into list items
//         text = text.replace(/• (.*?)(<br>|<\/p>)/g, "<li>$1</li>");
//         text = text.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

//         // Convert headings manually
//         text = text.replace(
//             /How to Scale Your Business Faster with Digital Marketing in 2026/,
//             "<h1>How to Scale Your Business Faster with Digital Marketing in 2026</h1>"
//         );

//         // Clean extra spaces
//         text = text.replace(/\s+/g, " ");

//         return text;
//     };



//     // Handle normal inputs + image
//     const handleChange = (e) => {
//         if (e.target.name === "image") {
//             const file = e.target.files[0];
//             setForm({ ...form, image: file });
//             if (file) setPreview(URL.createObjectURL(file));
//         } else {
//             setForm({ ...form, [e.target.name]: e.target.value });
//         }
//     };

//     // Add keyword
//     const addKeyword = () => {
//         const word = keywordInput.trim();
//         if (!word) return;

//         if (form.keywords.includes(word)) return; // prevent duplicates

//         setForm({
//             ...form,
//             keywords: [...form.keywords, word]
//         });
//         setKeywordInput("");
//     };

//     // Remove keyword
//     const removeKeyword = (word) => {
//         setForm({
//             ...form,
//             keywords: form.keywords.filter(k => k !== word)
//         });
//     };

//     // Submit
//     const submitBlog = async (e) => {
//         e.preventDefault();

//         if (form.keywords.length < 5) {
//             alert("Please add at least 5 keywords");
//             return;
//         }

//         setLoading(true);

//         const data = new FormData();
//         data.append("title", form.title);
//         data.append("content", form.content);
//         data.append("keywords", JSON.stringify(form.keywords));
//         if (form.image) data.append("image", form.image);

//         try {
//             await axios.post("http://127.0.0.1:8000/api/blog", data, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setSuccess(true);
//             setForm({ title: "", content: "", keywords: [], image: null });
//             setPreview(null);
//         } catch (err) {
//             alert("Upload failed");
//         }

//         setLoading(false);
//     };

//     return (
//         <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
//             <div className="max-w-xl w-full">
//                 <motion.form
//                     onSubmit={submitBlog}
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-muted/5 rounded-3xl p-8 space-y-5 shadow-xl"
//                 >
//                     <h1 className="text-3xl font-bold text-primary mb-4">
//                         Create Blog
//                     </h1>

//                     {/* Title */}
//                     <input
//                         name="title"
//                         placeholder="Blog Title"
//                         value={form.title}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded bg-black border border-gray-700"
//                         required
//                     />

//                     {/* Image Upload */}
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="w-full p-3 rounded bg-black border border-gray-700"
//                     />

//                     {preview && (
//                         <img
//                             src={preview}
//                             alt="preview"
//                             className="rounded-xl w-full h-48 object-cover"
//                         />
//                     )}

//                     {/* Keyword Section */}
//                     <div>
//                         <div className="flex gap-2">
//                             <input
//                                 type="text"
//                                 placeholder="Type keyword"
//                                 value={keywordInput}
//                                 onChange={(e) => setKeywordInput(e.target.value)}
//                                 onKeyDown={(e) =>
//                                     e.key === "Enter" && (e.preventDefault(), addKeyword())
//                                 }
//                                 className="flex-1 p-3 rounded bg-black border border-gray-700"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={addKeyword}
//                                 className="px-4 bg-primary rounded"
//                             >
//                                 Add
//                             </button>
//                         </div>

//                         <div className="flex flex-wrap gap-2 mt-3">
//                             {form.keywords.map((word, i) => (
//                                 <span
//                                     key={i}
//                                     className="bg-primary/20 px-3 py-1 rounded-full flex items-center gap-2"
//                                 >
//                                     {word}
//                                     <button
//                                         type="button"
//                                         onClick={() => removeKeyword(word)}
//                                         className="text-red-400"
//                                     >
//                                         ✕
//                                     </button>
//                                 </span>
//                             ))}
//                         </div>

//                         <p className="text-sm text-gray-400 mt-2">
//                             {form.keywords.length} / 5 minimum keywords
//                         </p>
//                     </div>

//                     <div
//                         className="blog-content text-gray-200 leading-7 space-y-4"
//                         dangerouslySetInnerHTML={{ __html: form.content }}
//                     />


//                     {/* <textarea
//                         name="content"
//                         placeholder="Blog content"
//                         value={form.content}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded bg-black border border-gray-700 h-40"
//                         required
//                     /> */}
//                     {/* <JoditEditor
//                         ref={editor}
//                         value={form.content}
//                         config={{
//                             readonly: false,
//                             height: 500,
//                             theme: "dark",
//                             askBeforePasteHTML: false,
//                             askBeforePasteFromWord: false,
//                             defaultActionOnPaste: "insert_as_html",
//                             pastePlain: false,
//                             toolbarAdaptive: false,
//                             style: {
//                                 background: "#000",
//                                 color: "#fff",
//                             }
//                         }}
//                         onChange={(newContent) =>
//                             setForm({ ...form, content: newContent })
//                         }
//                     /> */}

//                     {/* <JoditEditor
//                         ref={editor}
//                         value={form.content}
//                         config={{
//                             readonly: false,
//                             height: 500,
//                             theme: "dark",
//                             toolbarAdaptive: false,
//                         }}
//                         onChange={(newContent) =>
//                             setForm({ ...form, content: cleanToPlainText(newContent) })
//                         }
//                     /> */}
//                     <JoditEditor
//                         ref={editor}
//                         value={form.content}
//                         config={{
//                             readonly: false,
//                             height: 500,
//                             theme: "dark",
//                             toolbarAdaptive: false,
//                         }}
//                         onChange={(newContent) =>
//                             setForm({ ...form, content: cleanBlogContent(newContent) })
//                         }
//                     />


//                     <motion.button
//                         whileTap={{ scale: 0.95 }}
//                         whileHover={{ scale: 1.03 }}
//                         className="w-full py-3 bg-primary rounded-full"
//                     >
//                         {loading ? "Publishing..." : "Publish Blog"}
//                     </motion.button>

//                     {success && (
//                         <p className="text-green-400 text-center">
//                             Uploaded successfully ✔
//                         </p>
//                     )}
//                 </motion.form>
//             </div>
//         </section>
//     );
// };

// export default AdminCreateBlog;


import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MDEditor from "@uiw/react-md-editor";

import DOMPurify from "dompurify";

const AdminCreateBlog = () => {
    const [form, setForm] = useState({
        title: "",
        content: "",
        keywords: [],
        image: null,
    });

    const editor = useRef(null);
    const [keywordInput, setKeywordInput] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    /* ---------------- INPUT ---------------- */
    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setForm({ ...form, image: file });
            if (file) setPreview(URL.createObjectURL(file));
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    /* ---------------- KEYWORDS ---------------- */
    const addKeyword = () => {
        const word = keywordInput.trim();
        if (!word || form.keywords.includes(word)) return;
        setForm({ ...form, keywords: [...form.keywords, word] });
        setKeywordInput("");
    };

    const removeKeyword = (word) => {
        setForm({
            ...form,
            keywords: form.keywords.filter((k) => k !== word),
        });
    };

    /* ---------------- SUBMIT ---------------- */
    const submitBlog = async (e) => {
        e.preventDefault();

        

        setLoading(true);

        const data = new FormData();
        data.append("title", form.title);
        // data.append("content", cleanedContent);
        data.append("keywords", JSON.stringify(form.keywords));
        if (form.image) data.append("image", form.image);

        try {
            await axios.post("http://127.0.0.1:8000/api/blog", data);
            setSuccess(true);
            setForm({ title: "", content: "", keywords: [], image: null });
            setPreview(null);
        } catch {
            alert("Upload failed");
        }

        setLoading(false);
    };

    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
            <div className="max-w-3xl w-full">
                <motion.form
                    onSubmit={submitBlog}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted/5 rounded-3xl p-8 space-y-6 shadow-xl"
                >
                    <h1 className="text-3xl font-bold text-primary">Create Blog</h1>

                    <input
                        name="title"
                        placeholder="Blog Title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-black border border-gray-700"
                        required
                    />

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-black border border-gray-700"
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="rounded-xl w-full h-48 object-cover"
                        />
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
                                    e.key === "Enter" && (e.preventDefault(), addKeyword())
                                }
                                className="flex-1 p-3 rounded bg-black border border-gray-700"
                            />
                            <button type="button" onClick={addKeyword} className="px-4 bg-primary rounded">
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {form.keywords.map((word, i) => (
                                <span key={i} className="bg-primary/20 px-3 py-1 rounded-full flex items-center gap-2">
                                    {word}
                                    <button type="button" onClick={() => removeKeyword(word)} className="text-red-400">
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* EDITOR */}
                    <MDEditor
                        value={form.content}
                        onChange={(val) => setForm({ ...form, content: val || "" })}
                        height={400}
                    />


                    <motion.button whileTap={{ scale: 0.95 }} className="w-full py-3 bg-primary rounded-full">
                        {loading ? "Publishing..." : "Publish Blog"}
                    </motion.button>

                    {success && <p className="text-green-400 text-center">Uploaded successfully ✔</p>}
                </motion.form>
            </div>
        </section>
    );
};

export default AdminCreateBlog;

