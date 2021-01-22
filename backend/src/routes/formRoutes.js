import express from "express";
import {
  submitAttestationForm,
} from "../controllers/formController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, submitAttestationForm);

export default router;
