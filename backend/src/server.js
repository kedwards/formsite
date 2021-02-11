import path from "path";
import cors from "cors";
import express from "express";
import router from "./routes/index.js";
import connectDB from "./config/db.js";

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  // exposedHeaders: ["x-auth-token"],
};
// // allow cors requests from any origin and with credentials
// app.use(
//   cors({
//     origin: (origin, callback) => callback(null, true),
//     credentials: true,
//     exposedHeaders: ["x-auth-token"],
//   })
// );

connectDB();

const app = express();
app.use(express.json());
app.use(cors(corsOption));
app.use(router);

// required as we are using es modules
// mimic common js and create a variable __dirname
const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const port = process.env.PORT || 5555;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
