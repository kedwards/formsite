import mongoose from "mongoose";
import { userSchema } from "./userModel.js";

const formSchema = mongoose.Schema(
  {
    // Opting to embed UserObject
    // instead of lookups
    //
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    user: userSchema,
    formFields: [
      {
        working: {
          type: String,
          enum: ["yes", "no"],
          required: true,
        },
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
    ],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

export default Form;
