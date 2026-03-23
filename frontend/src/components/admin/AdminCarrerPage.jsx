import React, { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import Breadcrumb from "../ui/Breadcrumb";
import Table from "../ui/Table";

const AdminCarrerPage = () => {

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 6;

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentApplications = applications.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(applications.length / perPage);

  useEffect(() => {
    fetchApplications();
  
  }, []);

  /* Fetch Applications */

  const fetchApplications = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "https://scrollfuelproject.onrender.com/api/general/career"
      );

      const data = await res.json();

      console.log(data);

      setApplications(data.data || []);

    } catch (error) {

      console.error("Error fetching career data:", error);

    } finally {

      setLoading(false);

    }

  };

  /* Table Columns */

  const columns = [
    { label: "Name", align: "text-left" },
    { label: "Email", align: "text-left" },
    { label: "Contact", align: "text-left" },
    { label: "Address", align: "text-left" },
    { label: "Area of Interest", align: "text-left" },
    // { label: "Resume", align: "text-left" },
    { label: "Download", align: "text-left" }
  ];

  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Detect file type
      const contentType = response.headers.get("content-type");

      let extension = "file";

      if (contentType.includes("pdf")) extension = "pdf";
      else if (contentType.includes("image/jpeg")) extension = "jpg";
      else if (contentType.includes("image/png")) extension = "png";

      const fileName = `${name}.${extension}`;

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (

    <div>

      {/* Breadcrumb */}

      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/admin/dashboard" },
          { label: "Application" }
        ]}
      />

      {/* Title */}

      <h2 className="text-2xl font-semibold text-primary mb-6">
        Career Applications
      </h2>

      {/* Reusable Table */}

      <Table
        columns={columns}
        data={currentApplications}
        loading={loading}
        emptyMessage="No applications found"
        renderRow={(app) => (

          <tr
            key={app._id}
            className="border-b-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >

            <td className="px-4 py-3 wrap-break-words">{app.name}</td>

            <td className="px-4 py-3 wrap-break-words">{app.email}</td>

            <td className="px-4 py-3">{app.contact}</td>

            <td className="px-4 py-3 wrap-break-words max-w-50">
              {app.address}
            </td>

            <td className="px-4 py-3 text-primary font-medium">
              {app.interest}
            </td>
{/* 
            <td className="px-4 py-3">
              <a
                href={app.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-secondary text-black rounded-md text-sm"
              >
                View
              </a>
            </td> */}

            {/* <td className="px-4 py-3">
              <a
                href={app.resume}
                download
                className="px-3 py-1 bg-primary text-white rounded-md text-sm"
              >
                Download
              </a>
            </td> */}
            <td className="px-4 py-3">
              <button
                onClick={() => handleDownload(app.resume, app.name)}
                className="px-3 py-1 bg-primary text-white rounded-md text-sm"
              >
                Download
              </button>
            </td>
          </tr>

        )}
      />

      {/* Pagination */}

      {!loading && applications.length > 0 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      )}

    </div>

  );

};

export default AdminCarrerPage;