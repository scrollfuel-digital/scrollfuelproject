// CareerPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const CareerPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        resume: null,
        interest: "",
    });

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
        formDataToSend.append("contact", formData.address); // contact input
        formDataToSend.append("address", formData.address);
        formDataToSend.append("interest", formData.interest);
        formDataToSend.append("resume", formData.resume);

        try {
            const res = await fetch("http://localhost:8000/api/career/apply", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await res.json();

            if (res.ok) {
                alert("Application submitted successfully ");
                // CLEAR FORM
                setFormData({
                    name: "",
                    email: "",
                    contact: "",
                    address: "",
                    resume: null,
                    interest: "",
                });

                // clear file input manually
                document.querySelector('input[type="file"]').value = "";
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };


    /* ------------------ Variants ------------------ */

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen bg-black text-white pt-12">

            {/* Hero Section */}
            <div className="text-center mb-16 mt-19 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Join <span className="text-primary">ScrollFuel</span>
                </h1>

                <p className="text-muted max-w-2xl mx-auto text-lg">
                    We’re not just a Digital Marketing Agency. We’re a team of thinkers,
                    creators, strategists, and growth-hunters who love building brands
                    that actually perform. If you’re curious, creative, data-driven,
                    and obsessed with results — you’ll feel right at home here.
                </p>
            </div>

            {/* Form + Content Section */}
            <section className="md:flex md:justify-between md:px-12 px-6 py-12 gap-12">

                {/* Left Side Content */}
                <motion.div
                    className="md:w-1/2 text-white/80 pl-0 md:pl-30 text-start"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    {/* Life at ScrollFuel */}
                    <motion.h2
                        className="text-3xl font-semibold mb-4 text-secondary text-start"
                        variants={itemVariants}
                    >
                        Life at ScrollFuel
                    </motion.h2>

                    <motion.ul
                        className="list-disc list-inside mb-6 text-start"
                        variants={itemVariants}
                    >
                        <li>Weekly brainstorming & idea sessions</li>
                        <li>Learning & skill-upgrade opportunities</li>
                        <li>Fun office culture (yes, memes included)</li>
                        <li>Client wins celebrated together</li>
                        <li>Work that challenges you and helps you grow</li>
                    </motion.ul>

                    {/* Roles */}
                    <motion.h2
                        className="text-3xl font-semibold mb-4 text-secondary text-start"
                        variants={itemVariants}
                    >
                        Roles We’re Looking For
                    </motion.h2>

                    <motion.ul
                        className="list-disc list-inside mb-6 text-start"
                        variants={itemVariants}
                    >
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


                    {/* Why Work With Us */}
                    <motion.h2
                        className="text-3xl font-semibold mb-4 text-secondary text-start"
                        variants={itemVariants}
                    >
                        Why Work With Us?
                    </motion.h2>

                    <motion.ul
                        className="list-disc list-inside mb-6 text-start"
                        variants={itemVariants}
                    >
                        <li>Work on real brands & real growth challenges</li>
                        <li>A culture that values ideas over hierarchy</li>
                        <li>Freedom to experiment, fail fast & improve</li>
                        <li>Friendly, young & collaborative team</li>
                        <li>Performance-based recognition</li>
                    </motion.ul>

                    <motion.p
                        className="text-white/80 text-start"
                        variants={itemVariants}
                    >
                        Ready to build your career with us? Send your resume & portfolio
                        to{" "}
                        <span className="text-secondary">
                            scrollfuel@gmail.com
                        </span>{" "}
                        or fill out the form.
                    </motion.p>
                </motion.div>

                {/* Right Side Form */}
                <div className="md:w-1/2 px-4 md:px-8 rounded-lg shadow-lg mt-12 md:mt-0">

                    <h2 className="text-3xl font-bold mb-6 text-primary">
                        Apply Now
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 pr-0 md:pr-18"
                    >

                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium text-white">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded bg-black text-white"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium text-white">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email Here..."
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded bg-black text-white"
                                required
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="block mb-1 font-medium text-white">
                                Contact
                            </label>

                            <input
                                type="text"
                                name="contact"
                                placeholder="Enter Contact Number"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded bg-black text-white"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block mb-1 font-medium text-white">
                                Address
                            </label>

                            <input
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded bg-black text-white"
                                required
                            />
                        </div>

                        {/* Resume */}
                        <div>
                            <label className="block mb-1 font-medium text-white">
                                Resume
                            </label>

                            <input
                                type="file"
                                name="resume"
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                                className="w-full border border-gray-700 p-2 rounded bg-black text-white"
                                required
                            />
                        </div>

                        {/* Interest */}
                        <div>
                            <label className="block mb-1 font-medium text-white">
                                Area of Interest
                            </label>

                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                className="w-full border border-gray-700 p-2 rounded bg-black text-white"
                                required
                            >
                                <option value="">Select</option>

                                <option value="Social Media Manager">
                                    Social Media Manager
                                </option>

                                <option value="Graphic Designer">
                                    Graphic Designer
                                </option>

                                <option value="Video Editor / Reel Creator">
                                    Video Editor / Reel Creator
                                </option>

                                <option value="Content Creation">
                                    Content Creation
                                </option>

                                <option value="SEO Executive">
                                    SEO Executive
                                </option>

                                <option value="Web Developer">
                                    Software Developer
                                </option>

                                <option value="Branding">
                                    Branding
                                </option>

                                <option value="Intern">
                                    Intern
                                </option>

                                <option value="Others">
                                    Others
                                </option>
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white p-3 rounded font-semibold transition hover:opacity-90"
                        >
                            Submit Application
                        </button>

                    </form>
                </div>

            </section>

        </div>
    );
};

export default CareerPage;
