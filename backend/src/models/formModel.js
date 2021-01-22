import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    formFields: [
      {
        working_today: {
          type: boolean,
          required: true,
        },
        symptoms: {
          type: boolean,
          required: true,
        },
        traveled: {
          type: boolean,
          required: true,
        },
        closeContact: {
          type: boolean,
          required: true,
        },
        labExposure: {
          type: boolean,
          required: true,
        },
        positiveTest: {
          type: boolean,
          required: true,
        },
      },
    ],
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", orderSchema);

export default Form;
