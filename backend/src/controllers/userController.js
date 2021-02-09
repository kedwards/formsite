import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/index.js";
import {
  successResponseWithData,
  notFoundResponse,
  validationErrorWithData,
} from "../utils/apiResponse.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (apiVersion, req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("manager", "name email");

  if (user && (await user.matchPassword(password))) {
    const resData = {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isOhs: user.isOhs,
      token: generateToken(user._id),
    };
    successResponseWithData(res, "Login succesful", resData);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (apiVersion, req, res) => {
  const { email, password, name, department, manager } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User allready exists");
  }

  const managerExists = await User.findOne({ department, isManager: true });

  if (!managerExists) {
    res.status(400);
    throw new Error("Manager for this department does not exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    department,
    manager: managerExists._id,
  });

  if (user) {
    const resData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      department: user.department,
      manager: user.manager,
      token: generateToken(user._id),
    };

    successResponseWithData(res, "success", resData);
  } else {
    validationErrorWithData(res, "Invalid user data", null);
  }
});

// @desc    Get user profile]
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (apiVersion, req, res) => {
  const user = await User.findById(req.user._id).populate(
    "manager",
    "name email"
  );

  if (user) {
    const resData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      badgeId: user.badgeId,
      title: user.title,
      employeeNumber: user.employeeNumber,
      department: user.department,
      manager: user.manager ? user.manager.email : "SytemAdmin",
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isOhs: user.isOhs,
    };
    successResponseWithData(res, "succesful", resData);
  } else {
    notFoundResponse(res, "User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (apiVersion, req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const resData = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    };
    successResponseWithData(res, "succesful", resData);
  } else {
    notFoundResponse(res, "User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (apiVersion, req, res) => {
  let users = [];
  const requester = await User.findById(req.user._id);

  if (requester.isAdmin || requester.isOhs) {
    users = await User.find({
      $and: [{ isAdmin: { $ne: true } }, { isOhs: { $ne: true } }],
    }).populate("User", "manager");
  } else if (requester.isManager) {
    users = await User.find({
      $and: [{ department: requester.department }],
    }).populate("User", "manager");
  }

  successResponseWithData(res, "succesful", users);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsersByDepartment = asyncHandler(async (req, res) => {
  const dept = req.params.dept;
  const users = await User.find({ department: dept }).populate(
    "User",
    "manager"
  );
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (apiVersion, req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("manager", "name email");

  if (user) {
    successResponseWithData(res, "success", user);
  } else {
    notFoundResponse(res, "User not found", null);
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (apiVersion, req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isManager = req.body.isManager ?? null;
    user.isOhs = req.body.isOhs ?? null;
    user.isAdmin = req.body.isAdmin ?? null;

    const updatedUser = await user.save();

    const resData = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    };
    successResponseWithData(res, "success", resData);
  } else {
    notFoundResponse(res, "User not found", null);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUsersByDepartment,
};
