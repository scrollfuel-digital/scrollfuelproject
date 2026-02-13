import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, required: true },
        service: {
            type: String,
            required: true,
            enum: [
                "Social Media Marketing & Management",
                "Web Design & Development",
                "Lead Generation",
                "Content Creation",
                "Advertising & Marketing",
                "Branding & Graphic Designing",
                "Google Ads & PPC Campaign",
                "Others"
            ],
        },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("ContactForm", ContactSchema);
