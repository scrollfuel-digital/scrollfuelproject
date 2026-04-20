import JobModel from "../models/JobModel.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const { title, type, description, department, location, experience } = req.body;

    if (!title || !type || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const job = await JobModel.create({ title, type, description, department: department || "", location: location || "", experience: experience || "" });
    res.status(201).json({ msg: "Job created successfully", data: job });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });
    res.json({ data: jobs });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const { title, type, description, experience } = req.body;
    const job = await JobModel.findByIdAndUpdate(
      req.params.id,
      { title, type, description, experience: experience || "" },
      { new: true }
    );
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job updated successfully", data: job });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
