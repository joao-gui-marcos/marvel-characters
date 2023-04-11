import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxPagesToShow = 6;

  // Calculate the range of page numbers to be displayed
  let startPage = currentPage;
  let endPage = Math.min(currentPage + maxPagesToShow - 1, totalPages);

  // If there are not enough pages after the current page, adjust the range
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = endPage - maxPagesToShow + 1;
    if (startPage < 1) startPage = 1;
  }

  // Add the page number buttons to the array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => onPageChange(i)}>
        {i}
      </button>
    );
  }

  // Add the first and last page buttons if they are not already included
  if (startPage > 1) {
    if (startPage > 2) {
      pageNumbers.unshift(
        <span key="ellipsis1">{"<<"}</span>
      );
    }
    pageNumbers.unshift(
      <button key="1" onClick={() => onPageChange(1)}>
        1
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis2">{">>"}</span>
      );
    }
    pageNumbers.push(
      <button key={totalPages} onClick={() => onPageChange(totalPages)}>
        {totalPages}
      </button>
    );
  }

  return (
    <div>
      {pageNumbers}
    </div>
  );
}

export default Pagination;
