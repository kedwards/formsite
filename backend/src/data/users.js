import bcrypt from "bcryptjs";

const users = [
  {
    name: "Administrator",
    email: "admin@kevinedwards.ca",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Alicia Edwards",
    email: "alicia@kevinedwards.ca",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Robert Edwards",
    email: "robert@kevinedwards.ca",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
