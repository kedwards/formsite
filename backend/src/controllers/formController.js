import asyncHandler from "express-async-handler";
import { subject } from "@casl/ability";
import User from "../models/userModel.js";
import Form from "../models/formModel.js";
import {
  successResponseWithData,
  notFoundResponse,
  unauthorizedResponse,
} from "../utils/apiResponse.js";

import { isSafeToWork, queryDate } from "../utils/index.js";

// @desc    Submit a filled form
// @route   POST /api/form/submit
// @access  Private
const submitAttestationForm = asyncHandler(async (apiVersion, req, res) => {
  const { working, traveled, symptoms, contact, exposure, test } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    const form = await Form.create({
      user,
      userId: user._id,
      userDepartment: user.department,
      isSafe: isSafeToWork({ traveled, symptoms, contact, exposure, test }),
      working,
      formFields: { traveled, symptoms, contact, exposure, test },
    });

    if (form) {
      const resData = {
        _id: form._id,
        user: user._id,
        at: form.createdAt,
      };

      successResponseWithData(res, "success", resData);
    }
  } else {
    validationErrorWithData(res, "Error creating form", user._id);
  }
});

// @desc    Get form by id
// @route   GET /api/forms/:id
// @access  Private
const getFormById = asyncHandler(async (apiVersion, req, res) => {
  const form = await Form.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (form) {
    if (!req.ability.can("read", subject("Form", form))) {
      unauthorizedResponse(res, "No access to this form");
    }

    successResponseWithData(res, "success", form);
  } else {
    notFoundResponse(res, "Form not found");
  }
});

// @desc    Fetch all forms
// @route   GET /api/forms
// @access  Public
const getForms = asyncHandler(async (apiVersion, req, res) => {
  let query;
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.recordsPerPage) || 15;
  const user = req.user;

  if (user.isAdmin || user.isOhs) {
    query = [{ isAdmin: { $ne: true } }, { isOhs: { $ne: true } }];
  } else if (user.isManager) {
    query = [
      { userDepartment: user.department },
      { userId: { $ne: user._id } },
    ];
  }

  const forms = await Form.find({ $and: query })
    .populate({ path: "user", populate: { path: "manager" } })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const count = forms.length;
  const resData = {
    forms,
    page,
    count: forms.length,
    pages: Math.ceil(count / pageSize),
  };

  successResponseWithData(res, "success", resData);
});

// @desc    Fetch all forms
// @route   GET /api/allforms
// @access  Public
const getAllForms = asyncHandler(async (apiVersion, req, res) => {
  const count = await Form.countDocuments({});

  const forms = await Form.find({}).populate({
    path: "user",
    populate: { path: "manager" },
  });

  const resData = { forms, count };

  successResponseWithData(res, "success", resData);
});

// @desc    Get user forms with user ID
// @route   GET /api/forms/userforms
// @access  Private
const getUserForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({ user: req.params.id }).populate({
    path: "user",
    populate: { path: "manager" },
  });
  res.json(forms);
});

// @desc    Get logged in user forms
// @route   GET /api/forms/myforms
// @access  Private
const getMyForms = asyncHandler(async (apiVersion, req, res) => {
  const forms = await Form.find({ user: req.user._id }).populate(
    "user",
    "manager"
  );

  successResponseWithData(res, "success", forms);
});

// @desc    Get logged in user daily forms
// @route   GET /api/forms/myforms/:id
// @access  Private
const getMyDailyForms = asyncHandler(async (req, res) => {
  const today = new Date().toString().substr(0, 10);
  const { start, end } = queryDate();
  const forms = await Form.findOne({
    user: req.user._id,
    createdAt: { $gte: start, $lte: end },
  }).populate("user", "manager");
  res.json(forms);
});

export {
  submitAttestationForm,
  getForms,
  getAllForms,
  getUserForms,
  getMyForms,
  getFormById,
  getMyDailyForms,
};
