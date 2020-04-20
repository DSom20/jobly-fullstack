import React from 'react';
import './Pagination.css'

function Pagination({ setStartSliceIndex, currentStartIndex, arrayLength, numItemsPerPage }) {
  const backDisabled = currentStartIndex <= 0;
  const forwardDisabled = currentStartIndex + numItemsPerPage >= arrayLength;

  const currentPage = Math.floor(currentStartIndex / numItemsPerPage) + 1;

  const totalPages = Math.floor(arrayLength / numItemsPerPage) + Number(arrayLength % numItemsPerPage !== 0);

  const setCurrentPage = (pageNum) => {
    setStartSliceIndex((pageNum - 1) * numItemsPerPage);
  }

  const pageButtons = new Array(totalPages).fill(null).map((val,ind) => 
    <button
      key={ind}
      onClick={() => setCurrentPage(ind + 1)}
      disabled={ind + 1 === currentPage}>
        {ind + 1}
    </button>
  );

  return (
    <div className="Pagination">
      <button disabled={backDisabled} onClick={() => setCurrentPage(1)}>First Page</button>
      <button disabled={backDisabled} onClick={() => setCurrentPage(currentPage - 1)}>Go Back</button>
      {pageButtons}
      <button disabled={forwardDisabled} onClick={() => setCurrentPage(currentPage + 1)}>Go Forward</button>
      <button disabled={forwardDisabled} onClick={() => setCurrentPage(totalPages)}>Last Page</button>
    </div>
  )
}

export default Pagination;