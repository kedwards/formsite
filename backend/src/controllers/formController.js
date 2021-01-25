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

// @desc    Get form by id
// @route   GET /api/forms/:id
// @access  Private
const getFormById = asyncHandler(async (req, res) => {
  const form = await Form.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (form) {
    res.json(form);
  } else {
    res.status(404);
    throw new Error("Form not found");
  }
});

// @desc    Fetch all forms
// @route   GET /api/forms
// @access  Public
const getForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({}).populate(
    "user",
    "id name manager department"
  );
  res.json(forms);
});

// @desc    Get logged in user forms
// @route   GET /api/forms/myforms
// @access  Private
const getMyForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({ user: req.user._id }).populate(
    "user",
    "manager"
  );
  console.log(forms);
  res.json(forms);
});

export { submitAttestationForm, getForms, getMyForms, getFormById };
