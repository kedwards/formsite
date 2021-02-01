import express from "express";
import {
  submitAttestationForm,
  getForms,
  getUserForms,
  getMyForms,
  getFormById,
  getMyDailyForms,
} from "../controllers/formController.js";
import {
  protect,
  admin,
  createAbilities,
} from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.route("/").post(protect, submitAttestationForm);
// router.route("/").get(getForms);
// router.route("/userforms/:id").get(protect, getUserForms);
// router.route("/myforms").get(protect, getMyForms);
// router.route("/mydailyforms").get(protect, getMyDailyForms);
// router.route("/:id").get(protect, createAbilities, getFormById);

// export default router;

const formRoutes = {
  v1: {
    active: true,
    deprecated: false,
    endpoints: [
      {
        route: "/",
        method: "GET",
        middleware: [protect, createAbilities],
        implementation: getForms,
      },
    ],
  },
};

export default formRoutes;
