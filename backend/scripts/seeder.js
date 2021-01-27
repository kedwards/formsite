import bcrypt from "bcryptjs";
import users from "../src/data/users.js";
import User from "../src/models/userModel.js";
import Form from "../src/models/formModel.js";
import connectDB from "../src/config/db.js";

const sysAdmin = {
  name: "sysadmin",
  email: "sysadmin@dynalife.com",
  password: bcrypt.hashSync("123456", 10),
  department: "system",
  isAdmin: true,
};

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await Form.deleteMany({});

    const sysadmin = await User.create(sysAdmin);
    sysadmin.manager = sysadmin._id;
    await sysadmin.save();

    const admins = users.admins.map((admin) => {
      return { ...admin, manager: sysadmin._id };
    });
    await User.insertMany(admins);

    const ohss = users.ohs.map((ohsAdmin) => {
      return { ...ohsAdmin, manager: sysadmin._id };
    });
    await User.insertMany(ohss);

    const managers = users.managers.map((mngr) => {
      return { ...mngr, manager: admins[0]._id };
    });

    const createdManagers = await User.insertMany(managers);

    const departmentUsers = [];

    users.techs.map((t) => {
      createdManagers.find((mngr) => {
        if (mngr.department === t.department) {
          departmentUsers.push({ ...t, manager: mngr._id });
        }
      });
    });

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
