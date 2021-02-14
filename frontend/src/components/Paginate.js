import React, { useState } from "react";
// import { Pagination } from "react-bootstrap";
import Pagination from "react-js-pagination";
// import { LinkContainer } from "react-router-bootstrap";

const Paginate = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // total records per page to display
  const recordPerPage = 15;

  // total number of the records
  const totalRecords = 850;

  // range of pages in paginator
  const pageRange = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // call API to get data based on pageNumber
  };

  return (
    // pages > 1 && (
    //   <Pagination>
    //     {[...Array(pages).keys()].map((x) => (
    //       <LinkContainer key={x + 1} to={`/admin/${type}list/${x + 1}`}>
    //         <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
    //       </LinkContainer>
    //     ))}
    //   </Pagination>
    // )
    <Pagination
      itemClass='page-item' // add it for bootstrap 4
      linkClass='page-link'
      activePage={currentPage}
      itemsCountPerPage={recordPerPage}
      totalItemsCount={totalRecords}
      pageRangeDisplayed={pageRange}
      onChange={handlePageChange}
    />
  );
};

export default Paginate;
