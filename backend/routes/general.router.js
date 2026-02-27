import express from "express";
import multer from "multer";
import {
    applyCareer,
    ContactForm,
    getCareerApplications,
    getContactMessages
} from "../controllers/controller.js";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// POST
router.post("/career/apply", upload.single("resume"), applyCareer);
router.post("/general/contact", ContactForm);

// GET (for admin dashboard)
router.get("/career", getCareerApplications);
router.get("/general/contact", getContactMessages);

export default router;