import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Form from "../models/formModel.js";

// @desc    Submit a filled form
// @route   POST /api/form/submit
// @access  Private
const submitAttestationForm = asyncHandler(async (req, res) => {
  const { working, traveled, symptoms, contact, exposure, test } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    const form = await Form.create({
      user,
      formFields: [
        { user, working, traveled, symptoms, contact, exposure, test },
      ],
    });

    if (form) {
      res.status(201).json({
        _id: form._id,
        user: user._id,
        at: form.createdAt,
      });
    }
  } else {
    res.status(400);
    throw new Error("Error creating form");
  }
});

// @desc    Fetch all forms
// @route   GET /api/forms
// @access  Public
const getForms = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Form.countDocuments();

  const forms = await Form.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ forms, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get logged in user forms
// @route   GET /api/forms/myforms
// @access  Private
const getMyForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({ user: req.user._id });
  res.json(forms);
});

export { submitAttestationForm, getForms, getMyForms };
