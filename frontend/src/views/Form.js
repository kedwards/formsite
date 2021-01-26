import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getFormDetails, deliverForm } from "../redux/actions/form";
import { FORM_DELIVER_RESET } from "../constants/form";

const Form = ({ match: { params }, history }) => {
  const formId = params.id;

  const dispatch = useDispatch();

  const formDetails = useSelector((state) => state.formDetails);
  console.log(formDetails);

  const { form, loading, error } = formDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const formDeliver = useSelector((state) => state.formDeliver);
  const { success: successDeliver, loading: loadingDeliver } = formDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!form || successDeliver || form._id !== formId) {
      dispatch({ type: FORM_DELIVER_RESET });
      dispatch(getFormDetails(formId));
    }
  }, [dispatch, form, formId, successDeliver, history, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverForm(form));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Link to='/profile' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Form Id: {form._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>form</h2>
              <p>
                <strong>Name: </strong>
                {form.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${form.user.email}`}> {form.user.email}</a>
              </p>
              <p>
                <strong>Been on close contact in the past 14 days: </strong>
                {form.formFields.contact}
              </p>
              <p>
                <strong>Exposed to COVID-19 patients: </strong>
                {form.formFields.exposure}
              </p>
              <p>
                <strong>Have any COVID-19 symptoms: </strong>
                {form.formFields.symptoms}
              </p>
              <p>
                <strong>Had a positive in COVID-19 test in the past 14 days: </strong>
                {form.formFields.test}
              </p>
              <p>
                <strong>Traveled outside of Canada in the past 14 days: </strong>
                {form.formFields.traveled}
              </p>
              {form.isDelivered ? (
                <Message variant='success'>
                  Submitted On : {form.createdAt.split("T")[0]}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item variant='flush'>
                <h2>Form Summary</h2>
              </ListGroup.Item>
            </ListGroup>
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && !form.isDelivered && (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Form;
