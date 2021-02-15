import { useMemo } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row: { index } }) => index + 1,
        sortType: "alphanumeric",
        Filter: [],
      },
      {
        Header: "NAME",
        accessor: "name",
        Cell: ({ value, row }) => {
          return (
            <Link to={`/admin/formList/${row.original._id}`}>{value}</Link>
          );
        },
      },
      {
        Header: "EMAIL",
        accessor: "email",
        Cell: ({ value }) => <a href={`mailto:${value}`}>{value}</a>,
        Filter: [],
      },
      {
        Header: "ADMIN",
        accessor: "isAdmin",
        Cell: ({ value }) =>
          value === true ? (
            <FontAwesomeIcon icon='check' style={{ color: "green" }} />
          ) : (
            <FontAwesomeIcon icon='times' style={{ color: "red" }} />
          ),
        Filter: [],
      },
      {
        Header: "MANAGER",
        accessor: "isManager",
        Cell: ({ value }) =>
          value === true ? (
            <FontAwesomeIcon icon='check' style={{ color: "green" }} />
          ) : (
            <FontAwesomeIcon icon='times' style={{ color: "red" }} />
          ),
        Filter: [],
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
        Filter: [],
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

export default useColumns;
