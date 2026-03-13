import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

    const pages = [...Array(totalPages).keys()].map((n) => n + 1);

    return (
        <div className="flex justify-center p-4 bg-primary gap-2 flex-wrap rounded-b-lg">

            {/* Previous */}
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border text-sm disabled:opacity-40"
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border text-sm
          ${currentPage === page
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border text-sm disabled:opacity-40"
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;