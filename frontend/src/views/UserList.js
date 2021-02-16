import React, { useEffect, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useFilters, usePagination } from "react-table";
// import Pagination from "react-js-pagination";
// import Paginate from "../components/Paginate";
import { useUserColumns } from "./table/columns";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../redux/actions/user";

const UserList = ({ history, match: { params } }) => {
  const currentPage = 1;
  const recordsPerPage = 20;

  const dispatch = useDispatch();
  const columns = useUserColumns();

  const userList = useSelector((state) => state.userList);
  const { users, count, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const TextFilter = ({
  //   column: { filterValue, preFilteredRows, setFilter },
  // }) => {
  //   const count = preFilteredRows.length;
  //   return (
  //     <input
  //       value={filterValue || ""}
  //       onChange={(e) => {
  //         setFilter(e.target.value || undefined);
  //       }}
  //       placeholder={`Search ${count} records...`}
  //     />
  //   );
  // };

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.isAdmin || userInfo.isManager || userInfo.isOhs)
    ) {
      dispatch(listUsers(currentPage, recordsPerPage));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, currentPage, recordsPerPage]);

  const goBack = () => {
    history.goBack();
  };

  const data = useMemo(() => users, []);

  // const defaultColumn = useMemo(
  //   () => ({
  //     Filter: TextFilter,
  //   }),
  //   []
  // );

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Button type='button' className='btn btn-light my-3' onClick={goBack}>
            Go Back
          </Button>
          <h1>Users</h1>
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
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
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
          {pageOptions.length <= 1 ? null : (
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
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
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
          )}
        </>
      )}
    </>
  );
};

export default UserList;
