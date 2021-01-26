import users from "../src/data/users.js";
import User from "../src/models/userModel.js";
import Form from "../src/models/formModel.js";
import connectDB from "../src/config/db.js";

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await Form.deleteMany({});

    const globalAdmin = await User.insertMany(users.admins);

    const managers = users.managers.map((mngr) => {
      return { ...mngr, manager: globalAdmin[0]._id };
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
