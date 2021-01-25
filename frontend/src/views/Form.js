import React, { useEffect } from "react";
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
      <h1>Form: {form._id}</h1>
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
                <strong>Manager: </strong>
                {form.manager}
              </p>
              {form.isDelivered ? (
                <Message variant='success'>
                  Delivered on {form.deliveredAt}
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
