import bcrypt from "bcryptjs";

const users = [
  {
    name: "Administrator",
    email: "admin@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Manager Team A",
    email: "managera@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "ManagerTeam B",
    email: "managerb@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Technician B - 1",
    email: "techb1@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Technician B - 2",
    email: "techb2@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Technician A - 1",
    email: "techa1@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Technician A - 2",
    email: "techa2@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
