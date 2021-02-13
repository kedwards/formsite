import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import defineAbilitiesFor from "./abilities.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // const token = req.headers.authorization.split(" ")[1];
      const token = req.header("Authorization").replace("Bearer ", "");
      const data = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({
        _id: data.id,
        // "tokens.token": token,
      }).select("-password");

      req.token = token;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
});

const admin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isManager || req.user.isOhs)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const createAbilities = (req, res, next) => {
  req.ability = defineAbilitiesFor(req.user ?? null);
  next();
};

export { protect, admin, createAbilities };
