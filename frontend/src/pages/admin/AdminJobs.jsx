import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Table from "../../components/ui/Table";
import Pagination from "../../components/ui/Pagination";

const API = import.meta.env.VITE_API_URL;

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", type: "", description: "" });

  const perPage = 6;
  const currentJobs = jobs.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(jobs.length / perPage);

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/jobs/all`);
      const data = await res.json();
      setJobs(data.data || []);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/jobs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Failed to create job");
      setFormData({ title: "", type: "", description: "" });
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;
    try {
      const res = await fetch(`${API}/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Failed to delete");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const columns = [
    { label: "Title", align: "text-left" },
    { label: "Type", align: "text-left" },
    { label: "Description", align: "text-left" },
    { label: "Posted On", align: "text-left" },
    { label: "Action", align: "text-center" },
  ];

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:border-primary";

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/admin/dashboard" },
          { label: "Jobs" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-primary">Job Postings</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-primary text-white rounded font-medium hover:opacity-90 transition"
        >
          {showForm ? "Cancel" : "+ Post a Job"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8 space-y-4"
        >
          <h3 className="text-lg font-semibold dark:text-white mb-2">New Job Posting</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Social Media Manager"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={4}
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-primary text-white rounded font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {submitting ? "Posting..." : "Post Job"}
          </button>
        </form>
      )}

      {/* Jobs Table */}
      <Table
        columns={columns}
        data={currentJobs}
        loading={loading}
        emptyMessage="No job postings yet"
        renderRow={(job) => (
          <tr key={job._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-3 font-medium dark:text-white">{job.title}</td>
            <td className="px-4 py-3">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {job.type}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
              {job.description}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">
              {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </td>
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => handleDelete(job._id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />

      {!loading && jobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AdminJobs;
