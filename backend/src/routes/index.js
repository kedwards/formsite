import { Router } from "express";
import totoro from "totoro-node";
import { successResponse } from "../utils/apiResponse.js";
import apiDocs from "./api-docs.js";
import routes from "./routes.js";
import errorHandler from "../middleware/errorMiddleware.js";

// import uploadRoutes from "./routes/uploadRoutes.js";
// import formRoutes from "./routes/formRoutes.js";

const router = Router();

router.get("/", (req, res) => {
  successResponse(res, "system ok");
});

// Users API
router.use("/api", totoro.rain(routes));

// API Documentation
router.use("/api-docs", apiDocs);

// Global Error Handler
router.use(errorHandler);

export default router;
