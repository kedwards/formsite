import bcrypt from "bcryptjs";

const users = {
  sysAdmin: [
    {
      name: "sysAdmin",
      email: "sysAdmin@dynalife.ca",
      password: bcrypt.hashSync("123456", 10),
      department: "system",
      isAdmin: true,
    },
  ],
  admins: [
    {
      name: "Administrator",
      email: "administrator@dynalife.ca",
      password: bcrypt.hashSync("123456", 10),
      department: "system",
      isAdmin: true,
    },
  ],
  ohs: [
    {
      name: "OHS",
      email: "ohs@dynalife.ca",
      password: bcrypt.hashSync("123456", 10),
      department: "OHS",
      isOhs: true,
    },
  ],
  managers: [
    {
      name: "Manager Team A",
      email: "managera@dynalife.ca",
      department: "Accounting",
      isManager: true,
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "ManagerTeam B",
      email: "managerb@dynalife.ca",
      department: "Business",
      isManager: true,
      password: bcrypt.hashSync("123456", 10),
    },
  ],

  techs: [
    {
      name: "Technician B - 1",
      email: "techb1@dynalife.ca",
      department: "Business",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "Technician B - 2",
      email: "techb2@dynalife.ca",
      department: "Business",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "Technician A - 1",
      email: "techa1@dynalife.ca",
      department: "Accounting",
      password: bcrypt.hashSync("123456", 10),
    },
    {
      name: "Technician A - 2",
      email: "techa2@dynalife.ca",
      department: "Accounting",
      password: bcrypt.hashSync("123456", 10),
    },
  ],
};

export default users;
