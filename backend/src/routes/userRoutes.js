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
} from "../controllers/userController.js";
import {
  protect,
  admin,
  createAbilities,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile);

router.route("/login").post(authUser);

router.route("/register").post(createAbilities, registerUser);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.route("/").post(registerUser).get(protect, admin, getUsers);

export default router;
