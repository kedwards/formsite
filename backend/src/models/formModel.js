import mongoose from "mongoose";
import { userSchema } from "./userModel.js";

const formSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    working: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    formFields: {
      symptoms: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },
      traveled: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },
      contact: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },
      exposure: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },
      test: {
        type: String,
        enum: ["yes", "no"],
        required: true,
      },
    },
    isDelivered: {
      type: String,
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
