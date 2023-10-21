import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [];

    // Generate an array of page numbers based on totalPages
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <button className={`paginationBttns ${currentPage === 1 ? 'paginationDisabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`pageBtn ${currentPage === pageNumber ? 'active' : ''}`}
                >
                    {pageNumber}
                </button>
            ))}
            <button className={`paginationBttns ${currentPage === totalPages ? 'paginationDisabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
