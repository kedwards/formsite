import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../redux/actions/user";

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.isAdmin || userInfo.isManager || userInfo.isOhs)
    ) {
      dispatch(listUsers(userInfo.department));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Button type='button' className='btn btn-light my-3' onClick={goBack}>
        Go Back
      </Button>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>MANAGER</th>
              <th>OHS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                <a href={`/admin/formList/${user._id}`}>
                  {user.name}
                </a>
                </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FontAwesomeIcon icon='check' style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {user.isManager ? (
                    <FontAwesomeIcon icon='check' style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {user.isOHS ? (
                    <FontAwesomeIcon icon='check' style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon='times' style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FontAwesomeIcon icon='edit' />
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

export default UserList;
