import { useMemo } from "react";
import { LinkContainer } from "react-router-bootstrap";
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { localDateTime } from "../../utils/";

const useUserColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row: { index } }) => index + 1,
      },
      {
        Header: "NAME",
        accessor: "name",
        Cell: ({ value, row: { original } }) => {
          return (
            // <Link to={`/admin/formList/${row.original._id}`}>{value}</Link>
            <a href={`mailto:${original.email}`}>{value}</a>
          );
        },
        Filter: ({ column: { filterValue, preFilteredRows, setFilter } }) => {
          const count = preFilteredRows.length;
          return (
            <input
              value={filterValue || ""}
              onChange={(e) => {
                setFilter(e.target.value || undefined);
              }}
              placeholder={`Search ${count} records...`}
            />
          );
        },
      },
      // {
      //   Header: "EMAIL",
      //   accessor: "email",
      //   Cell: ({ value }) => <a href={`mailto:${value}`}>{value}</a>,
      // },
      {
        Header: "ADMIN",
        accessor: "isAdmin",
        Cell: ({ value }) =>
          value === true ? (
            <FontAwesomeIcon icon='check' style={{ color: "green" }} />
          ) : (
            <FontAwesomeIcon icon='times' style={{ color: "red" }} />
          ),
      },
      {
        Header: "IS MANAGER",
        accessor: "isManager",
        Cell: ({ value }) =>
          value === true ? (
            <FontAwesomeIcon icon='check' style={{ color: "green" }} />
          ) : (
            <FontAwesomeIcon icon='times' style={{ color: "red" }} />
          ),
      },
      {
        Header: "OHS",
        accessor: "isOhs",
        Cell: ({ value }) =>
          value === true ? (
            <FontAwesomeIcon icon='check' style={{ color: "green" }} />
          ) : (
            <FontAwesomeIcon icon='times' style={{ color: "red" }} />
          ),
      },
      {
        Header: " ",
        accesor: "edit",
        Cell: ({ value, row }) => {
          return (
            <LinkContainer to={`/admin/user/${row.original._id}/edit`}>
              <Button variant='light' className='btn-sm'>
                <FontAwesomeIcon icon='edit' />
              </Button>
            </LinkContainer>
          );
        },
      },
    ],
    []
  );

  return columns;
};

const useFormColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row: { index } }) => index + 1,
      },
      {
        Header: "USER",
        accessor: "user.name",
        Cell: ({ row: { original } }) => {
          return (
            <a href={`mailto:${original.user.email}`}>{original.user.name}</a>
          );
        },
      },
      {
        Header: "SUBMITTED DATE",
        accessor: "createdAt",
        Cell: ({ value }) => localDateTime(value),
      },
      {
        Header: "MANAGER",
        accessor: "user.manager.name",
        Cell: ({ row: { original } }) => {
          return !original.user.isManager ? (
            <a href={`mailto:${original.user.manager.email}`}>
              {original.user.manager.name}
            </a>
          ) : null;
        },
      },
      {
        Header: "DEPARTMENT",
        accessor: "user.department",
      },
      {
        Header: "IS SAFE",
        accesor: "isSafe",
        Cell: ({ row: { original } }) =>
          original.isSafe === true ? (
            <FontAwesomeIcon icon='check' style={{ color: "green" }} />
          ) : (
            <FontAwesomeIcon icon='times' style={{ color: "red" }} />
          ),
      },
      {
        Header: " ",
        accesor: "edit",
        Cell: ({ value, row }) => {
          return (
            <LinkContainer to={`/admin/user/${row.original._id}/edit`}>
              <Button variant='light' className='btn-sm'>
                <FontAwesomeIcon icon='edit' />
              </Button>
            </LinkContainer>
          );
        },
      },
    ],
    []
  );

  return columns;
};

export { useUserColumns, useFormColumns };
