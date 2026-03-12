import BlogModel from "../models/BlogModel.js";
import ContactModel from "../models/ContactModel.js";
import CareerModel from "../models/CareerModel.js";

export const getDashboardStats = async (req, res) => {
    try {

        const [

            totalBlogs,
            totalContacts,
            totalJobs,
            latestBlogs,
            latestContacts,
            latestJobs

        ] = await Promise.all([
            
            BlogModel.countDocuments(),
            ContactModel.countDocuments(),
            CareerModel.countDocuments(),
            BlogModel.find().sort({ createdAt: -1 }).limit(5),
            ContactModel.find().sort({ createdAt: -1 }).limit(5),
            CareerModel.find().sort({ createdAt: -1 }).limit(5)
        ]);

        /* ---------- Activity Feed ---------- */

        const activities = [
            ...latestBlogs.map(blog => ({
                type: "blog",
                text: `New blog published: ${blog.title}`,
                time: blog.createdAt
            })),

            ...latestContacts.map(contact => ({
                type: "contact",
                text: `New contact from ${contact.name}`,
                time: contact.createdAt
            })),

            ...latestJobs.map(job => ({
                type: "job",
                text: `New job application from ${job.name}`,
                time: job.createdAt
            }))
        ]
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .slice(0, 5);

        /* ---------- Response ---------- */

        return res.status(200).json({
            success: true,
            stats: {
                blogs: totalBlogs,
                contacts: totalContacts,
                jobs: totalJobs
            },
            latest: {
                blogs: latestBlogs,
                contacts: latestContacts,
                jobs: latestJobs
            },
            activities
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data"
        });

    }
};