import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import defineAbilitiesFor from "./abilities.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
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

const ANONYMOUS_ABILITY = defineAbilitiesFor(null);

const createAbilities = (req, res, next) => {
  req.ability = defineAbilitiesFor(req.user ?? null);
  next();
};

export { protect, admin, createAbilities };
