import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
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

  return (
    <>
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
              <th>RESULT</th>
              <th>Manager?</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id}>
                <td>{form._id}</td>
                <td>{form.user.name}</td>
                <td>{form.createdAt}</td>
                <td>{form.user.manager}</td>
                <td>{form.user.department}</td>
                <td>{form.result}</td>
                <td>
                  {form.user.isManager ? (
                    <FontAwesomeIcon icon='check' style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {form.isDelivered ? (
                    <FontAwesomeIcon icon='check' style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                  )}
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
