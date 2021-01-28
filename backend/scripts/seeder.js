import User from "../src/models/userModel.js";
import users from "../src/data/users.js";
import Form from "../src/models/formModel.js";
import Role from "../src/models/roleModel.js";
import roles from "../src/data/roles.js";
import connectDB from "../src/config/db.js";

connectDB();

const importData = async () => {
  try {
    await Role.deleteMany({});
    await User.deleteMany({});
    await Form.deleteMany({});

    const createdRoles = await Role.create(roles);

    const sysadmin = await User.insertMany(users.sysAdmin);
    sysadmin.manager = sysadmin._id;
    await sysadmin[0].save();

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
