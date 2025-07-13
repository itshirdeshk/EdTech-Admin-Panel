import React from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, totalDocs, onPageChange }) => {
    const start = totalDocs > 0 ? (currentPage - 1) * 10 + 1 : 0;
    const end = Math.min(currentPage * 10, totalDocs);

    const getVisiblePages = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const half = Math.floor(maxPagesToShow / 2);
            let startPage = Math.max(1, currentPage - half);
            let endPage = Math.min(totalPages, currentPage + half);

            if (currentPage <= half) {
                endPage = maxPagesToShow;
            } else if (currentPage + half >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    return (
        <div className="pagination-container">
            <p className="pagination-summary">
                Showing {start} to {end} from {totalDocs}
            </p>
            <div className="pagination1">
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <IoMdArrowDropleft />
                </button>

                {getVisiblePages().map((page) => (
                    <button
                        key={page}
                        className={`pagination-page ${currentPage === page ? "active" : ""}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <IoMdArrowDropright />
                </button>
            </div>
        </div>
    );
};

export default Pagination;