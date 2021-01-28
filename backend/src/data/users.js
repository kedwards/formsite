import bcrypt from "bcryptjs";

const users = {
  sysAdmin: [
    {
      name: "sysAdmin",
      email: "sysAdmin@dynalife.com",
      password: bcrypt.hashSync("123456", 10),
      department: "system",
      isAdmin: true,
    },
  ],
  admins: [
    {
      name: "Administrator",
      email: "administrator@dynalife.com",
      password: bcrypt.hashSync("123456", 10),
      department: "system",
      isAdmin: true,
    },
  ],
  ohs: [
    {
      name: "OHS",
      email: "ohs@dynalife.com",
      password: bcrypt.hashSync("123456", 10),
      department: "OHS",
      isOhs: true,
    },
  ],
  managers: [
    {
      name: "Manager Team A",
      email: "managera@dynalife.com",
      department: "Accounting",
      isManager: true,
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "ManagerTeam B",
      email: "managerb@dynalife.com",
      department: "Business",
      isManager: true,
      password: bcrypt.hashSync("123456", 10),
    },
  ],

  techs: [
    {
      name: "Technician B - 1",
      email: "techb1@dynalife.com",
      department: "Business",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "Technician B - 2",
      email: "techb2@dynalife.com",
      department: "Business",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "Technician A - 1",
      email: "techa1@dynalife.com",
      department: "Accounting",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "Technician A - 2",
      email: "techa2@dynalife.com",
      department: "Accounting",
      password: bcrypt.hashSync("123456", 10),
    },
  ],
};

export default users;
