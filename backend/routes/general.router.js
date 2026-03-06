import express from "express";
import {
    applyCareer,
    ContactForm,
    getCareerApplications,
    getContactMessages
} from "../controllers/controller.js";
import uploadResume from "../middleware/uploadResume.js";

const router = express.Router();

// POST routes
router.post("/apply", uploadResume.single("resume"), applyCareer);
router.post("/contact", ContactForm);

// GET routes
router.get("/career", getCareerApplications);
router.get("/contact", getContactMessages);

export default router;