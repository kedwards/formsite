import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
// import Paginate from "../components/Paginate";
import Pagination from "react-js-pagination";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { localDateTime } from "../utils/index";
import { listForms } from "../redux/actions/form";

const FormList = ({ history, match: { params } }) => {
  // const pageNumber = params.pageNumber || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const pageRange = 10;
  const dispatch = useDispatch();

  const formList = useSelector((state) => state.formList);
  const { forms, count, loading, error } = formList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "user",
      text: "User",
    },
    {
      dataField: "submittDate",
      text: "Submited",
    },
    {
      dataField: "manager",
      text: "Manager",
    },
    {
      dataField: "dept",
      text: "Department",
    },
    {
      dataField: "safeToWork",
      text: "Safe To Work",
    },
  ];

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
          <Table striped bordered hover responsive className='table-sm'>
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
          </Table>
          {/* <Paginate pages={pages} page={page} /> */}
          <Pagination
            prevPageText='Previous'
            nextPageText='Next'
            itemClass='page-item'
            linkClass='page-link'
            activePage={currentPage}
            itemsCountPerPage={recordsPerPage}
            totalItemsCount={count}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
          />
          {/* <BootstrapTable
            keyField='id'
            data={forms}
            columns={columns}
            striped
            hover
            condensed
          /> */}
        </>
      )}
    </>
  );
};

export default FormList;
