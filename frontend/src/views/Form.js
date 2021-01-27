import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { isSafeToWork, localDateTime } from "../utils";
import { getFormDetails, deliverForm } from "../redux/actions/form";
import { FORM_DELIVER_RESET } from "../constants/form";

const Form = ({ match: { params }, history }) => {
  const formId = params.id;

  const dispatch = useDispatch();

  const formDetails = useSelector((state) => state.formDetails);
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

  const goBack = () => {
    history.goBack();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Button type='button' className='btn btn-light my-3' onClick={goBack}>
        Go Back
      </Button>
      <h1>Form Id: {form._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Details</h2>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Work Date: </strong>
                </Col>
                <Col xs={6} md={4}>
                  {localDateTime(form.createdAt)}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Name: </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.user.name}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Email: </strong>
                </Col>
                <Col xs={6} md={6}>
                  <a href={`mailto:${form.user.email}`}> {form.user.email}</a>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Close contact in the past 14 days: </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.contact ? form.formFields.contact : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Exposed to COVID-19 patients: </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.exposure ? form.formFields.exposure : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Have any COVID-19 symptoms: </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.symptoms ? form.formFields.symptoms : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>
                    Positive in COVID-19 test in the past 14 days:{" "}
                  </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.test ? form.formFields.test : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>
                    Traveled outside of Canada in the past 14 days:{" "}
                  </strong>
                </Col>
                <Col xs={6} md={3}>
                  {form.formFields.traveled ? form.formFields.traveled : "no"}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item variant='flush'>
                <h2>Form Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item variant='flush'>
                <Row>
                  <Col>Work Date:</Col>
                  <Col>
                    <strong>
                      {localDateTime(form.createdAt).substring(0, 10)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant='flush'>
                <Row>
                  <Col>Safe to work:</Col>
                  {isSafeToWork(form) ? (
                    <Col style={{ color: "green" }}>
                      <strong>Yes</strong>
                    </Col>
                  ) : (
                    <Col style={{ color: "red" }}>
                      <strong>No</strong>
                    </Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant='flush'>
                <Row>
                  <Col>
                    {form.isDelivered && isSafeToWork(form) ? (
                      <Message variant='success'>
                        Submitted On :{" "}
                        <strong>{form.createdAt.split("T")[0]}</strong>
                      </Message>
                    ) : (
                      <Message variant='danger'>
                        Submitted On :{" "}
                        <strong>{form.createdAt.split("T")[0]}</strong>
                      </Message>
                    )}
                  </Col>
                </Row>
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
