import { protect, createAbilities } from "../middleware/authMiddleware.js";

import {
  submitAttestationForm,
  getForms,
  getAllForms,
  getUserForms,
  getMyForms,
  getFormById,
  getMyDailyForms,
} from "../controllers/formController.js";

const formEndpoints = [
  {
    route: "/forms",
    method: "GET",
    middleware: [protect, createAbilities],
    implementation: getForms,
  },
  {
    route: "/forms/allforms",
    method: "GET",
    middleware: [protect, createAbilities],
    implementation: getAllForms,
  },
  {
    route: "/forms/myforms",
    method: "GET",
    middleware: [protect, createAbilities],
    implementation: getMyForms,
  },
  {
    route: "/forms/:id",
    method: "GET",
    middleware: [protect, createAbilities],
    implementation: getFormById,
  },
  {
    route: "/forms",
    method: "POST",
    middleware: [protect, createAbilities],
    implementation: submitAttestationForm,
  },
];

export default formEndpoints;
