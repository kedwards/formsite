import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { localDateTime, isSafeToWork } from "../utils/index";
import { listForms } from "../redux/actions/form";

const FormList = ({ history }) => {
  const dispatch = useDispatch();

  const formList = useSelector((state) => state.formList);
  const { forms, loading, error } = formList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo && (!userInfo.isAdmin || !userInfo.isOhs)) {
      history.push("/login");
    } else {
      dispatch(listForms());
    }
  }, [dispatch, history, userInfo]);

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
                <td>{form.user.manager}</td>
                <td>{form.user.department}</td>
                <td>
                  {isSafeToWork(form) ? (
                    <FontAwesomeIcon icon='check' style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/form/${form._id}`}>
                    <Button className='btn-sm' variant='light'>
                      {/* Details */}
                      <FontAwesomeIcon icon='eye' />
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default FormList;
