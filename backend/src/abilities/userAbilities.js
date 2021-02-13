import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { FailureAbility, unauthorizedResponse } from "../utils/apiResponse.js";

export const checkRegisterAbility = asyncHandler(async (req, res, next) => {
  const { ability } = req;
  if (ability.can("create", "User")) {
    next();
  } else {
    FailureAbility(res, "Registration is restricted, please try again later");
  }
});

export const checkAbility = asyncHandler(async (req, res, next) => {
  // const { ability } = req;
  next();
});

export const checkLoginAbility = asyncHandler(async (req, res, next) => {
  const { ability } = req;
  const { email } = req.body;

  const adminUsers = await User.find({
    $or: [{ isAdmin: true }, { isOhs: true }],
  }).select("email -_id");

  const isAdmin = adminUsers.filter((admins) => {
    return admins.email === email;
  });

  if (isAdmin.length || ability.can("login", "User")) {
    next();
  } else {
    FailureAbility(res, "Login is restricted, please try again later");
  }
});
