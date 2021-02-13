import React, { useEffect } from "react";
import { Row, Button, Col, ListGroup, Card } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { localDateTime } from "../utils";
import { getFormDetails } from "../redux/actions/form";
import { FORM_DELIVER_RESET } from "../constants/form";

const Form = ({ match: { params }, history }) => {
  const formId = params.id;

  const dispatch = useDispatch();

  const formDetails = useSelector((state) => state.formDetails);
  const { form, loading, error } = formDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!form || form._id !== formId) {
      dispatch({ type: FORM_DELIVER_RESET });
      dispatch(getFormDetails(formId));
    }
  }, [dispatch, form, formId, history, userInfo]);

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
        {/* <FontAwesomeIcon icon='caret-square-left' /> */}
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
                  {form.formFields.contact ? "yes" : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Exposed to COVID-19 patients: </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.exposure ? "yes" : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>Have any COVID-19 symptoms: </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.symptoms ? "yes" : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>
                    Positive in COVID-19 test in the past 14 days:{" "}
                  </strong>
                </Col>
                <Col xs={6} md={6}>
                  {form.formFields.test ? "yes" : "no"}
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={6} md={6}>
                  <strong>
                    Traveled outside of Canada in the past 14 days:{" "}
                  </strong>
                </Col>
                <Col xs={6} md={3}>
                  {form.formFields.traveled ? "yes" : "no"}
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
                  {form.isSafe ? (
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
                    {form.isSafe ? (
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
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Form;
