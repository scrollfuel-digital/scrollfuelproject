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
    // Open the modal immediately
    setSelectedMessage(msg);

    if (msg.read) return;

    try {
      const response = await fetch(
        `https://scrollfuelproject.onrender.com/api/general/contacts/read/${msg._id}`,
        { method: "PUT" }
      );

      if (!response.ok) {
        throw new Error("Unable to update message read status");
      }

      setMessages((prevMessages) =>
        prevMessages.map((item) =>
          item._id === msg._id
            ? { ...item, read: true }
            : item
        )
      );

      setSelectedMessage((prev) =>
        prev && prev._id === msg._id
          ? { ...prev, read: true }
          : prev
      );
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };


  /* Table Columns */

  const columns = [
    { label: "Date", align: "text-left" },
    { label: "Name", align: "text-left" },
    { label: "Email", align: "text-left" },
    { label: "Service", align: "text-left" },
    { label: "Status", align: "text-left" },
    { label: "Action", align: "text-left" }
  ];
  const formatDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "—";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
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
            <td className="px-4 py-3 whitespace-nowrap">
              {formatDate(msg.createdAt)}
            </td>
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

      {/* Contact Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
          bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-2xl max-h-[85vh] flex-col
            overflow-hidden rounded-2xl border border-gray-200
            bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-950"
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between gap-4
              border-b border-gray-200 bg-gray-50 px-6 py-5
              dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <p className="mb-1 text-xs font-bold uppercase
                tracking-[0.18em] text-primary">
                  ScrollFuel · Contact Inquiry
                </p>

                <h3
                  id="contact-modal-title"
                  className="text-xl font-bold text-gray-900
                  dark:text-white sm:text-2xl"
                >
                  Message Details
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close message details"
                onClick={() => setSelectedMessage(null)}
                className="flex h-10 w-10 shrink-0 items-center
                justify-center rounded-lg border border-gray-200
                bg-white text-2xl text-gray-600 transition
                hover:border-primary hover:bg-primary
                hover:text-white dark:border-gray-700
                dark:bg-gray-800 dark:text-gray-200"
              >
                &times;
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Name */}
                <div className="rounded-xl border border-gray-200
                bg-gray-50 p-4 dark:border-gray-800
                dark:bg-gray-900">
                  <p className="mb-2 text-xs font-medium uppercase
                  tracking-wide text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  <p className="break-words font-semibold
                  text-gray-900 dark:text-white">
                    {selectedMessage.name || "—"}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-200
                bg-gray-50 p-4 dark:border-gray-800
                dark:bg-gray-900">
                  <p className="mb-2 text-xs font-medium uppercase
                  tracking-wide text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="break-all font-medium text-primary">
                    {selectedMessage.email || "—"}
                  </p>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-gray-200
                bg-gray-50 p-4 dark:border-gray-800
                dark:bg-gray-900">
                  <p className="mb-2 text-xs font-medium uppercase
                  tracking-wide text-gray-500 dark:text-gray-400">
                    Phone Number
                  </p>
                  <p className="break-words font-semibold
                  text-gray-900 dark:text-white">
                    {selectedMessage.phone || "—"}
                  </p>
                </div>

                {/* Service */}
                <div className="rounded-xl border border-gray-200
                bg-gray-50 p-4 dark:border-gray-800
                dark:bg-gray-900">
                  <p className="mb-2 text-xs font-medium uppercase
                  tracking-wide text-gray-500 dark:text-gray-400">
                    Service
                  </p>
                  <p className="break-words font-semibold
                  text-gray-900 dark:text-white">
                    {selectedMessage.service || "General Inquiry"}
                  </p>
                </div>

                {/* Date */}
                <div className="rounded-xl border border-gray-200
                bg-gray-50 p-4 dark:border-gray-800
                dark:bg-gray-900 sm:col-span-2">
                  <p className="mb-2 text-xs font-medium uppercase
                  tracking-wide text-gray-500 dark:text-gray-400">
                    Submitted On
                  </p>
                  <p className="font-semibold text-gray-900
                  dark:text-white">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="mt-5 rounded-xl border
              border-gray-200 dark:border-gray-800">
                <div className="border-b border-gray-200
                bg-gray-50 px-5 py-3 dark:border-gray-800
                dark:bg-gray-900">
                  <h4 className="font-semibold text-gray-900
                  dark:text-white">
                    Message
                  </h4>
                </div>

                <div className="p-5">
                  <p className="whitespace-pre-wrap break-words
                  text-sm leading-7 text-gray-700
                  dark:text-gray-300">
                    {selectedMessage.message ||
                      "No message content available."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between
            gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4
            dark:border-gray-800 dark:bg-gray-900">
              <span
                className={`rounded-full px-3 py-1 text-xs
                font-semibold ${selectedMessage.read
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
              >
                {selectedMessage.read ? "Read" : "Unread"}
              </span>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg bg-primary px-6 py-2.5
                font-semibold text-white transition
                hover:opacity-90 focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>

  );

};

export default ContactMessage;