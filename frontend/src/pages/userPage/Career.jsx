import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

const CareerPage = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        resume: null,
        interest: "",
        appliedFor: "",
    });

    useEffect(() => {
        fetch(`${API}/api/jobs/all`)
            .then((r) => r.json())
            .then((d) => setJobs(d.data || []))
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
            setFormData({ ...formData, resume: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("contact", formData.contact);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("interest", formData.interest);
        formDataToSend.append("appliedFor", formData.appliedFor);
        formDataToSend.append("resume", formData.resume);

        try {
            const res = await fetch(`${API}/api/general/apply`, {
                method: "POST",
                body: formDataToSend,
            });
            const data = await res.json();

            if (res.ok) {
                alert("Application submitted successfully");
                setFormData({
                    name: "",
                    email: "",
                    contact: "",
                    address: "",
                    resume: null,
                    interest: "",
                    appliedFor: "",
                });
                document.querySelector('input[type="file"]').value = "";
            } else {
                alert(data.error || "Submission failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen dark:bg-black dark:text-white pt-12 select-none">

            {/* Hero Section */}
            <div className="text-center mb-16 mt-19 px-4">
                <h1 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">
                    Join <span className="text-primary">ScrollFuel</span>
                </h1>
                <p className="text-muted max-w-2xl mx-auto text-lg">
                    We're not just a Digital Marketing Agency. We're a team of thinkers,
                    creators, strategists, and growth-hunters who love building brands
                    that actually perform. If you're curious, creative, data-driven,
                    and obsessed with results — you'll feel right at home here.
                </p>
            </div>

            {/* Open Positions */}
            {jobs.length > 0 && (
                <section className="px-6 md:px-20 pb-16">
                    <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
                        Open <span className="text-primary">Positions</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
                            >
                                {/* Top: position + type badge */}
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold dark:text-white leading-snug">{job.title}</h3>
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap ml-3 mt-1">
                                        {job.type}
                                    </span>
                                </div>

                                {/* Experience */}
                                {job.experience && (
                                    <div className="mb-4 mt-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <span>{job.experience} Year of Experience</span>
                                        </span>
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                                    {job.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <span className="text-xs text-gray-400">
                                        Posted {new Date(job.createdAt).toLocaleDateString("en-IN", {
                                            day: "2-digit", month: "short", year: "numeric",
                                        })}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, appliedFor: job.title }));
                                            document.getElementById("apply-form").scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Form + Content Section */}
            <section className="md:flex md:justify-between md:px-12 px-6 py-12 gap-12">

                {/* Left Side Content */}
                <motion.div
                    className="md:w-1/2 dark:text-white/80 pl-0 md:pl-30 text-start"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h2 className="text-3xl font-semibold mb-4 text-secondary text-start" variants={itemVariants}>
                        Life at ScrollFuel
                    </motion.h2>
                    <motion.ul className="list-disc list-inside mb-6 text-start" variants={itemVariants}>
                        <li>Weekly brainstorming & idea sessions</li>
                        <li>Learning & skill-upgrade opportunities</li>
                        <li>Fun office culture (yes, memes included)</li>
                        <li>Client wins celebrated together</li>
                        <li>Work that challenges you and helps you grow</li>
                    </motion.ul>

                    <motion.h2 className="text-3xl font-semibold mb-4 text-secondary text-start" variants={itemVariants}>
                        Roles We're Looking For
                    </motion.h2>
                    <motion.ul className="list-disc list-inside mb-6 text-start" variants={itemVariants}>
                        <li>Digital Marketing Executive</li>
                        <li>Social Media Manager</li>
                        <li>Performance Marketing (Google & Meta Ads)</li>
                        <li>Graphic Designer</li>
                        <li>Video Editor / Reel Creator</li>
                        <li>Content Writer / Copywriter</li>
                        <li>SEO Executive</li>
                        <li>Web Developer</li>
                        <li>Interns (Marketing, Design, Development)</li>
                    </motion.ul>

                    <motion.h2 className="text-3xl font-semibold mb-4 text-secondary text-start" variants={itemVariants}>
                        Why Work With Us?
                    </motion.h2>
                    <motion.ul className="list-disc list-inside mb-6 text-start" variants={itemVariants}>
                        <li>Work on real brands & real growth challenges</li>
                        <li>A culture that values ideas over hierarchy</li>
                        <li>Freedom to experiment, fail fast & improve</li>
                        <li>Friendly, young & collaborative team</li>
                        <li>Performance-based recognition</li>
                    </motion.ul>

                    <motion.p className="dark:text-white/80 text-start" variants={itemVariants}>
                        Ready to build your career with us? Send your resume & portfolio to{" "}
                        <span className="text-secondary">scrollfuel@gmail.com</span>{" "}
                        or fill out the form.
                    </motion.p>
                </motion.div>

                {/* Right Side Form */}
                <div id="apply-form" className="md:w-1/2 px-4 md:px-8 rounded-lg shadow-lg mt-12 md:mt-0">
                    <h2 className="text-3xl font-bold mb-6 text-primary">Apply Now</h2>

                    <form onSubmit={handleSubmit} className="space-y-6 pr-0 md:pr-18">

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">Name</label>
                            <input type="text" name="name" placeholder="Enter Full Name"
                                value={formData.name} onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">Email</label>
                            <input type="email" name="email" placeholder="Enter Email Here..."
                                value={formData.email} onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">Contact</label>
                            <input type="text" name="contact" placeholder="Enter Contact Number"
                                value={formData.contact} onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">Address</label>
                            <input type="text" name="address" placeholder="Enter Address"
                                value={formData.address} onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">Resume</label>
                            <input type="file" name="resume" onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" required />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">Area of Interest</label>
                            <select name="interest" value={formData.interest} onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" required>
                                <option value="">Select</option>
                                <option value="Social Media Manager">Social Media Manager</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value=">Marketing Executive">Marketing Executive</option>
                                <option value="Video Editor">Video Editor</option>
                                <option value="SEO Executive">SEO Executive</option>
                                <option value="Software Developer">Software Developer</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium dark:text-white">
                                Applied For <span className="text-gray-400 text-sm font-normal">(optional)</span>
                            </label>
                            <input type="text" name="appliedFor"
                                placeholder="e.g. Social Media Manager"
                                value={formData.appliedFor} onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded dark:bg-black dark:text-white" />
                            {formData.appliedFor && (
                                <p className="text-xs text-primary mt-1">Applying for: {formData.appliedFor}</p>
                            )}
                        </div>

                        <button type="submit"
                            className="w-full bg-primary text-white p-3 rounded font-semibold transition hover:opacity-90">
                            Submit Application
                        </button>

                    </form>
                </div>

            </section>

        </div>
    );
};

export default CareerPage;
