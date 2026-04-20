import express from "express";
import { createJob, getAllJobs, updateJob, deleteJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllJobs);
router.post("/create", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

export default router;
