import React from 'react';

export const PaginationFooter = ({ paginationInformation, lastPage, page, setPage }) => {
  if (!lastPage || lastPage <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
    }
  };

  return (
    <div className="card-footer d-flex align-items-center">
      <p className="m-0 text-muted">
        Showing <span>{paginationInformation?.from || 0}</span> to <span>{paginationInformation?.to || 0}</span> of{" "}
        <span>{paginationInformation?.total || 0}</span> entries
      </p>
      <ul className="pagination m-0 ms-auto">
        {/* Previous Button */}
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(lastPage).keys()].map(num => (
          <li key={num + 1} className={`page-item ${page === num + 1 ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${page === lastPage ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === lastPage}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon ms-1"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};