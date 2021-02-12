import bcrypt from "bcryptjs";
import User from "../src/models/userModel.js";
import users from "./dynalifeUsers.js";
import connectDB from "../src/config/db.js";

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await Forms.deleteMany({});

    const sysAdmin = {
      employeeNumber: "000000000",
      name: "System Administrator",
      password: bcrypt.hashSync("Password123?", 10),
      badgeId: "000000000000",
      title: "Sysyem Administrator",
      department: "System",
      email: "sysyadmin@forms.dynalife.ca",
      isSysAdmin: "true",
    };

    const sysAdminUser = await User.insertMany(sysAdmin);
    sysAdminUser.manager = sysAdminUser._id;
    await sysAdminUser.save();

    const dynalifeUsers = [];

    users.map((user) => {
      dynalifeUsers.push({
        ...user,
        password: bcrypt.hashSync(user.employeeNumber, 10),
      });
    });

    await User.insertMany(dynalifeUsers);
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
