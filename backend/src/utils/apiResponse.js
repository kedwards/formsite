const errorResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

const notFoundResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

const successResponse = (res, msg) => {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

const successResponseWithData = (res, msg, data) => {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(200).json(resData.data);
};

const FailureAbility = (res, msg) => {
  const resData = {
    status: 0,
    message: msg,
  };
  return res.status(403).json(resData);
};

const validationErrorWithData = (res, msg, data) => {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(400).json(resData.data);
};

const unauthorizedResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
};

export {
  errorResponse,
  notFoundResponse,
  successResponse,
  successResponseWithData,
  validationErrorWithData,
  unauthorizedResponse,
  FailureAbility,
};
