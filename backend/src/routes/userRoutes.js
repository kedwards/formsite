import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUsersByDepartment,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/:dept").get(protect, admin, getUsersByDepartment);
router.route("/login").post(authUser);
router.route("/profile").get(getUserProfile).put(protect, updateProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
