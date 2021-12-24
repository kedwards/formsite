import bcrypt from "bcryptjs";
import User from "../src/models/userModel.js";
import Forms from "../src/models/formModel.js";
import users from "./users.js";
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
      title: "System Administrator",
      department: "System",
      email: "sysadmin@formsite.ca",
      isSysAdmin: true,
    };
    const sysAdminUser = await User.create(sysAdmin);

    let userArr = [];
    const deptGroups = [];

    const admins = users.filter((user) => user.isAdmin);
    admins.map(async (user) => {
      user.password = bcrypt.hashSync(user.employeeNumber, 10);
      user.manager = sysAdminUser._id;
      userArr.push(user);
    });
    const ohsAdmin = await User.insertMany(userArr);

    userArr = [];

    const managers = users.filter((user) => user.isManager);
    managers.map(async (user) => {
      user.password = bcrypt.hashSync(user.employeeNumber, 10);
      user.manager = ohsAdmin[0]._id;
      userArr.push(user);
    });
    const managerList = await User.insertMany(userArr);

    managerList.map((manager) => {
      if (!deptGroups.includes(manager.department)) {
        deptGroups[manager.department] = {
          id: manager._id,
        };
      }
    });

    userArr = [];

    const employees = users.filter((user) => !(user.isManager || user.isAdmin));
    employees.map((user) => {
      userArr.push({
        ...user,
        password: bcrypt.hashSync(user.employeeNumber, 10),
        manager: deptGroups[user.department]
          ? deptGroups[user.department].id
          : ohsAdmin[0]._id,
      });
    });
    await User.insertMany(userArr);

    process.exit(0);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await Form.deleteMany({});

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
