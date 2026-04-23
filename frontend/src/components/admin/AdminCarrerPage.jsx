import React, { useEffect, useState } from "react";
import Pagination from "../ui/Pagination";
import Breadcrumb from "../ui/Breadcrumb";
import Table from "../ui/Table";

const API = import.meta.env.VITE_API_URL;

const emptyForm = { title: "", type: "", experience: "", description: "" };

const AdminCarrerPage = () => {

  // ── Applications ──
  const [applications, setApplications] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [appPage, setAppPage] = useState(1);
  const [rejecting, setRejecting] = useState(null);
  const [rejected, setRejected] = useState([]);

  // ── Jobs ──
  const [jobs, setJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobPage, setJobPage] = useState(1);

  // ── Modal ──
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null); // null = create, object = edit
  const [formData, setFormData] = useState(emptyForm);
  const [posting, setPosting] = useState(false);
  const [postMsg, setPostMsg] = useState(null);

  const perPage = 6;
  const token = localStorage.getItem("token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleUnauth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/auth";
  };

  // ── Fetch Applications ──
  const fetchApplications = async () => {
    try {
      setAppLoading(true);
      const res = await fetch(`${API}/api/general/career`);
      const data = await res.json();
      setApplications(data.data || []);
    } catch (e) { console.error(e); }
    finally { setAppLoading(false); }
  };

  // ── Fetch Jobs ──
  const fetchJobs = async () => {
    try {
      setJobLoading(true);
      const res = await fetch(`${API}/api/jobs/all`);
      const data = await res.json();
      setJobs(data.data || []);
    } catch (e) { console.error(e); }
    finally { setJobLoading(false); }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  // ── Open modal ──
  const openCreate = () => {
    setEditJob(null);
    setFormData(emptyForm);
    setPostMsg(null);
    setShowModal(true);
  };

  const openEdit = (job) => {
    setEditJob(job);
    setFormData({ title: job.title, type: job.type, experience: job.experience || "", description: job.description });
    setPostMsg(null);
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setPostMsg(null); setEditJob(null); };

  const handleInputChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ── Create / Update ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPosting(true);
      setPostMsg(null);

      const url = editJob ? `${API}/api/jobs/${editJob._id}` : `${API}/api/jobs/create`;
      const method = editJob ? "PUT" : "POST";

      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(formData) });
      if (res.status === 401) return handleUnauth();

      const data = await res.json();
      if (res.ok) {
        setPostMsg({ ok: true, text: editJob ? "Job updated!" : "Job posted!" });
        fetchJobs();
        setTimeout(closeModal, 1200);
      } else {
        setPostMsg({ ok: false, text: data.msg || "Failed." });
      }
    } catch (e) {
      setPostMsg({ ok: false, text: "Something went wrong." });
    } finally {
      setPosting(false);
    }
  };

  // ── Delete Job ──
  const handleDeleteJob = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;
    const res = await fetch(`${API}/api/jobs/${id}`, { method: "DELETE", headers: authHeaders });
    if (res.status === 401) return handleUnauth();
    if (res.ok) setJobs((p) => p.filter((j) => j._id !== id));
  };

  // ── Reject Application ──
  const handleReject = async (app) => {
    if (!window.confirm(`Reject ${app.name}'s application and send rejection email?`)) return;
    setRejecting(app._id);
    try {
      const res = await fetch(`${API}/api/general/career/reject/${app._id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setRejected((prev) => [...prev, app._id]);
      } else {
        alert(data.message || "Failed to reject application");
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setRejecting(null);
    }
  };

  // ── Download Resume ──
  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const contentType = response.headers.get("content-type");
      let ext = "file";
      if (contentType.includes("pdf")) ext = "pdf";
      else if (contentType.includes("jpeg")) ext = "jpg";
      else if (contentType.includes("png")) ext = "png";
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${name}.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) { console.error(e); }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary";

  // pagination helpers
  const paginate = (arr, page) => arr.slice((page - 1) * perPage, page * perPage);

  const jobColumns = [
    { label: "Title", align: "text-left" },
    { label: "Type", align: "text-left" },
    { label: "Experience", align: "text-left" },
    { label: "Description", align: "text-left" },
    { label: "Actions", align: "text-center" },
  ];

  const appColumns = [
    { label: "Name", align: "text-left" },
    { label: "Email", align: "text-left" },
    { label: "Contact", align: "text-left" },
    { label: "Address", align: "text-left" },
    { label: "Area of Interest", align: "text-left" },
    { label: "Applied For", align: "text-left" },
    { label: "Resume", align: "text-left" },
    { label: "Status", align: "text-center" },
    { label: "Action", align: "text-center" },
  ];

  return (
    <div>

      <Breadcrumb items={[{ label: "Dashboard", link: "/admin/dashboard" }, { label: "Careers" }]} />

      {/* ── Job Postings Section ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-primary">Job Postings</h2>
        <button onClick={openCreate} className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:opacity-90 transition">
          + Post Job
        </button>
      </div>

      <Table
        columns={jobColumns}
        data={paginate(jobs, jobPage)}
        loading={jobLoading}
        emptyMessage="No job postings yet"
        renderRow={(job) => (
          <tr key={job._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-3 font-medium dark:text-white">{job.title}</td>
            <td className="px-4 py-3">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">{job.type}</span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{job.experience || "—"}</td>
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-[220px] truncate">{job.description}</td>
            <td className="px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => openEdit(job)}
                  className="px-3 py-1 bg-yellow-400 text-black rounded-md text-xs font-semibold hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-xs font-semibold hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      {!jobLoading && jobs.length > perPage && (
        <Pagination currentPage={jobPage} totalPages={Math.ceil(jobs.length / perPage)} setCurrentPage={setJobPage} />
      )}

      {/* ── Applications Section ── */}
      <div className="mt-10 mb-4">
        <h2 className="text-2xl font-semibold text-primary">Career Applications</h2>
      </div>

      <Table
        columns={appColumns}
        data={paginate(applications, appPage)}
        loading={appLoading}
        emptyMessage="No applications found"
        renderRow={(app) => (
          <tr key={app._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-3 break-words">{app.name}</td>
            <td className="px-4 py-3 break-words">{app.email}</td>
            <td className="px-4 py-3">{app.contact}</td>
            <td className="px-4 py-3 break-words max-w-[180px]">{app.address}</td>
            <td className="px-4 py-3 text-primary font-medium">{app.interest}</td>
            <td className="px-4 py-3 dark:text-white">{app.appliedFor || <span className="text-gray-400 text-sm">—</span>}</td>
            <td className="px-4 py-3">
              <button
                onClick={() => handleDownload(app.resume, app.name)}
                className="px-3 py-1 bg-primary text-white rounded-md text-sm hover:opacity-90 transition"
              >
                Download
              </button>
            </td>
            <td className="px-4 py-3 text-center">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                app.status === "rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}>
                {app.status === "rejected" ? "Rejected" : "Pending"}
              </span>
            </td>
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => handleReject(app)}
                disabled={rejecting === app._id || rejected.includes(app._id) || app.status === "rejected"}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  rejected.includes(app._id) || app.status === "rejected"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                }`}
              >
                {rejected.includes(app._id) || app.status === "rejected" ? "Rejected" : rejecting === app._id ? "Sending..." : "Reject"}
              </button>
            </td>
          </tr>
        )}
      />

      {!appLoading && applications.length > perPage && (
        <Pagination currentPage={appPage} totalPages={Math.ceil(applications.length / perPage)} setCurrentPage={setAppPage} />
      )}

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-primary">
                {editJob ? "Edit Job" : "Post a Job Opening"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange}
                  required placeholder="e.g. Social Media Manager" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} required className={inputClass}>
                    <option value="">Select type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience Required</label>
                  <input type="text" name="experience" value={formData.experience} onChange={handleInputChange}
                    placeholder="e.g. 1-2 years / Fresher" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange}
                  required rows={4} placeholder="Describe the role, responsibilities, and requirements..."
                  className={`${inputClass} resize-none`} />
              </div>

              {postMsg && (
                <p className={`text-sm font-medium ${postMsg.ok ? "text-green-600" : "text-red-500"}`}>{postMsg.text}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  Cancel
                </button>
                <button type="submit" disabled={posting}
                  className="px-4 py-2 text-sm rounded-md bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-60">
                  {posting ? (editJob ? "Updating..." : "Posting...") : (editJob ? "Update Job" : "Post Job")}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCarrerPage;
