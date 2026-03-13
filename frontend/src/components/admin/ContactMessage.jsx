import React, { useState, useEffect } from "react";
import Loader from "../ui/Loader";
import Breadcrumb from "../ui/Breadcrumb";
import Pagination from "../ui/Pagination";
import Table from "../ui/Table";

const ContactMessage = () => {

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 6;

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentMessages = messages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(messages.length / perPage);

  useEffect(() => {
    fetchMessages();
  }, []);

  /* Fetch Messages */

  const fetchMessages = async () => {
    try {

      setLoading(true);

      const res = await fetch(
        "https://scrollfuelproject.onrender.com/api/general/contacts"
      );

      const data = await res.json();

      console.log("Contact API:", data);

      setMessages(data.data || []);

    } catch (error) {

      console.error("Error fetching contact messages:", error);

    } finally {

      setLoading(false);

    }
  };

  /* Mark Message as Read */

  const viewMessage = async (msg) => {

    try {

      await fetch(
        `https://scrollfuelproject.onrender.com/api/general/contacts/read/${msg._id}`,
        { method: "PUT" }
      );

      const updatedMessages = messages.map((m) =>
        m._id === msg._id ? { ...m, read: true } : m
      );

      setMessages(updatedMessages);
      setSelectedMessage(msg);

    } catch (error) {

      console.error("Error updating read status:", error);

    }

  };

  /* Table Columns */

  const columns = [
    { label: "Name", align: "text-left" },
    { label: "Email", align: "text-left" },
    { label: "Service", align: "text-left" },
    { label: "Status", align: "text-left" },
    { label: "Action", align: "text-left" }
  ];

  return (

    <div className="cursor-pointer">

      {/* Breadcrumb */}

      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/admin/dashboard" },
          { label: "Contacts" }
        ]}
      />

      {/* Title */}

      <h2 className="text-2xl font-semibold mb-6 text-primary">
        Contact Messages
      </h2>

      {/* Reusable Table */}

      <Table
        columns={columns}
        data={currentMessages}
        loading={loading}
        emptyMessage="No messages found"
        renderRow={(msg) => (

          <tr
            key={msg._id}
            className={`border-b-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800
            ${!msg.read ? "font-semibold bg-gray-50 dark:bg-gray-900" : ""}`}
          >

            <td className="px-4 py-3">{msg.name}</td>

            <td className="px-4 py-3">{msg.email}</td>

            <td className="px-4 py-3 text-primary">
              {msg.service}
            </td>

            <td className="px-4 py-3">

              {msg.read ? (
                <span className="text-green-600 text-sm">Read</span>
              ) : (
                <span className="text-red-500 text-sm">Unread</span>
              )}

            </td>

            <td className="px-4 py-3">

              <button
                onClick={() => viewMessage(msg)}
                className="bg-primary text-white px-3 py-1 rounded-lg hover:opacity-90"
              >
                View
              </button>

            </td>

          </tr>

        )}
      />

      {/* Pagination */}

      {!loading && messages.length > 0 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      )}

      {/* Modal */}

      {selectedMessage && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[420px] shadow-lg">

            <h3 className="text-xl font-semibold mb-4">
              Message Details
            </h3>

            <p><b>Name:</b> {selectedMessage.name}</p>
            <p><b>Email:</b> {selectedMessage.email}</p>
            <p><b>Phone:</b> {selectedMessage.phone}</p>
            <p><b>Service:</b> {selectedMessage.service}</p>

            <p className="mt-3">
              <b>Message:</b><br />
              {selectedMessage.message}
            </p>

            <button
              onClick={() => setSelectedMessage(null)}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default ContactMessage;