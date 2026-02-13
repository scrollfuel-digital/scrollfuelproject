// form
import express from "express";
import multer from "multer";
import { applyCareer, ContactForm } from "../controllers/controller.js";

const router = express.Router();

// 📂 Multer Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// POST /api/career/apply
router.post("/apply", upload.single("resume"), applyCareer);

// POST /api/general/contact
router.post("/contact", ContactForm);

export default router;
