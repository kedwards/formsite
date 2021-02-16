import {
  errorResponse,
  notFoundResponse,
  unauthorizedResponse,
  validationErrorWithData,
} from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  switch (true) {
    case typeof err === "string":
      // custom application error
      const is404 = err.toLowerCase().endsWith("not found");
      is404
        ? notFoundResponse(res, err)
        : validationErrorWithData(res, err, req.body);
      break;
    case err.name === "ValidationError":
      // mongoose validation error
      validationErrorWithData(res, err.message, req.body);
      break;
    case err.name === "UnauthorizedError":
      // jwt authentication error
      unauthorizedResponse(res, "Unauthorized");
      break;
    default:
      errorResponse(res, err.message);
      if (process.env.NODE_ENV !== "production") {
        console.log("Middleware ENV :" ,JSON.stringify(err));
      }
  }
};

export default errorHandler;
