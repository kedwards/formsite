db.createUser({
  user: "dynalifeAdmin",
  pwd: "dynalifeAdminPass",
  roles: [
    {
      role: "readWrite",
      db: "dynalife",
    },
  ],
});
// db.auth("localAdmin", "localAdminPassword");
db = db.getSiblingDB("dynalife");
db.test.insertOne({});