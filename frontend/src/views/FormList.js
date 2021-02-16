import React, { useEffect, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
// import Paginate from "../components/Paginate";
import { useTable, useFilters, usePagination } from "react-table";
// import Pagination from "react-js-pagination";
import { useFormColumns } from "./table/columns";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import { localDateTime } from "../utils/index";
import { listForms } from "../redux/actions/form";

const FormList = ({ history, match: { params } }) => {
  const currentPage = 1;
  const recordsPerPage = 20;

  const dispatch = useDispatch();
  const columns = useFormColumns();

  const formList = useSelector((state) => state.formList);
  const { forms, count, loading, error } = formList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listForms(currentPage, recordsPerPage));
    }
  }, [dispatch, history, userInfo, currentPage, recordsPerPage]);

  const goBack = () => {
    history.goBack();
  };

  const data = useMemo(() => forms, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 15, pageCount: count },
    },
    useFilters,
    usePagination
  );

  return (
    <>
      <Button type='button' className='btn btn-light my-3' onClick={goBack}>
        Go Back
      </Button>
      <h1>Forms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>SUBMITTED DATE</th>
                <th>MANAGER</th>
                <th>DEPARTMENT</th>
                <th>SAFE TO WORK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr key={form._id}>
                  <td>{index + 1}</td>
                  <td>{form.user.name}</td>
                  <td>{localDateTime(form.createdAt)}</td>
                  <td>{form.user.manager ? form.user.manager.name : null}</td>
                  <td>{form.user.department}</td>
                  <td>
                    {form.isSafe ? (
                      <FontAwesomeIcon
                        icon='check'
                        style={{ color: "green" }}
                      />
                    ) : (
                      <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/form/${form._id}`}>
                      <Button className='btn-sm' variant='light'>
                        <FontAwesomeIcon icon='eye' />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
          {/* <Paginate pages={pages} page={page} /> */}
          {/* <Pagination
            prevPageText='Previous'
            nextPageText='Next'
            itemClass='page-item'
            linkClass='page-link'
            activePage={currentPage}
            itemsCountPerPage={recordsPerPage}
            totalItemsCount={count}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
          /> */}
          <div className={"table-responsive"}>
            <Table
              className='table-sm table table-striped table-bordered table-hover'
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {/* <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon
                                icon='arrow-down'
                                style={{ color: "#05508A", marginLeft: "5px" }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon='arrow-up'
                                style={{ color: "#05508A", marginLeft: "5px" }}
                              />
                            )
                          ) : null}
                        </span>
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div> */}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          {/* {pageOptions.length <= 1 ? null : ( */}
          <>
            <ul className='pagination'>
              <li
                className='page-item'
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <button
                  className='page-link'
                  href='#'
                  aria-label='Go to first page'
                >
                  First
                </button>
              </li>

              <li
                className='page-item'
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <button
                  className='page-link'
                  href='#'
                  aria-label='Go to previous page'
                >
                  {"<"}
                </button>
              </li>
              <li
                className='page-item'
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <button
                  className='page-link'
                  href='#'
                  aria-label='Go to next page'
                >
                  {">"}
                </button>
              </li>
              <li
                className='page-item'
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <button
                  className='page-link'
                  href='#'
                  aria-label='Go to last page'
                >
                  Last
                </button>
              </li>
            </ul>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
              | Go to page:{" "}
              <input
                type='number'
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default FormList;
