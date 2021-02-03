import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ show, variant, children, setShowMessage }) => {
  return (
    <Alert show={show} variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "blue",
};

export default Message;
