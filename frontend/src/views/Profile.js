import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { isSafeToWork, localDateTime } from "../utils";
import {
  getUserDetails,
  updateUserProfile,
  userProfileReset,
} from "../redux/actions/user";
import { listMyForms } from "../redux/actions/form";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [manager, setManager] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const formListMy = useSelector((state) => state.formListMy);
  const { loading: loadingForms, error: errorForms, forms } = formListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch(userProfileReset());
        dispatch(getUserDetails("profile"));
        dispatch(listMyForms());
      } else {
        setName(user.name);
        setEmail(user.email);
        setDepartment(user.department);
        setManager(user.manager);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setPassword("");
      setConfirmPassword("");
    }
  };

  const formss = [];

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form className='update-profile' onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={user.name}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              disabled
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId='manager'>
            <Form.Label>Manager</Form.Label>
            <Form.Control type='text' value={manager} disabled></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId='department'>
            <Form.Label>Department</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter employee department'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='comfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Forms</h2>
        {loadingForms ? (
          <Loader />
        ) : errorForms ? (
          <Message variant='danger'>{errorForms}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>{localDateTime(form.createdAt)}</td>
                  <td>{manager}</td>
                  <td>{department}</td>
                  <td>
                    {isSafeToWork(form) ? (
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
      </Col>
    </Row>
  );
};

export default Profile;
