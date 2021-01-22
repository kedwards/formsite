import bcrypt from "bcryptjs";

const users = [
  {
    name: "Administrator",
    email: "admin@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Manager",
    email: "manager@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Technician",
    email: "tech@dynalife.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
