import { protect, createAbilities } from "../middleware/authMiddleware.js";

import {
  checkRegisterAbility,
  checkLoginAbility,
} from "../abilities/userAbilities.js";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  logoutUser,
  logoutUserFromAll,
} from "../controllers/userController.js";

const userEndpoints = [
  {
    route: "/users",
    method: "POST",
    middleware: [protect, createAbilities, checkRegisterAbility],
    implementation: registerUser,
  },
  {
    route: "/users/login",
    method: "POST",
    middleware: [createAbilities, checkLoginAbility],
    implementation: authUser,
  },
  {
    route: "/users/me/logout",
    method: "POST",
    middleware: [protect],
    implementation: logoutUser,
  },
  {
    route: "/users/me/logoutall",
    method: "POST",
    middleware: [protect],
    implementation: logoutUserFromAll,
  },
  {
    route: "/users/profile",
    method: "GET",
    middleware: [protect],
    implementation: getUserProfile,
  },
  {
    route: "/users",
    method: "GET",
    middleware: [protect, createAbilities],
    implementation: getUsers,
  },
  {
    route: "/users/:id",
    method: "GET",
    middleware: [protect, createAbilities],
    implementation: getUserById,
  },
  {
    route: "/users/profile",
    method: "PUT",
    middleware: [protect, createAbilities],
    implementation: updateProfile,
  },
  {
    route: "/users/:id",
    method: "PUT",
    middleware: [protect, createAbilities],
    implementation: updateUser,
  },
  {
    route: "/users/:id",
    method: "DELETE",
    middleware: [protect, createAbilities],
    implementation: deleteUser,
  },
];

export default userEndpoints;
