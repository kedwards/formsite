import userEndpoints from "./userEndpoints.js";
import formEndpoints from "./formEndpoints.js";

const mergedEndPoints = [...formEndpoints, ...userEndpoints];

const userRoutes = {
  v1: {
    active: true,
    deprecated: false,
    endpoints: mergedEndPoints,
  },
};

export default userRoutes;
