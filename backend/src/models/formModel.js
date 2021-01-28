import mongoose from "mongoose";

const formSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userDepartment: {
      type: String,
      required: true,
    },
    isSafe: {
      type: Boolean,
      default: false,
      required: true,
    },
    working: {
      type: Boolean,
      required: true,
    },
    formFields: {
      symptoms: {
        type: Boolean,
        required: true,
      },
      traveled: {
        type: Boolean,
        required: true,
      },
      contact: {
        type: Boolean,
        required: true,
      },
      exposure: {
        type: Boolean,
        required: true,
      },
      test: {
        type: Boolean,
        required: true,
      },
    },
    isDelivered: {
      type: Boolean,
      required: false,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

export default Form;
