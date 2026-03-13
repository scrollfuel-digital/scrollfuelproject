import express from "express";
import {
    applyCareer,
    ContactForm,
    getCareerApplications,
    getContactMessages,
    markContactRead
} from "../controllers/controller.js";
import uploadResume from "../middleware/uploadResume.js";

const router = express.Router();

// POST routes
router.post("/apply", uploadResume.single("resume"), applyCareer);
router.post("/contact", ContactForm);

// GET routes
router.get("/career", getCareerApplications);
router.get("/contacts", getContactMessages);
router.put("/contacts/read/:id", markContactRead);
export default router;