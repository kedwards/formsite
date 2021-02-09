import bcrypt from "bcryptjs";
import User from "../src/models/userModel.js";
import users from "./dynalifeUsers.js";
import connectDB from "../src/config/db.js";

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});

    const departmentUsers = [];

    users.map((t) => {
      departmentUsers.push({
        ...t,
        password: bcrypt.hashSync(t.employeeNumber, 10),
      });
    });

    // console.log(departmentUsers);

    await User.insertMany(departmentUsers);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});

    console.log("Data Destroyed.");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
