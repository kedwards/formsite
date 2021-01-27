import path from "path";
import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import ability from "./middleware/abilities.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import formRoutes from "./routes/formRoutes.js";

import { Article } from "./entities/index.js";

connectDB();

// console.log(ability.can("read", "Form")); // true
// console.log(ability.can("read", "User")); // true
// console.log(ability.can("update", "User")); // true
// console.log(ability.can("delete", "User")); // false
// console.log(ability.cannot("delete", "User")); // true

const user = { id: 1 };
const abilities = ability(user);
const article = new Article(); /* intentionally not defined */
console.log(abilities.can("read", article));

const user1 = { id: 1, isLoggedIn: true };
const ownArticle = new Article({ authorId: user.id });
const anotherArticle = new Article({ authorId: 2 });
const ability1 = ability(user1);

console.log(ability1.can("read", "Article")); // true
console.log(ability1.can("update", "Article")); // true
console.log(ability1.can("update", ownArticle)); // true
console.log(ability1.can("update", anotherArticle)); // false, we can't update articles which were not written by us

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/forms", formRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5555;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
