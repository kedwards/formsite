import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";

const router = Router();

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(yaml.load(fs.readFileSync("src/docs/swagger.yaml", "utf8")))
);

export default router;
