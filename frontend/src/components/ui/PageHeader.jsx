import React from "react";

const PageHeader = ({
    title,
    count,
    showSearch = false,
    searchValue,
    setSearchValue,
    buttonText,
    onButtonClick
}) => {

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            {/* Title */}
            {title && (
                <h2 className="text-2xl font-bold">
                    {title} {count !== undefined && `(${count})`}
                </h2>
            )}

            <div className="flex items-center gap-4">

                {/* Search */}
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="border px-4 py-2 rounded-lg w-64"
                    />
                )}

                {/* Button */}
                {buttonText && (
                    <button
                        onClick={onButtonClick}
                        className="bg-primary text-white px-5 py-2 rounded-lg"
                    >
                        {buttonText}
                    </button>
                )}

            </div>

        </div>
    );
};

export default PageHeader;