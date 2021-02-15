import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../redux/actions/user";

const UserAdd = ({ history }) => {
  const userId = "";

  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [title, setTitle] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isOhs, setIsOhs] = useState(false);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { successRegister, loadingRegister, errorRegister } = userRegister;

  useEffect(() => {
    if (successRegister) {
      setName("");
      setEmail("");
      setEmployeeNumber("");
      setBadgeId("");
      setDepartment("");
      setTitle("");
      setIsAdmin("");
      setIsManager("");
      setIsOhs("");
    } else {
    }
  }, [dispatch, history, user, successRegister, errorRegister]);

  const setShowMessage = (value) => {
    setShow(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, employeeNumber, department, title, badgeId, isAdmin, isOhs, isManager));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add new user</h1>
        {loadingRegister && <Loader />}
        {errorRegister && show && (
          <Message variant="danger">
            Error in user creation!
          </Message>
        )}
        {successRegister && show && (
          <Message variant="success" setShowMessage={setShowMessage}>
            User Created
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="employeeNumber">
              <Form.Label>Employee Number</Form.Label>
              <Form.Control
                type="employeeNumber"
                placeholder="Enter Employee Number"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="badgeId">
              <Form.Label>Badge Id</Form.Label>
              <Form.Control
                type="badgeId"
                placeholder="Enter Badge Number"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter employee department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option>Accounting</option>
                <option>Business</option>
              </Form.Control>
            </Form.Group>{" "}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Employee Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                disabled={!(userInfo.isAdmin || userInfo.isOhs)}
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Is OHS"
                checked={isOhs}
                onChange={(e) => setIsOhs(e.target.checked)}
                disabled={!(userInfo.isAdmin || userInfo.isOhs)}
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Is Manager"
                checked={isManager}
                onChange={(e) => setIsManager(e.target.checked)}
                disabled={!(userInfo._id !== userId) && userInfo.isManager}
              ></Form.Check>
            </Form.Group>
            <Row>
              <Col md={3}>
                <Button type="submit" variant="primary">
                  Create User
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserAdd;
