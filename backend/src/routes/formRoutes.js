import express from "express";
import {
  submitAttestationForm,
  getForms,
  getMyForms,
  getFormById,
} from "../controllers/formController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, submitAttestationForm);
router.route("/").get(getForms);
router.route("/myforms").get(protect, getMyForms);
router.route("/:id").get(protect, getFormById);

export default router;
