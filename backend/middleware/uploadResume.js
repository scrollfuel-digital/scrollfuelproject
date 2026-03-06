import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "scrollfuel/resumes",
        resource_type: "raw", // required for pdf
        allowed_formats: ["pdf", "doc", "docx"],
    },
});

const uploadResume = multer({ storage });

export default uploadResume;