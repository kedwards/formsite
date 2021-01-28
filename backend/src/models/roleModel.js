import mongoose from "mongoose";
import { AutoIncrement } from "../config/db.js";

export const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

roleSchema.plugin(AutoIncrement, { inc_field: "id" });

const Role = mongoose.model("Role", roleSchema);

export default Role;
