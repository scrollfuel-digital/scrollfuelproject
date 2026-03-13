import React from "react";
import Loader from "./Loader";

const Table = ({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = "No data found",
    renderRow
}) => {

    return (
        <div className="bg-white dark:bg-dark rounded-t-xl shadow-lg overflow-hidden">

            <table className="w-full">

                {/* Table Head */}
                <thead className="bg-primary text-white">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`p-4 font-semibold ${col.align || "text-left"}`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>

                    {loading ? (

                        <tr>
                            <td colSpan={columns.length} className="py-10">
                                <div className="flex justify-center">
                                    <Loader />
                                </div>
                            </td>
                        </tr>

                    ) : data.length === 0 ? (

                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-10 text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>

                    ) : (

                        data.map((item, index) => renderRow(item, index))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default Table;